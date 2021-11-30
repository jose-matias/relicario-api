import { model, Schema, Document } from 'mongoose';

export interface Category extends Document {
  name: string;
  about: string;
  status: boolean;
};

const CategorySchema: Schema<Category> = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default model<Category>('Category', CategorySchema);
