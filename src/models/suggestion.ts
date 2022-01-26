import { model, Schema, Document } from 'mongoose';

export interface Suggestion extends Document {
  status: boolean;
  name: string;
  author: string;
};

const SuggestionSchema: Schema<Suggestion> = new Schema({
  status: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
}, { timestamps: true });

export default model<Suggestion>('Suggestion', SuggestionSchema);
