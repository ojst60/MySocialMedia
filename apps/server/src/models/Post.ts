import { model, Schema } from "mongoose";
import { z } from "zod";


// Define the PostSchema using Zod
export const PostSchema = z.object({
  userId: z.instanceof(Schema.Types.ObjectId),
  content: z.string().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date(),
  mediaUrl: z.optional(z.string().or(z.array(z.string()))),
});

// Create a TypeScript type from the post schema
type Post = z.infer<typeof PostSchema>;

// Define a Post schema
const postSchema = new Schema<Post>({
  userId: {
    type: Schema.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export const post = model<Post>("post", postSchema);
