import { model, Schema, Document, Model } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
  name: string;
  birthday: Date;
  email: string;
  password: string;
  photo: string;
  status: boolean;
  role: string;
  facebookId: string;
  googleId: string;
  comparePasswords: (password: string) => Promise<boolean>;
};

const UserSchema: Schema<IUser> = new Schema({
  name: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  role: {
    type: String,
    default: 'User',
  },
  provider: {
    type: String,
    default: 'local',
  },
  providerId: {
    type: String,
    default: null,
  },
}, { timestamps: true });

UserSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;
  next();
});

UserSchema.methods.comparePasswords = async function (password: string): Promise<boolean> {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

export default model<IUser>('User', UserSchema);
