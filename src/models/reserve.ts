import { model, Schema, Document } from 'mongoose';
import ObjectId = Schema.Types.ObjectId

export interface Reserve extends Document {
  _user: ObjectId;
  _book: ObjectId;
  loan_date: Date;
  return_date: Date;
  status: string;
};

enum Status {
  Disponivel = 'Disponivel',
  Reservado = 'Reservado',
  Emprestado = 'Emprestado',
  Devolvido = 'Devolvido',
}

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
    enum: Status,
    default: Status.Disponivel,
  },
}, { timestamps: true });

export default model<Reserve>('Reserve', ReserveSchema);
