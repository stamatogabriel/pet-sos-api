import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { HmacSHA512 } from 'crypto-js';

import { IUser } from './interfaces/user';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(user: IUser): Promise<User> {
    const createUser = await this.userModel.create(user);

    const hashPassword = HmacSHA512(
      createUser.password,
      process.env.PASSWORD_SALT,
    ).toString();

    createUser.password = hashPassword;

    return createUser.save();
  }

  async images(id: string, file) {
    return await this.userModel
      .findByIdAndUpdate(
        id,
        {
          avatar: file[0].location,
        },
        { new: true },
      )
  }

  async index(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findById(id): Promise<User> {
    return await this.userModel.findOne({ _id: id }).select('+password');
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel
      .findOne({ email })
      .select('+password')
      .exec();
  }

  async update(id: string, user: Partial<IUser>) {
    if (user.password) {
      const hashPassword = HmacSHA512(
        user.password,
        process.env.PASSWORD_SALT,
      ).toString();

      user.password = hashPassword;
    }

    return await this.userModel.findByIdAndUpdate(id, user, { new: true });
  }

  async delete(id: string) {
    await this.userModel.findByIdAndDelete(id).exec();
    return { message: 'Usuário Deletado com sucesso' };
  }
}
