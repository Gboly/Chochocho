import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
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

//Middlewares
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

//Database connection
runDb();

//routing
app.use("/auth", localAuthRoute);
app.use("/user", protect, userRoute);
app.use("/post", protect, postRoute);
app.use("/story", protect, storyRoute);
app.use("/notification", protect, notificationRoute);

app.listen(PORT, (e) =>
  console.log(e || `Successfully connected to server ${PORT}`)
);
