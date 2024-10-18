import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development"]),
  PORT: z.coerce.number(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  MONGO_URI: z.string(),
  JWT_PRIVATE_KEY: z.string(),
  JWT_EXPIRY:z.string()
});


const variablesObj = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  MONGO_URI: process.env.MONGO_URI,
  JWT_PRIVATE_KEY: process.env.JWT_PRIVATE_KEY,
  JWT_EXPIRY: process.env.JWT_EXPIRY
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
