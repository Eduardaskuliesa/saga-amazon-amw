import mongoose, { Schema } from 'mongoose';

const imageSchema = new Schema({
  fileName: { type: String, required: true },
  imageUrl: { type: String, required: true },
  album: { type: Schema.Types.ObjectId, ref: 'Album' },
});

export default mongoose.models.Image || mongoose.model('Image', imageSchema);
