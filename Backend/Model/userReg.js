import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  username: String,
  password: String,
  role: Number,
});

let userRegModel = mongoose.model("users", userSchema);

export default userRegModel;
