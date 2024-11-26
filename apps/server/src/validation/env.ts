import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  MONGO_URI: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_EXPIRY: z.string(),
  URL_FRONTEND: z.string(),
  EMAIL_CLIENT_ID: z.string(),
  EMAIL_CLIENT_SECRET: z.string(),
  BACKEND_URI: z.string(),
  EMAIL_REFRESH_TOKEN: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_CLIENT_ID: z.string(),
  COOKIE_SECRET_KEY:z.string(),
});

const variablesObj = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY,
  URL_FRONTEND: process.env.URL_FRONTEND,
  EMAIL_CLIENT_ID: process.env.EMAIL_CLIENT_ID,
  EMAIL_CLIENT_SECRET: process.env.EMAIL_CLIENT_SECRET,
  BACKEND_URI: process.env.BACKEND_URI,
  EMAIL_REFRESH_TOKEN: process.env.EMAIL_REFRESH_TOKEN,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  COOKIE_SECRET_KEY:process.env.COOKIE_SECRET_KEY
};

const res = envSchema.safeParse(variablesObj);

let env: z.infer<typeof envSchema>;

if (!res.success) {
  console.log("Please check you have the right enviromental variable".red);

  console.log(res.error.message);
  process.exit(1);
} else {
  env = res.data;
}

export { env };
