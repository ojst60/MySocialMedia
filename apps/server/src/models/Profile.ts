import { model, Schema } from "mongoose";
import { z, ZodSchema} from "zod";


const ProfileSchema = z.object({
  user: z.instanceof(Schema.Types.ObjectId),
  bio: z.string().max(400, "Bio must not exceed 400 characters"),
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  profilePicture: z.string(),
  followers: z.array(z.instanceof(Schema.Types.ObjectId)),
  following: z.array(z.instanceof(Schema.Types.ObjectId)),
  updatedAt: z.date(),
});

type Profile = z.infer<typeof ProfileSchema>;

const profileSchema = new Schema<Profile>({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  profilePicture: String,
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  followers: [Schema.Types.ObjectId],
  following: [Schema.Types.ObjectId],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
