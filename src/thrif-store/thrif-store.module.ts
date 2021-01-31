import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { ThrifStoreService } from './thrif-store.service';
import { ThrifStoreController } from './thrif-store.controller';

import { Items, ItemsSchema } from './schemas/items.schema';
import { Sells, SellsSchema } from './schemas/sells.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Items.name, schema: ItemsSchema },
      { name: Sells.name, schema: SellsSchema },
    ]),
  ],
  providers: [ThrifStoreService],
  controllers: [ThrifStoreController],
})
export class ThrifStoreModule {}
