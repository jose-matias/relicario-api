import { model, Schema, Document } from 'mongoose';

export interface Publishing extends Document {
  status: boolean;
  name: string;
  site: string;
};

const PublishingSchema: Schema<Publishing> = new Schema({
  status: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  site: {
    type: String,
    lowercase: true,
  },
}, { timestamps: true });

export default model<Publishing>('Publishing', PublishingSchema);
