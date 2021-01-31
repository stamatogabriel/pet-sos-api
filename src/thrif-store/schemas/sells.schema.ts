import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

export type SellsDocument = Sells & Document;

@Schema()
export class Sells {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  client: Types.ObjectId;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  item: Types.ObjectId;

  @Prop({ default: Date.now() })
  dateSell: Date;
}

export const SellsSchema = SchemaFactory.createForClass(Sells)