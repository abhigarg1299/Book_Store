import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URI}`);
    console.log("mongoDb Connect Successfully");
  } catch (err) {
    console.log(err);
  }
};

export default dbConnect;
