import express from "express"
import mongoose from "mongoose"
import dotenv from "dotenv"
import helmet from "helmet"
import morgan from "morgan"
import cors from "cors"
import runDb from "./config/db.config.js"
import User from "./models/User.js"
import authRouter from "./Routes/auth.js"
import userRouter from "./Routes/user.js"
import postRouter from "./Routes/post.js"

dotenv.config()
const app = express()

runDb().catch(console.dir)

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet())
app.use(morgan("common"))

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/post", postRouter)



app.listen(5000, ()=> console.log("Server connected on port 5000")) 