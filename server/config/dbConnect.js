import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const dbConnect = async () => {
    console.log(process.env.MONGO_URL)
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to mongodb database ${mongoose.connection.name}`);
    } catch (error) {
        console.log(`Error in mongoDB ${error}`);
    }
}