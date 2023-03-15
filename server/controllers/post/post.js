import Notification from "../../models/notification.js";
import Post from "../../models/post.js";
import User from "../../models/user.js";
import { sendNotification } from "../notification/notification.js";
import {
  deriveSnippet,
  getMutuals,
  getAnArrayOfSpecificKeyPerObjectInArray,
  extractMentionedUsers,
  removeFromArray,
} from "../../util/helperFunctions.js";

const addNewPost = async (req, res) => {
  // For comments, The parents array should already be updated in the frontend by spreading the parents of the post being commented on
  // and then attaching an object of its postId and userId after.
  // This way i can easily pick the last item in the array as the post being commented on.
  const { type, parents, content, mediaType } = req.body;
  const { id: userId, followers, following, username } = req.user;
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
          : // You shouldn't get notified when you comment on YOUR own post
            removeFromArray(
              getAnArrayOfSpecificKeyPerObjectInArray(parents, "userId"),
              userId
            ),
    });

    // Treat mention notification.
    const mentionedUsers = extractMentionedUsers(content);
    if (mentionedUsers) {
      await sendNotification({
        type: "mention",
        snippet: deriveSnippet(content, mediaType),
        userId,
        postId: post.id,
        // You shouldn't get notified when you mention your self
        recipient: removeFromArray(mentionedUsers, username),
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
  const { id, userId, _start, _end } = req.query;
  const { following } = req.user;
  // Whenever a request is sent to this endpoint without passing ids as query,
  // then, post from those authUser follows should be supplied.
  // if a userId param is passed, fetch posts from a particular user
  const query = id
    ? { ...req.query, _id: id }
    : {
        ...req.query,
        userId: userId || [
          ...getAnArrayOfSpecificKeyPerObjectInArray(following, "userId"),
          req.user.id,
        ],
      };
  try {
    const posts = await Post.find(query)
      .sort({ date: -1 })
      .skip(_start)
      .limit(_end);

    res.status(200).json(posts);

    // posts.length > 0
    //   ? res.status(200).json(posts)
    //   : res.status(204).json({ error: "No post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPostCommentsOrParents = async (req, res) => {
  const { id, postRel } = req.params;
  const { _start, _end } = req.query;
  try {
    const post = await Post.findById(id);
    const ids = getAnArrayOfSpecificKeyPerObjectInArray(
      post[postRel],
      "postId"
    );
    const postCommentsOrParents = await Post.find({ _id: ids })
      .sort({ date: -1 })
      .skip(_start)
      .limit(_end);

    res.status(200).json(postCommentsOrParents);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getPostsByAuthUser = async (req, res) => {
  const { _start, _end } = req.query;
  const { id: authUserId } = req.user;

  const query = { userId: authUserId };
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

    //type comes in plural form i.e with the s. This s needs to removed.
    const notificationType = type.slice(0, type.length - 1);
    const notificationRecord = await Notification.find({
      type: notificationType,
      postId: post.id,
    });

    // notification
    //Ensure no duplicate notification. context: You like, unlike, like again. The notification is only sent for first time.
    // nots should only be sent when the action is a like or repost and not when reversing these action(i.e dislike, "un-repost")
    // Also, you shouldn't notified when you react to your own post
    if (notificationRecord.length < 1 && !post.userId.equals(userId)) {
      await sendNotification({
        userId,
        postId: post.id,
        snippet: deriveSnippet(post.content, post.mediaType),
        type: notificationType,
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
  getPostCommentsOrParents,
  getPostById,
  updatePost,
  deletePost,
  reactToPost,
  getPostsByAuthUser,
};
