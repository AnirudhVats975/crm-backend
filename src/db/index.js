import mongoose from "mongoose";
import { DB_Name } from "../constant.js";

const MongoDBConnection = async () => {
  try {
    const connectInstance = await mongoose.connect(
      `${process.env.MONGO_URI}/${DB_Name}`
    );
    console.log(`mongoDB connected`
    );
  } catch (error) {
    console.error("mongoDB connection failed", error);
    process.exit(1);
  }
};

export default MongoDBConnection;
