import express from "express";
import "dotenv/config";
import { auth } from "./routes";
import helmet from "helmet";
import { connectDB } from "./db";

// Connect to database
connectDB();

export const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());
app.use(helmet());

// Routes
app.use("/auth", auth);

app.listen(process.env.PORT, () => {
  console.log(`app listening on port ${process.env.PORT}`);
});
