import { model, Schema } from "mongoose";
import { z } from "zod";
import bcrypt from "bcrypt";

// Define the UserSchema using Zod
export const UserSchema = z.object({
  username: z
    .string()
    .min(4, "Please enter a username")
    .max(100, "Username must not exceed 100 characters")
    .trim(),
  email: z
    .string()
    .email("Please enter a valid email")
    .regex(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address. Please enter a valid email in the format example@domain.com."
    ),
  createdAt: z.date().default(() => new Date()),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Please choose a stronger password that includes at least one uppercase letter, one lowercase letter, one special character, and is at least 8 characters long."
    ),
  role: z.enum(["admin", "user"]).default("user").optional(),
  active: z.boolean().default(false).optional(),
  googleId: z.string().optional(),
});

// Create a TypeScript type from the schema
type User = z.infer<typeof UserSchema>;

// Define a mongoose schema
const userSchema = new Schema<User>({
  username: {
    type: String,
    unique: true,
    required: [true, "Please enter a username"],
    trim: true,
    minlength: 3,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please enter a valid email"],
    email: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid email address. Please enter a valid email in the format example@domain.com.",
    ],
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
  password: {
    type: String,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
      "Please choose a stronger password that includes at least one uppercase letter, one lowercase letter, one special character, and is at least 8 characters long.",
    ],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  active: {
    type: Boolean,
    default: false,
  },
  googleId: String || undefined
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    console.log("not modified");
    return next();
  }
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(this.password, salt);
  this.password = hash;
  next();
});

export const User = model<User>("user", userSchema);
