import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();


async function runDb() {   
    try{
        mongoose.connect(process.env.URI)
        console.log("successful connected to mongoDB Atlas.")
    }
    catch{
        e=> console.log(e)
    }
}

export default runDb