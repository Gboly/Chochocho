import User from "../models/User.js"

const update = async (req, res)=>{
    //check the param on this endpoint against the 
    //currently authenticated user's id (req.user._id with passport & session)
    //Since we haven't implemented session in our code then the authenticated user's id
    // must be passed together with the body request.
    //Also the admin part should be req.user.isAdmin. This would confirm if the authenticated user
    //is an admin.

    if(req.params.id === req.body.userId || req.body.userIsAdmin){
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password, 10)
        }
        try{
            const updatedUser = await User.findByIdAndUpdate(req.body.userId, {...req.body})
            res.status(200).json(updatedUser)
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot update the details of another user.")
    }
}


const deleteUser = async (req,res)=>{
    if(req.params.id === req.body.userId || req.body.userIsAdmin){       
        try{
            const deletedUser = await User.findByIdAndDelete(req.body.userId)
            res.status(200).json(deletedUser)
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot delete another user's account.")
    }
}


const getuser = async (req,res)=>{          
    try{
        const user = await User.findById(req.params.id) //since this portion deals with getting any user's profile (not req.body.userId)
        //Making a clone of result gotten from a query would include other internal properties along with the object. confirm this by console.log(user)
        //To get the required details, tap into the "_doc" key.
        const {password, updatedAt, createdAt, ...userDetails} = user._doc
        user
        ? res.status(200).json({...userDetails, joined: createdAt })
        : res.status(404).json("User not found")
    }
    catch(err){
        res.status(500).json({msg:"An error occured.", err})
    }      
}


// const follow = async (req,res)=>{
//     if(req.params.id === req.body.userId || req.body.userIsAdmin){       
//         try{
//             const User = await User.findByIdAndUpdate(req.body.userId)
//             res.status(200).json(deletedUser)
//         }
//         catch(err){
//             res.status(500).json({msg:"An error occured.", err})
//         }
//     }
//     else{
//         res.status(403).json("You cannot make a follow request on another user's account.")
//     }
// }


export {update, deleteUser, getuser, follow}