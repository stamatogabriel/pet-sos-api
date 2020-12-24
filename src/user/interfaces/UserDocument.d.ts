import { Document } from 'mongoose';

export interface IUser extends Document {
  email?: string;
  phone?: string;
  avatar?: string;
  password?: string;
  username?: string;
}
