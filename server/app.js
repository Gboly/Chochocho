import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import runDb from "./config/db.config.js";
import localAuthRoute from "./routes/auth/localAuth.js";
import userRoute from "./routes/user/user.js";
import postRoute from "./routes/post/post.js";
import storyRoute from "./routes/story/story.js";
import notificationRoute from "./routes/notification/notification.js";
import { protect } from "./middlewares/authorize.js";

dotenv.config();
const PORT = "3100";
const app = express();

// Changes made from frontend
// followers and following becomes an array of objects and then the userId key is used to get the ids
// There's no more otherStoryAuthors field in the user document. Each userId is attached to their record in the otherStories field.

//Middlewares
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,PATCH,DELETE,HEAD",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("combined"));

//Database connection
runDb();

//routing
app.use("/auth", localAuthRoute);
app.use("/users", protect, userRoute);
app.use("/posts", protect, postRoute);
app.use("/stories", protect, storyRoute);
app.use("/notifications", protect, notificationRoute);

app.listen(PORT, (e) =>
  console.log(e || `Successfully connected to server ${PORT}`)
);
