import mongoose from "mongoose"

const postSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "userSchema", strict: true},
    desc: {type: String, maxLength: 280, minLength: 1, default: ""},
    likes: {type:Array, default:[]},
    img: {type: String, default: ""}
},{
    timestamps: true
})

const Post = mongoose.model("Post", postSchema)

export default Post;