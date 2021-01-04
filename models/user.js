import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      trim: true,
      default: null,
    },
    avatar: String,
    fullName: {
      type: String,
      trim: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    nickname: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      default: null,
      trim: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
    },
    activatedAt: {
      type: Date,
      default: null,
    },
    links: {
      type: ['Mixed'],
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('User', userSchema);
