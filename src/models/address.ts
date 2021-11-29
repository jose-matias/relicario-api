import { model, Schema, Document } from 'mongoose';
import ObjectId = Schema.Types.ObjectId;

export interface Address extends Document {
  refId: ObjectId;
  city: string;
  state: string;
  neighborhood: string;
  street: string;
  number: string;
};

const AddressSchema: Schema<Address> = new Schema({
  cep: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  street: {
    type: String,
  },
  number: {
    type: String,
  },
}, { timestamps: true });

export default model<Address>('Address', AddressSchema);
