import {
  Controller,
  Post,
  Request,

  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
// import { ForgotPass } from './dto/ForgotPass.dto';
// import { RedefinePass } from './dto/RedefinePass.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
