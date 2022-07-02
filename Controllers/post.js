import Post from "../models/Post.js";
import User from "../models/User.js";

const create = async (req, res)=>{
    const {userId, userIsAdmin} = req.body
    if(req.params.id === userId || userIsAdmin){
        const newPost = new Post({ ...req.body })
        try{
            await newPost.save()
            res.status(200).json("Successfully created a post.")
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot make a post with another user's Id.")
    }
}

const update = async (req, res)=>{
    const {userId, userIsAdmin, postId} = req.body

    if(req.params.id === userId || userIsAdmin){      
        try{
            const post = await Post.findByIdAndUpdate(postId, {...req.body})
            post
            ? res.status(200).json("Successfully updated this post.")
            : res.status(404).json("Post does not exist.")
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot update the post of another user.")
    }
}

const deletePost = async (req, res)=>{
    const {userId, userIsAdmin, postId} = req.body

    if(req.params.id === userId || userIsAdmin){      
        try{
            const post = await Post.findByIdAndDelete(postId)
            post
            ? res.status(200).json("Successfully deleted this post.")
            : res.status(404).json("You cannot delete this post because it does not even exist.")
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot delete the post of another user.")
    }
}

const like = async (req, res)=>{
    const {userId, userIsAdmin, postId, userThatLikedId} = req.body

    if(req.params.id === userId || userIsAdmin){
        try{
            const post = await Post.findById(postId)
            if(post){
                if(!post.likes.includes(userThatLikedId)){
                    await post.updateOne({$push: {likes: userThatLikedId}})
                    res.status(200).json("Successfully liked this post.")
                }
                else{
                    await post.updateOne({$pull: {likes: userThatLikedId}})
                    res.status(200).json("Successfully unliked this post.")
                }       
            }
            else{
                res.status(404).json("You cannot like this post because it does not even exist.")
            }  
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    }
    else{
        res.status(403).json("You cannot delete the post of another user.")
    }
}

const getPost = async (req, res)=>{          
    try{
        const post = await Post.findById(req.params.postId)
        post
        ? res.status(200).json(post)
        : res.status(404).json("This post does not exist.")
    }
    catch(err){
        res.status(500).json({msg:"An error occured.", err})
    }        
}

const getTlPosts = async (req, res)=>{
    const {userId, userIsAdmin} = req.body

        try{
            const myPosts = await Post.find({userId: req.params.id})
            const {followings} = await User.findById(req.params.id)
            const followingsPosts = await Promise.all(
                followings.map(async (id)=>{
                    const followingPosts = await Post.find({userId: id})
                    return followingPosts
                })                
            )
            const allPosts = myPosts.concat(...followingsPosts)
            res.status(200).json(allPosts)
        }
        catch(err){
            res.status(500).json({msg:"An error occured.", err})
        }
    
   
}





export {create, update, deletePost, like, getPost, getTlPosts}