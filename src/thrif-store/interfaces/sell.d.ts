import { Types } from 'mongoose';

export interface ISell {
  client: Types.ObjectId;
  item: Types.ObjectId;
  dateSell: Date;
}
