import { model, Schema, Document } from 'mongoose';
import ObjectId = Schema.Types.ObjectId

export interface Book extends Document {
  status: boolean;
  name: string;
  description?: string;
  language: string;
  page_qty: number;
  ISBN10: string;
  ISBN13: string;
  location: string;
  quantity: number;
  _author: ObjectId;
  _category: ObjectId[];
  _publisher: ObjectId;
  cover: string;
};

const BookSchema: Schema<Book> = new Schema({
  status: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  language: {
    type: String,
    required: true,
  },
  pages_qty: {
    type: Number,
    required: true,
  },
  ISBN10: {
    type: String,
    default: null,
  },
  ISBN13: {
    type: String,
    default: null,
  },
  location: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  available: {
    type: Number,
    default: -1,
  },
  _author: {
    type: ObjectId,
    ref: 'Author',
    required: true
  },
  _category: [{
    type: ObjectId,
    ref: 'Category',
    required: true
  }],
  _publisher: {
    type: ObjectId,
    ref: 'Publisher',
    required: true
  },
  cover: {
    type: String,
    get: (image: any) => `${process.env.FILES_PATH}/${image || 'book-cover.png'}`,
  }
}, { timestamps: true });

BookSchema.post('find', function (books) {
  books.forEach((book: any) => {
    book.cover = book.cover;
  });
});

export default model<Book>('Book', BookSchema);
