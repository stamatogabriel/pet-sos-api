import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ItemsDocument = Items & Document;

@Schema()
export class Items {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  quantity: number;

  @Prop()
  image?: string
}

export const ItemsSchema = SchemaFactory.createForClass(Items)
