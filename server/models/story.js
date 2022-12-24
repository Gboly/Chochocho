import mongoose from "mongoose";

const schema = mongoose.Schema;

const storySchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  mediaType: { type: String, default: "", enum: ["image", "video"] },
  media: { type: String, default: "" },
  createdAt: { type: Date, default: new Date() },
});

const Story = mongoose.model("story", storySchema);

export default Story;
