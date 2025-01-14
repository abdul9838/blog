import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;
