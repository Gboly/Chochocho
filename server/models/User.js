import mongoose from "mongoose"
  
  const userSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, strict:true, minlength: 6 },
    avatar: {type: String, default:""},
    coverPhoto: {type: String, default:""},
    followers: {type: Array, default:[]},
    followings: {type: Array, default:[]},
    isAdmin: {type: Boolean, default: false},
    bio: {type: String, default: ""},
    city: {type: String, default: ""},
    from: {type: String, default: ""},
    relationship: {type: Number, default: "", enum:[1,2,3]}
  },
  {
    timestamps: true
  })

  const User = mongoose.model("user", userSchema);

  export default User