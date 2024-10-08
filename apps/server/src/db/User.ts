import mongoose from "mongoose";

interface IFollowers {
  username: string;
}

interface IUserSchema {
  username: string;
  password: string;
  email: string;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  isActive: boolean;
  createdAt: Date;
  followers: IFollowers[];
  following: IFollowers[];
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUserSchema>({
  username: { type: String, required: true },
  password: { type: String, minLength: 6, required: true },
  email: { type: String, unique: true, required: true },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
  isActive: Boolean,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
  followers: [{ username: String }],
  following: [{ username: String }],
});

export default UserSchema;
