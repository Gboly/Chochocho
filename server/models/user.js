import mongoose from "mongoose";
const schema = mongoose.Schema;

const subUserSchema = new schema({
  userId: { type: schema.Types.ObjectId, ref: "User" },
  storyId: { type: schema.Types.ObjectId, ref: "Post" },
  notificationId: { type: schema.Types.ObjectId, ref: "Notification" },
  viewed: Boolean,
  date: { type: Date, default: new Date() },
});

const userSchema = new schema({
  username: { type: String, default: "", required: true, unique: true },
  password: { type: String, default: "", required: true, minlength: 6 },
  //If the user doesn't pass a displayName for any reason, just use the username in both instances. Do this in the frontend.
  displayName: { type: String, default: "" },
  profileImage: { type: String, default: "" },
  coverPhoto: { type: String, default: "" },
  bio: { type: String, default: "" },
  twitter: { type: String, default: "" },
  facebook: { type: String, default: "" },
  instagram: { type: String, default: "" },
  website: { type: String, default: "" },
  followers: { type: [subUserSchema], default: [] },
  following: { type: [subUserSchema], default: [] },
  DOB: { type: Date, default: "" },
  joinedDate: { type: Date, default: new Date() },
  Location: { type: String, default: "" },
  email: { type: String, default: "" },
  linkedIn: { type: String, default: "" },
  url: { type: String, default: "" },
  notifications: { type: [subUserSchema], default: [] },
  blocked: { type: [subUserSchema], default: [] },
  //socket.io should keep track of online and offline status and should be reflected here based on time
  online: { type: Boolean, default: true },
  lastSeen: { type: Date, default: new Date() },
  settings: {
    type: { activeStatus: Boolean, messageSound: Boolean },
    default: { activeStatus: true, messageSound: true },
  },
  myStories: { type: [subUserSchema], default: [] },
  otherStories: { type: [subUserSchema], default: [] },
  // Taking this out and it would be corrected by including the userId to each record in the otherStories field.
  // otherStoryAuthors: { type: [subUserSchema], default: [] },
  MutedStoryAuthors: { type: [subUserSchema], default: [] },
  storyVisibility: {
    type: { type: String, default: "followers" },
    users: { type: [subUserSchema], default: [] },
  },
});

const User = mongoose.model("user", userSchema);

export default User;
export { subUserSchema };
