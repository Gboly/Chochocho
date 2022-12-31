import Notification from "../../models/notification.js";
import Post from "../../models/post.js";
import User from "../../models/user.js";
import { sendNotification } from "../notification/notification.js";
import {
  deriveSnippet,
  getMutuals,
  getAnArrayOfSpecificKeyPerObjectInArray,
  extractMentionedUsers,
} from "../../util/helperFunctions.js";

const addNewPost = async (req, res) => {
  // For comments, The parents array should already be updated in the frontend by spreading the parents of the post being commented on
  // and then attaching an object of its postId and userId after.
  // This way i can easily pick the last item in the array as the post being commented on.
  const { type, parents, content, mediaType } = req.body;
  const { id: userId, followers, following } = req.user;
  try {
    const post = new Post({ userId, ...req.body });
    await post.save();

    if (type === "comment") {
      const updatedPost = await Post.updateOne(
        { _id: parents[parents.length - 1].postId },
        { $push: { comments: { postId: post.id, userId } } }
      );
      console.log(updatedPost);
    }

    // -- Treating mention in the frontend
    // create a recursive function that takes "content" and "recycledContent" as parameters
    // Create a component that takes the username as prop. Style the component by giving it color, make it clickable just so it navigates to user's profile and then give it the userCameoHover effect.
    // in the function, let readyContent = recycledContent || "";
    // use regex to for search in cases like the spaceIndex because (its not really just space but any character that's not a word)
    // derive the following; atIndex, spaceIndex, username(with @ attached), initials( slice from 0 to atIndex ), result (readyContent + initials + component above), remainderContent
    // The function is then called again taking remainderContent and result as parameters.
    // return readyContent when @ is no more included.

    // If its a regualr post, make mutuals recieve nots. for comments, only users who were part of the conversation should get the nots
    await sendNotification({
      type,
      snippet: deriveSnippet(content, mediaType),
      userId,
      postId: post.id,
      recipient:
        type === "post"
          ? getMutuals(followers, following)
          : getAnArrayOfSpecificKeyPerObjectInArray(parents, "userId"),
    });

    // Treat mention notification.
    const mentionedUsers = extractMentionedUsers(content);
    if (mentionedUsers) {
      await sendNotification({
        type: "mention",
        snippet: deriveSnippet(content, mediaType),
        userId,
        postId: post.id,
        recipient: mentionedUsers,
        username: true,
      });
    }

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPosts = async (req, res) => {
  const { id, _start, _end } = req.query;
  const query = id ? { ...req.query, _id: id } : req.query;
  try {
    const posts = await Post.find(query).skip(_start).limit(_end);

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

const updatePost = async (req, res) => {
  // The following are the fields that can be updated here; mediaType, media, visibleFor, content.
  try {
    const updatedPost = await Post.updateOne({ _id: req.params.id }, req.body);
    res.status(201).json(updatedPost);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const reactToPost = async (req, res) => {
  const { type } = req.body;
  const { id: userId } = req.user;

  // check if the likes or repost already contain the authUser as one of its userId. If, it does, make it undo the reaction.(e.g; like and dislike)
  try {
    const post = await Post.findById({
      _id: req.params.id,
    });

    const reactionRecord = post[type].find((reaction) =>
      reaction.userId.equals(userId)
    );

    const updatePost = await Post.updateOne(
      { _id: req.params.id },
      reactionRecord
        ? { $pull: { [type]: reactionRecord } }
        : { $push: { [type]: { userId } } }
    );

    // notification
    // nots should only be sent when the action is a like or repost and not when reversing thes action(i.e dislike, "un-repost")
    if (!reactionRecord) {
      await sendNotification({
        userId,
        postId: post.id,
        snippet: deriveSnippet(content, mediaType),
        type,
        recipient: post.userId,
      });
    }

    res.status(201).json(updatePost);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const deletePost = async (req, res) => {
  try {
    const deletedPost = await Post.deleteOne({ _id: req.params.id });
    res.status(200).json(deletedPost);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

export {
  addNewPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  reactToPost,
};
