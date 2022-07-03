import User from "../models/User.js"

const update = async (req, res)=>{
    //check the param on this endpoint against the 
    //currently authenticated user's id (req.user._id with passport & session)
    //Since we haven't implemented session in our code then the authenticated user's id
    // must be passed together with the body request.
    //Also the admin part should be req.user.isAdmin. This would confirm if the authenticated user
    //is an admin.

    const {userId, userIsAdmin, password} = req.body

    if(req.params.id === userId || userIsAdmin){
        if(req.body.password){
            password = await bcrypt.hash(password, 10)
        }
        try{
            await User.findByIdAndUpdate(userId, {...req.body})
            res.status(200).json("Successfully updated this user.")
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
    const {userId, userIsAdmin} = req.body 

    if(req.params.id === userId || userIsAdmin){       
        try{
            await User.findByIdAndDelete(userId)
            res.status(200).json("Successfully deleted user")
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
        const user = await User.findById(req.params.id) 
        //since this portion deals with getting any user's profile (not req.body.userId)
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


const follow = async (req,res)=>{
    const {userId, userToFollowId, userIsAdmin} = req.body

    if(req.params.id === userId || userIsAdmin){        
            const userToFollow= await User.findById(userToFollowId)
            if(!userToFollow.followers.includes(userId)) {
                try{
                    await User.updateOne({_id: userId}, {$push: {followings: userToFollowId}})
                    await userToFollow.updateOne({$push:{followers: userId}})

                    res.status(200).json(`Successully followed user ${userToFollowId}`)
                }
                catch(err){
                    res.status(500).json({msg:"An error occured.", err})
                }
            }
            else{
                res.status(409).json("You already follow this user.")
            }
       
    }
    else{
        res.status(403).json("You cannot make a follow request on another user's account.")
    }
}


const unFollow = async (req,res)=>{
    const {userId, userToUnfollowId, userIsAdmin} = req.body

    if(req.params.id === userId || userIsAdmin){        
            const userToUnfollow= await User.findById(userToUnfollowId)
            if(userToUnfollow.followers.includes(userId)) {
                try{
                    await User.updateOne({_id: userId}, {$pull: {followings: userToUnfollowId}})
                    await userToUnfollow.updateOne({$pull:{followers: userId}})

                    res.status(200).json(`Successully unfollowed user ${userToUnfollowId}`)
                }
                catch(err){
                    res.status(500).json({msg:"An error occured.", err})
                }
            }
            else{
                res.status(409).json("You cannot unfollow a user you are not following.")
            }
       
    }
    else{
        res.status(403).json("You cannot make an unfollow request on another user's account.")
    }
}



export {update, deleteUser, getuser, follow, unFollow}