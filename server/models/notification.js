import mongoose from "mongoose";

const schema = mongoose.Schema;

const notificationSchema = schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  postId: { type: schema.Types.ObjectId, ref: "Post" },
  type: {
    type: "String",
    enum: ["post", "like", "comment", "repost", "mention", "follow"],
  },
  snippet: { type: "String", default: "" },
  date: { type: Date, default: new Date() },
});

const Notification = mongoose.model("notification", notificationSchema);

export default Notification;
