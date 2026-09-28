import mongoose from "mongoose";
import config from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("DB Connected successfully");
    } catch (error) {
        console.log("Error in DB Connection", error);
    }
}

export default connectDB;