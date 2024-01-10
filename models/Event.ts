import { Schema, model, models } from 'mongoose';
require("./Dj")

const imageSchema = new Schema({
  public_id: String,
  url: String,
})

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  date: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  locationLink: {
    type: String,
    required: true,
  },
  locationMapLink: {
    type: String,
    required: false,
  },
  ticketLink: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    required: true,

  },
  isActive: {
    type: Boolean,
    require: true,
    default: false,
  },
  djs: [{
    type: Schema.Types.ObjectId,
    ref: 'Dj',
    default: [],
  }],
}, { timestamps: true });

export default models.Event || model('Event', eventSchema);