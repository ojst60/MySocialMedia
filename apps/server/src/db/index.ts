import mongoose from "mongoose";
import "dotenv/config";

// Create connection to database
export async function connectDB() {
  try {
    if (process.env.MONGO_URI) {
      console.log(process.env.MONGO_URI);

      const res = await mongoose.connect(process.env.MONGO_URI, {
        serverApi: { version: "1", strict: true, deprecationErrors: true },
      });

      console.log(
        `You successfully connected to MongoDB: ${res.connection.host}!`
      );
    } else {
      throw new Error("No Mongo URI. Please add mongo URI to env variable");
    }
  } catch (err) {
    console.error("Database Error :", err);
  }
}
