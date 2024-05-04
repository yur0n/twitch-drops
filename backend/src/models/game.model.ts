import { model, Schema, Document } from 'mongoose';
import { Game } from '../interfaces/game.interface';

const gameSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const gameModel = model<Game & Document>('Game', gameSchema);

export default gameModel;
