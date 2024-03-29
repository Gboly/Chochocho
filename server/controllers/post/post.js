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
  excludeBlocked,
  returnShortForBlockedUsers,
  getBlockedUserIds,
  findById,
} from "../../util/helperFunctions.js";
import cloudinary from "../../config/cloudinaryConfig.js";

const addNewPost = async (req, res) => {
  // For comments, The parents array should already be updated in the frontend by spreading the parents of the post being commented on
  // and then attaching an object of its postId and userId after.
  // This way i can easily pick the last item in the array as the post being commented on.
  const {
    type,
    parents,
    content,
    mediaType,
    media: [{ src, alt }],
  } = req.body;
  const { id: userId, followers, following, username } = req.user;
  try {
    let cloudinaryMedia;
    if (mediaType && src) {
      cloudinaryMedia = await cloudinary.uploader.upload(src, {
        folder: "post",
        resource_type: mediaType,
      });
    }

    let mentions;
    const mentionedUsers = extractMentionedUsers(content);
    if (mentionedUsers.length > 0) {
      const fetchedMentionedUsers = await User.find({
        username: mentionedUsers,
      });

      mentions = fetchedMentionedUsers.map((user) => ({
        userId: user._id,
        username: user.username,
      }));
    }

    const post = new Post({
      userId,
      ...req.body,
      media: [
        {
          src: cloudinaryMedia?.secure_url || "",
          publicId: cloudinaryMedia?.public_id || "",
          alt,
        },
      ],
      mentionedUsers: mentions,
    });
    await post.save();

    if (type === "comment") {
      const updatedPost = await Post.updateOne(
        { _id: parents[parents.length - 1].postId },
        { $push: { comments: { postId: post.id, userId } } }
      );
      console.log(updatedPost);
    }

    // If its a regualr post, make mutuals recieve nots. for comments, only users who were part of the conversation should get the nots
    // You shouldn't get notified when you comment on YOUR own post
    const notifyingUserIds = removeFromArray(
      getAnArrayOfSpecificKeyPerObjectInArray(parents, "userId"),
      userId
    );
    const filterednotifyingUserIds = excludeBlocked(notifyingUserIds, req.user);
    await sendNotification({
      type,
      snippet: deriveSnippet(content, mediaType),
      userId,
      postId: post.id,
      recipient:
        type === "post"
          ? getMutuals(followers, following)
          : // You shouldn't get notified when you comment on YOUR own post
            filterednotifyingUserIds,
    });

    // Treat mention notification.
    if (mentionedUsers.length > 0) {
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
  const authUser = req.user;

  const filteredUserId = excludeBlocked(userId, authUser);
  // If all userId are blocked users, return.
  if (userId && !filteredUserId.length) return res.status(200).json([]);

  // Whenever a request is sent to this endpoint without passing ids as query,
  // then, post from those authUser follows should be supplied.
  // if a userId param is passed, fetch posts from a particular user/array of users
  const homeOrProfileFeed = userId || [
    ...getAnArrayOfSpecificKeyPerObjectInArray(authUser.following, "userId"),
    req.user.id,
  ];

  const query = id
    ? { ...req.query, _id: id }
    : {
        ...req.query,
        userId: homeOrProfileFeed,
      };
  try {
    const posts = await Post.find(query)
      .sort({ date: -1 })
      .skip(_start)
      .limit(_end);

    const refinedResult_Short4BlockedUser = returnShortForBlockedUsers(
      posts,
      authUser
    );

    res.status(200).json(refinedResult_Short4BlockedUser);
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
  const authUser = req.user;

  const blockeduserIds = getBlockedUserIds(authUser);
  try {
    const post = await Post.findById(id);
    const ids = getAnArrayOfSpecificKeyPerObjectInArray(
      post[postRel],
      "postId"
    );
    const postCommentsOrParents = await Post.find({
      _id: ids,
      userId: { $nin: postRel === "comments" ? blockeduserIds : [] },
    })
      .sort({ date: -1 })
      .skip(_start)
      .limit(_end);

    const refinedResult_Short4BlockedUser = returnShortForBlockedUsers(
      postCommentsOrParents,
      authUser
    );

    res.status(200).json(refinedResult_Short4BlockedUser);
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

    const update = [
      {
        updateOne: {
          filter: { _id: req.params.id },
          update: reactionRecord
            ? { $pull: { [type]: reactionRecord } }
            : { $push: { [type]: { userId } } },
        },
      },
      ...(type === "reposts"
        ? [
            reactionRecord
              ? {
                  deleteOne: {
                    filter: {
                      originalPostId: post.id,
                      originalUserId: post.userId,
                    },
                  },
                }
              : {
                  insertOne: {
                    document: {
                      userId,
                      type: "repost",
                      date: new Date().toISOString(),
                      originalPostId: post.id,
                      originalUserId: post.userId,
                    },
                  },
                },
          ]
        : []),
    ];

    const updatedUser = await Post.bulkWrite(update);
    console.log(updatedUser);

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

const bookmarkPost = async (req, res) => {
  const { id: postId } = req.params;
  const { id, bookmarks } = req.user;

  try {
    const isBookmarked = findById(bookmarks, "postId", postId);
    const userUpdate = await User.updateOne(
      { _id: id },
      isBookmarked
        ? { $pull: { bookmarks: { postId } } }
        : { $push: { bookmarks: { postId, date: new Date() } } }
    );

    res.status(200).json({ success: true, isBookmarked });
  } catch (error) {
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const deletePost = async (req, res) => {
  const _id = req.params.id;
  try {
    // Delete the post and also all clone that was made out of it from a repost
    const deletedPost = await Post.deleteMany({
      $or: [{ _id }, { originalPostId: _id }],
    });
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
  bookmarkPost,
  deletePost,
  reactToPost,
  getPostsByAuthUser,
};
