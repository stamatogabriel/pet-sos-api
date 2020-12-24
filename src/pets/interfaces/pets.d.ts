import { Types } from 'mongoose';
export interface IPets {
  _id?: string;
  name?: string;
  age?: string;
  type: string;
  adopted: boolean;
  adoptedBy?: Types.ObjectId;
  foundIn: Date;
  image?: string;
  observations?: string;
}
