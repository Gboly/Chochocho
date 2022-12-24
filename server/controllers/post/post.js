import Notification from "../../models/notification.js";
import Post from "../../models/post.js";
import User from "../../models/user.js";
import { sendNotification } from "../notification/notification.js";

const addNewPost = async (req, res) => {
  // For comments, The parents array should already be updated in the frontend by spreading the parents of the post being commented on
  // and then attaching an object of its postId and userId after.
  // This way i can easily pick the last item in the array as the post being commented on.
  const { type, parents } = req.body;
  const { id: userId, followers, following } = req.user;
  try {
    const post = new Post({ userId, ...req.body });
    await post.save();

    if (type === "comment") {
      const updatedPost = await Post.updateOne(
        { _id: parents[parents.length - 1].postId },
        { $push: { comments: { postId: post.id, userId } } } // confirm if date was auto added
      );
      console.log(updatedPost);
    }

    // If its a regualr post, make mutuals recieve nots. for comments, only users who were part of the conversation should get the nots
    await sendNotification({
      body: req.body,
      userId,
      postId: post.id,
      recievers:
        type === "post"
          ? getMutuals(followers, following)
          : getAnArrayOfSpecificKeyPerObjectInArray(parents, "userId"),
    });

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// Expected result from above controller

// POST
// - Add a new post
// - Add a new notification
// - update mutuals notification field

// COMMENT
// - Add a new post (comment). This new post comes with a pre-assembled parents data from the frontend
// - update the comment field of the post whose postId is in the last position of the parents data gotten.
// - Add a new notification
// - update all user's notification field in the parents data

const getPosts = async (req, res) => {
  const { id, _start, _end } = req.query;
  try {
    const posts = await Post.find({ ...req.query, _id: id })
      .skip(_start)
      .limit(_end);

    posts.length > 0
      ? res.status(200).json(posts)
      : res.status(404).json({ error: "No post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    post
      ? res.status(200).json(post)
      : res.status(404).json({ error: "post is not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// util functions
const getMutuals = (followers, followings) => {
  const mutuals = followers.filter((follower) =>
    // The regualar equality (===) doesn't work with objectIds. The equals method fixes this.
    followings.some((following) => following.userId.equals(follower.userId))
  );
  const mutualsIds = getAnArrayOfSpecificKeyPerObjectInArray(mutuals, "userId");
  return mutualsIds;
};

const getAnArrayOfSpecificKeyPerObjectInArray = (
  originalArray,
  specificKey
) => {
  return originalArray.map((item) => item[specificKey]);
};

export { addNewPost, getPosts, getPostById };
