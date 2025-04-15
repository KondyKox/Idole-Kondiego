import mongoose, { Schema } from "mongoose";

export interface IUser extends mongoose.Document {
  username: string;
  password: string;
  role: "admin" | "user";
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
