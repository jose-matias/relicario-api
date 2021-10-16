import { model, Schema, Document, Types } from 'mongoose';
import ObjectId = Schema.Types.ObjectId

export interface IBook extends Document {
  _user: ObjectId;
  _category: ObjectId[];
  name: string;
  description?: string;
  author: string;
  publisher: string;
  language: string;
  page_qty: number;
  ISBN10: string;
  ISBN13: string;
  price: number;
  exchange: boolean;
  status: string;
  book_cover: string;
};

const BookSchema: Schema<IBook> = new Schema({
  _user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true
  },
  _category: [{
    type: ObjectId,
    ref: 'Category',
    required: true
  }],
  _author: {
    type: ObjectId,
    ref: 'Author',
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publisher: {
    type: String,
    required: true,
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
  price: {
    type: Number,
    required: true,
  },
  exchange: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Publicado', 'Não Publicado'],
    default: 'Publicado',
  },
  cover: {
    type: String,
    get: (image: any) => `${process.env.FILES_PATH}/${image}`,
  }
}, { timestamps: true });

BookSchema.post('find', function(books) {
  books.forEach((book: any) => {
    book.cover = book.cover;
  });
});

export default model<IBook>('Book', BookSchema);
