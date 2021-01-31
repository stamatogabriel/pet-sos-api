import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { FilesInterceptor, MulterModule } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';

import { ThrifStoreService } from './thrif-store.service';
import { CreateItemDto } from './dto/create-items.dto';
import { UpdateItemDto } from './dto/update-item.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { StorageTypes, FileFilter } from '../configs';

@ApiTags('ThriftStore')
@Controller('thrif-store')
export class ThrifStoreController {
  constructor(private thriftStoreService: ThrifStoreService) {
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: '/tmp/uploads',
      }),
    });
  }

  @Post('item')
  @UseGuards(JwtAuthGuard)
  async create(@Body() item: CreateItemDto) {
    return this.thriftStoreService.createItem(item);
  }

  @Get('item')
  async indexItems(@Req() req) {
    return this.thriftStoreService.indexItems(req.query);
  }

  @Get('item/:id')
  async getItemById(@Param('id') params) {
    return this.thriftStoreService.searchItemById(params);
  }

  @Put('item/:id')
  async updateItem(@Param('id') params, @Body() item: UpdateItemDto) {
    return this.thriftStoreService.updateItem(params, item);
  }

  @Put('item/:id/images')
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
    return await this.thriftStoreService.imageItem(params, files);
  }

  @Delete('item/:id')
  @UseGuards(JwtAuthGuard)
  async deleteItem(@Param('id') params) {
    return this.thriftStoreService.deleteItem(params);
  }
}
