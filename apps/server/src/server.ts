import express from "express";
import auth from "./routes/auth";
import helmet from "helmet";
import morgan from "morgan";
import { connectDB } from "./db";
import "colors";
import { env } from "./validation/env";
import cookieParser from "cookie-parser";

// Connect to database
(async function () {
  await connectDB();
})();

export const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Cookie parese middleware
app.use(cookieParser())

// Log the request time, http version, method and URL

if (env.NODE_ENV === "development") {
  console.log("yet");
  app.use(morgan(":date[web] :http-version :method :url".blue));
}

// app.use(helmet());

// API Routes
app.use("/api/v1/auth", auth);

const port = env.PORT;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`.green);
});

// process.on("uncaughtException", (err, promise) => {
//   console.log(`Error : ${err.message}.red`);

//   server.close(() => process.exit(1));
// });
