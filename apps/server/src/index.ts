import express, { Application } from "express";
import auth from "./routes/auth";
import { errorHandler } from "./middleware/error";
import morgan from "morgan";
import { connectDB } from "./db";
import "colors";
import { env } from "./validation/env";
import cookieParser from "cookie-parser";
import cors from "cors";
import postRouter from "./routes/post";
import passport from "passport";
import MongoStore from "connect-mongo";

import "./config/passport-setup";
import session from "express-session";

// Connect to database
(async function () {
  await connectDB();
})();

const originURL =
  env.NODE_ENV === "production" ? env.URL_FRONTEND : "http://localhost:3000";

export const app: Application = express();

app.use(
  session({
    secret: env.COOKIE_SECRET_KEY, // Replace with a secure secret
    resave: false, // Avoid resaving unchanged sessions
    saveUninitialized: false, // Do not save empty sessions
    store: MongoStore.create({
      mongoUrl: env.MONGO_URI,
      ttl: 24 * 60 * 60, // 1 day session expiration
    }),
    cookie: {
      secure: process.env.NODE_ENV === "production", // Use HTTPS in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    },
  })
);

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

app.use("/api/v1/posts", postRouter);

app.use(errorHandler);
app.use(passport.initialize());

app.use(passport.session());

const port = env.PORT;

const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`.green);
});

// process.on("uncaughtException", (err, promise) => {
//   console.log(`Error : ${err.message}.red`);

//   server.close(() => process.exit(1));
// });
