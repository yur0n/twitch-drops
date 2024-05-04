import { model, Schema, Document } from 'mongoose';
import { DropCampaign } from '../interfaces/dropCampaign.interface';

const dropCampaignSchema: Schema = new Schema({
  gameId: {
    type: String,
    ref: 'Game',
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    default: true,
  },
  start: {
    type: Date,
  },
	end: {
		type: Date,
	},
});

const dropCampaignModel = model<DropCampaign & Document>('DropCampaign', dropCampaignSchema);

export default dropCampaignModel;
