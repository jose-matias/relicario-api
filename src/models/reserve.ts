import { model, Schema, Document } from 'mongoose';
import ObjectId = Schema.Types.ObjectId

export interface Reserve extends Document {
  _user: ObjectId;
  _book: ObjectId;
  loan_date: Date;
  return_date: Date;
  status: boolean;
};

const ReserveSchema: Schema<Reserve> = new Schema({
  _user: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  _book: {
    type: ObjectId,
    ref: 'Book',
    required: true
  },
  loan_date: {
    type: Date,
  },
  return_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ['Disponível', 'Reservado', 'Emprestado', 'Devolvido'],
    default: 'Disponível',
  },
}, { timestamps: true });

export default model<Reserve>('Reserve', ReserveSchema);
