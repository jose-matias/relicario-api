import { model, Schema, Document } from 'mongoose';

export interface Author extends Document {
  status: boolean;
  name: string;
  about: string;
};

const AuthorSchema: Schema<Author> = new Schema({
  status: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
  },
}, { timestamps: true });

export default model<Author>('Author', AuthorSchema);
