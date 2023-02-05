import mongoose from "mongoose";
const schema = mongoose.Schema;

const engagementSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  postId: { type: schema.Types.ObjectId, ref: "Post" },
  date: { type: Date, default: new Date() },
});

const postSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  content: { type: String, default: "" },
  mediaType: { type: String, default: "", enum: ["", "image", "video"] },
  media: { type: [{ src: String, alt: String }], default: "" },
  likes: { type: [engagementSchema], default: [] },
  reposts: { type: [engagementSchema], default: [] },
  visibleFor: {
    type: String,
    enum: ["Public", "Friends", "Only me"],
    default: "Public",
  },
  type: { type: String, enum: ["post", "comment"], default: "" },
  // For a post type of "post", parents and comments would be left out from frontend req.
  // While for "comment", only the parents field would be populated by passing its value with the req.
  parents: { type: [engagementSchema], default: [] },
  comments: { type: [engagementSchema], default: [] },
  date: { type: Date, default: new Date().toISOString() },
});

const Post = mongoose.model("post", postSchema);

export default Post;
