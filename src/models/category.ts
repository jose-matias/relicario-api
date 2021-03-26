import { model, Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  about: string;
  status: boolean;
};

const CategorySchema: Schema<ICategory> = new Schema({
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
});

export default model<ICategory>('Category', CategorySchema);
