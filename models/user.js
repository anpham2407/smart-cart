import mongoose from 'mongoose';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
    },
    username: {
      type: 'String',
      unique: true,
    },
    avatar: String,
    fullName: {
      type: 'String',
    },
    firstName: {
      type: String,
    },
    lastName: String,
    nickname: {
      type: 'String',
    },
    description: String,
    email: {
      type: 'String',
    },
    phone: {
      type: 'String',
    },
    password: {
      type: 'String',
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
