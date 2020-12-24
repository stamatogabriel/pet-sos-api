import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes, Types } from 'mongoose';

import { User } from '../../user/schemas/user.schema'

export type PetsDocument = Pets & Document;

@Schema()
export class Pets {
  @Prop({ required: false })
  name?: string;

  @Prop({ type: SchemaTypes.ObjectId, ref: User.name })
  adoptedBy?: Types.ObjectId;

  @Prop({ required: false })
  age?: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true, default: false })
  adopted: boolean;

  @Prop({ required: true })
  foundIn: Date;

  @Prop({ required: false })
  image?: string;

  @Prop({ required: false })
  observations?: string;
}

export const PetsSchema = SchemaFactory.createForClass(Pets);
