import mongoose, { Schema } from "mongoose";

const contactUsSchema = new Schema({
  createdat: Number,
  username: String,
  email: String,
  subject: String,
  message: String,
});

const contactUsForm = mongoose.model("contactus", contactUsSchema);

export default contactUsForm;
