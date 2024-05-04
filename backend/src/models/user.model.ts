import { model, Schema, Document } from 'mongoose';
import { User } from '../interfaces/user.interface';

const userSchema: Schema = new Schema({
  phone: {
    type: String,
    index: true,
    unique: true,
  },
  telegram: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  note: {
    type: String,
  },
});

const userModel = model<User & Document>('User', userSchema);

export default userModel;
