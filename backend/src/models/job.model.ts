import { model, Schema, Document } from 'mongoose';
import { Job } from '../interfaces/job.interface';

const jobSchema: Schema = new Schema({
	name: {
		type: String,
		required: true,
	},
	game: {
		type: String,
	},
	status: {
		type: Boolean,
		default: false,
	},
	note: {
		type: String,
		default: '',
	},
	token: {
		type: String,
		required: true,
		unique: true,
	}
});

const jobModel = model<Job & Document>('Job', jobSchema);

export default jobModel;