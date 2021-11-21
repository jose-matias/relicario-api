import { model, Schema, Document } from 'mongoose';

export interface Publisher extends Document {
  status: boolean;
  name: string;
  site: string;
};

const PublisherSchema: Schema<Publisher> = new Schema({
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

export default model<Publisher>('Publisher', PublisherSchema);
