import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import runDb from "./config/db.config.js";

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

app.listen(PORT, (e) =>
  console.log(e || `Successfully connected to server ${PORT}`)
);
