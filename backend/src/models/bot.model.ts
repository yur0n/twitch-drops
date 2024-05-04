import { model, Schema, Document } from 'mongoose';
import { Bot } from '../interfaces/bot.interface';

const botSchema: Schema = new Schema({
	login: {
		type: String,
		index: true,
		unique: true,
	},
	password: {
		type: String,
	},
	token: {
		type: String,
		unique: true,
		required: true,
	},
	active: {
		type: Boolean,
		default: false,
		index: true,
	},
	job: {
		type: String,
		ref: 'Job',
	},
	email: {
		type: String,
	},
	emailPassword: {
		type: String,
	},
});

const botModel = model<Bot & Document>('Bot', botSchema);

export default botModel;