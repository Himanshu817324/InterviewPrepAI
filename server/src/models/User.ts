import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
  cnfPassword: string;
  profilePic?: string;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cnfPassword: { type: String, required: true },
  profilePic: { type: String, default: "" },
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
