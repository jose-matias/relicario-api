import { model, Schema, Document } from 'mongoose';

export interface IAuthor extends Document {
  name: string;
  about: string;
  status: boolean;
};

const AuthorSchema: Schema<IAuthor> = new Schema({
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

export default model<IAuthor>('Author', AuthorSchema);
