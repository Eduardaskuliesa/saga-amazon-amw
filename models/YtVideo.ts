import { Schema, model, models } from 'mongoose';

const ytVideoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  youtubeId: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default models.YtVideo || model('YtVideo', ytVideoSchema);
