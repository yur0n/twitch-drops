import { model, Schema, Document } from 'mongoose';
import { Message } from '../interfaces/message.interface';

const messageSchema: Schema = new Schema({
  userId: {
    type: String,
    ref: 'User',
    required: true,
    index: true,
  },
  message: {
    type: String,
    required: true,
  },
  user: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const messageModel = model<Message & Document>('Message', messageSchema);

export default messageModel;
