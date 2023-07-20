import mongoose from "mongoose";
const schema = mongoose.Schema;

const reportSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  postId: { type: schema.Types.ObjectId, ref: "Post" },
  storyId: { type: schema.Types.ObjectId, ref: "Post" },
  reporterId: { type: schema.Types.ObjectId, ref: "User" },
  report: { type: String },
  type: { type: String, enum: ["post", "story"] },
  date: { type: Date, default: new Date().toISOString() },
});

const Report = mongoose.model("report", reportSchema);

export default Report;

// Report endpoint within user controller.
