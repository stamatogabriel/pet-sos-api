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
import { ApiTags } from '@nestjs/swagger';

import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { StorageTypes, FileFilter } from '../configs';

@ApiTags('Pets')
@Controller('pets')
export class PetsController {
  constructor(private petService: PetsService) {
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/tmp/uploads',
      }),
    });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() pet: CreatePetDto) {
    return this.petService.create(pet);
  }

  @Get()
  async index(@Req() req) {
    return this.petService.index(req.query);
  }

  @Get(':id')
  async findById(@Param('id') param: string) {
    return this.petService.findById(param);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') param: string, @Body() pet: UpdatePetDto) {
    return this.petService.update(param, pet);
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
    return await this.petService.images(params, files);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async delete(@Param('id') param: string) {
    return this.petService.delete(param);
  }
}
