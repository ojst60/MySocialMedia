import express from "express";
import auth from "./routes/auth";
import { errorHandler } from "./middleware/error";
import morgan from "morgan";
import { connectDB } from "./db";
import "colors";
import { env } from "./validation/env";
import cookieParser from "cookie-parser";
import cors from "cors";

// Connect to database
(async function () {
  await connectDB();
})();

const originURL = env.NODE_ENV === "production" ? "" : "http://localhost:3000";

export const app = express();

app.use(
  cors({
    origin: originURL, // frontend URL
    credentials: true,
    allowedHeaders: ["Content-Type"], // headers
  })
);

// Middleware to parse JSON request bodies
app.use(express.json());

// Cookie parese middleware
app.use(cookieParser());

// Log the request time, http version, method and URL

if (env.NODE_ENV === "development") {
  app.use(morgan(":date[web] :http-version :method :url".blue));
}

// app.use(helmet());

// API Routes
app.use("/api/v1/auth", auth);

app.use(errorHandler);

const port = env.PORT;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`.green);
});

// process.on("uncaughtException", (err, promise) => {
//   console.log(`Error : ${err.message}.red`);

//   server.close(() => process.exit(1));
// });
