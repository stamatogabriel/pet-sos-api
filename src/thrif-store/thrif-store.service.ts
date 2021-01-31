import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { IItem } from './interfaces/items';
import { Items, ItemsDocument } from './schemas/items.schema';

// import { ISell } from './interfaces/sell';
import { Sells, SellsDocument } from './schemas/sells.schema';

@Injectable()
export class ThrifStoreService {
  constructor(
    @InjectModel(Items.name) private itemsModel: Model<ItemsDocument>,
    @InjectModel(Sells.name) private sellsModel: Model<SellsDocument>,
  ) {}

  async createItem(item: IItem): Promise<ItemsDocument> {
    const createItem = await this.itemsModel.create(item);

    return createItem.save();
  }

  async indexItems(query) {
    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const skip = (page - 1) * limit;

    const count = await this.itemsModel.count();

    const items = await this.itemsModel
      .find({ quantity: { $gte: 1 } })
      .skip(skip)
      .limit(limit);

    return {
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    };
  }

  async searchItemById(id: string) {
    return this.itemsModel.findById(id).exec();
  }

  async updateItem(id: string, item: Partial<IItem>): Promise<ItemsDocument> {
    return await this.itemsModel
      .findByIdAndUpdate(id, item, { new: true })
      .exec();
  }

  async imageItem(id: string, file) {
    return this.itemsModel
      .findByIdAndUpdate(id, { image: file[0].location }, { new: true })
      .exec();
  }

  async deleteItem(id: string) {
    await this.itemsModel.findByIdAndRemove(id);
    return { message: 'Item deletado com sucesso' };
  }
}
