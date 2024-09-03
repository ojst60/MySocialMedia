import express, { Request, Response } from "express";
import dotenv from 'dotenv';
import path from 'path'

// Load env vars
const loadEnvVar = dotenv.config({ path: path.resolve(__dirname,'../config.env') });

if (loadEnvVar.error) {
  console.error("Failed to load environment variables from config.env", loadEnvVar.error);
  process.exit(1);
}


const objRes = [
  { id: 1, name: "julius" },
  { id: 2, name: "Abel" },
];

console.log(process.env);

const app = express();
const port = 5000;

// Middleware to parse JSON request bodies
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json(objRes);
});

// Parameterized route
app.get("/api/:number", (req: Request, res: Response) => {
  console.log(req.params);
  res.send("This is my second route");
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});