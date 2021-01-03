import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IPets } from './interfaces/pets';
import { Pets, PetsDocument } from './schemas/pets.schema';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pets.name) private petsModel: Model<PetsDocument>) {}

  async create(pet: IPets): Promise<PetsDocument> {
    const createPet = await this.petsModel.create(pet);

    return createPet.save();
  }

  async index(query): Promise<PetsDocument[]> {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    if (query.adopted) {
      return await this.petsModel
        .find({ adopted: query.adopted })
        .skip(skip)
        .limit(limit)
        .populate('adoptedBy');
    }

    return await this.petsModel
      .find()
      .skip(skip)
      .limit(limit)
      .populate('adoptedBy');
  }

  async findById(id: string): Promise<PetsDocument> {
    return await this.petsModel.findById(id).exec();
  }

  async update(id: string, pet: Partial<IPets>): Promise<PetsDocument> {
    return await this.petsModel
      .findByIdAndUpdate(id, pet, { new: true })
      .exec();
  }

  async images(id: string, file) {
    return await this.petsModel
      .findByIdAndUpdate(
        id,
        {
          image: file[0].location,
        },
        { new: true },
      )
      .exec();
  }

  async delete(id: string): Promise<any> {
    await this.petsModel.findByIdAndDelete(id).exec();
    return { message: 'Pet deletado com sucesso' };
  }
}
