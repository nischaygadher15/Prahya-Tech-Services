import mongoose from "mongoose";

let connectDB = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
