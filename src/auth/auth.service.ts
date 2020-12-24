import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { HmacSHA512 } from 'crypto-js';

import { IUser } from '../user/interfaces/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new HttpException(
        { message: 'User not found' },
        HttpStatus.NOT_FOUND,
      );
    }

    const hashPassword = HmacSHA512(
      password,
      process.env.PASSWORD_SALT,
    ).toString();

    if (hashPassword !== user.password) {
      throw new HttpException(
        { message: 'Invalid password' },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return user;
  }

  async login(user: IUser) {
    user.password = undefined;

    return {
      user,
      accessToken: this.jwtService.sign(JSON.stringify(user)),
    };
  }
}
