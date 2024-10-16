import mongoose from "mongoose";
import { env } from "./validation/env";

export async function connectDB() {
  if (env.MONGO_URI) {
    const dbCon = await mongoose.connect(env.MONGO_URI, {
      serverApi: { version: "1", strict: true, deprecationErrors: true },
    });

    console.info(
      `Mongo Db connected: ${dbCon.connection.host}`.cyan.underline.bold
    );
  } else {
    throw new Error("MONGO_URI is not defined");
  }
}
