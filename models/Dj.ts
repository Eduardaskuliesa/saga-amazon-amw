import { Schema, model, models } from 'mongoose';

const socialsSchema = new Schema({
  platform: String,
  url: String,
})

const imageSchema = new Schema({
  public_id: String,
  url: String,
})

const djSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: imageSchema,
    required: true,
  },
  socials: [socialsSchema],
  
},
{ timestamps: true, collection : 'djs' }
);

export default models.Dj || model('Dj', djSchema)