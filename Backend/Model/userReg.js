import mongoose, { Schema } from "mongoose";

const password = new Schema(
  { cipher: String, key: String, iv: String },
  { _id: false }
);

const userSchema = new Schema({
  username: String,
  pwdObj: password,
  role: Number,
});

let userRegModel = mongoose.model("users", userSchema);

export default userRegModel;
