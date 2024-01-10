import mongoose, { Schema } from 'mongoose';

const albumSchema = new Schema({
  name: { type: String, required: true },
  date: { type: String, required: true },
  images: [{
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
  }],
});

export default mongoose.models.Album || mongoose.model('Album', albumSchema);
