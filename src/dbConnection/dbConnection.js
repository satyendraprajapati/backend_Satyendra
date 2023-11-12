import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbConnection = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Database is connected`, db.connection.host);
  } catch (error) {
    console.log(`Database could not be connected `, error);
    process.exit(1);
  }
};
export default dbConnection;
