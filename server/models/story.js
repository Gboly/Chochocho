import mongoose from "mongoose";
import { subUserSchema } from "./user.js";

const schema = mongoose.Schema;

const storySchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  mediaType: { type: String, default: "", enum: ["image", "video"] },
  media: { type: String, default: "" },
  // This is included to keep track of the user's storyVisibility setting at the time when a story is created.
  storyVisibility: {
    type: { type: String, default: "followers" },
    users: { type: [subUserSchema], default: [] },
  },
  createdAt: { type: Date, default: new Date() },
});

const Story = mongoose.model("story", storySchema);

export default Story;
