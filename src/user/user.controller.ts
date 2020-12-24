import 'dotenv/config';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { StorageTypes, FileFilter } from '../configs';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/tmp/uploads',
      }),
    });
  }

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.userService.create(user);
  }

  @Get()
  index() {
    return this.userService.index();
  }

  @Get('email')
  findByEmail(@Req() req) {
    return this.userService.findByEmail(req.query.email);
  }

  @Get(':id')
  findById(@Param('id') params: string) {
    return this.userService.findById(params);
  }

  @Put(':id')
  update(@Param('id') params: string, @Body() user: UpdateUserDto) {
    return this.userService.update(params, user);
  }

  @Put(':id/images')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FilesInterceptor('file', 20, {
      limits: {
        fileSize: 3 * 1024 * 1024,
      },
      fileFilter: FileFilter,
      storage: StorageTypes['s3'],
    }),
  )
  async images(@Param('id') params: string, @UploadedFiles() files) {
    return await this.userService.images(params, files);
  }

  @Delete(':id')
  delete(@Param('id') params: string) {
    return this.userService.delete(params);
  }
}
