import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';

import { Pets, PetsSchema } from './schemas/pets.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pets.name, schema: PetsSchema }]),
  ],
  providers: [PetsService],
  controllers: [PetsController],
})
export class PetsModule {}
