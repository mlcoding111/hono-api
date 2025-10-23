import mongoose from "mongoose";

import { config } from "../config/env.config";

export const connectMongoDB = async (): Promise<void> => {
  try {
    await mongoose.connect(config.DATABASE_URL);
    console.log("Connected to MongoDB");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error connecting to MongoDB:", error.message);
    } else {
      console.error("Error connecting to MongoDB:", error);
    }
    process.exit(1);
  }
};
