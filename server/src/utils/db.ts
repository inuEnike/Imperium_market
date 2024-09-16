import mongoose from "mongoose";
import { ENV_DATA } from "./envData";


// function to connect to the database
export class Connect {
    static async db(URI: string) {
       try {
        await mongoose.connect(URI,  {
            connectTimeoutMS: 5000,
            serverSelectionTimeoutMS: 5000,
          })
        console.info("Database Connected")
       } catch (error) {
        console.error("DB connection error:", error);
        throw error;
       }
    }
}