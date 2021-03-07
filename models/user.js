import mongoose from "mongoose";
const { Schema } = mongoose;
import { UserRole } from "../core/enum";

const userSchema = new Schema(
  {
    uid: {
      type: String,
      unique: true,
      required: true,
    },
    username: {
      type: String,
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
      type: ["Mixed"],
    },
    expiredResetPassword: {
      type: Date,
    },
    resetToken: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      default: UserRole.USER,
    },
  },
  {
    timestamps: true,
  },
  {
    isBlock: {
      type: Boolean,
      required: true,
      default: false,
    },
  }
);

export default mongoose.model("User", userSchema);
