import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { PetsService } from './pets.service'
import { CreatePetDto } from './dto/create-pet.dto'
import { UpdatePetDto } from './dto/update-pet.dto'

@Controller('pets')
export class PetsController {
  constructor(private petService: PetsService){}

  @Post()
  async create(@Body() pet: CreatePetDto) {
    return this.petService.create(pet)
  }

  @Get()
  async index() {
    return this.petService.index()
  }

  @Get(':id')
  async findById(@Param('id') param: string) {
    return this.petService.findById(param)
  }

  @Put(':id')
  async update(@Param('id') param: string, @Body() pet: UpdatePetDto) {
    return this.petService.update(param, pet)
  }

  @Delete(':id')
  async delete(@Param('id') param: string) {
    return this.petService.delete(param)
  }
}
