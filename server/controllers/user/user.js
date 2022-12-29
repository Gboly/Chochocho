import User from "../../models/user.js";
import { sendNotification } from "../notification/notification.js";
import { findById } from "../../util/helperFunctions.js";

const getAuthenticatedUser = async (req, res) => {
  res.status(200).json(req.user);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { password: 0 });
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "User not found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getUsersById = async (req, res) => {
  try {
    const users = await fetchUsers(req.query);
    users.length > 0
      ? res.status(200).json(users)
      : res.status(404).json({ error: "No user found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const updatedUser = await User.updateOne({ _id: req.user.id }, req.body);
    res.status(201).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const followUser = async (req, res) => {
  const { id: userId } = req.params;
  const { id: authUserId, following: authUserfollowing } = req.user;
  try {
    const user = await User.findById({
      _id: userId,
    });

    const idKey = "userId";
    const updateData = [
      {
        type: "following",
        queryId: authUserId,
        followRecord: findById(authUserfollowing, idKey, userId),
        recordId: userId,
      },
      {
        type: "followers",
        queryId: userId,
        followRecord: findById(user.followers, idKey, authUserId),
        recordId: authUserId,
      },
    ];

    const updates = updateData.map(
      ({ type, queryId, followRecord, recordId }) => ({
        updateOne: {
          filter: { _id: queryId },
          update: followRecord
            ? { $pull: { [type]: followRecord } }
            : { $push: { [type]: { userId: recordId } } },
        },
      })
    );

    const updateResult = await User.bulkWrite(updates);

    //notification
    // nots should only be sent when a follow is the case and not unfollow
    const isUnFollow = updateData.every((data) => data.followRecord);
    if (!isUnFollow) {
      await sendNotification({
        userId: authUserId,
        type: "follow",
        recipient: userId,
      });
    }

    res.status(201).json(updateResult);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const blockUser = async (req, res) => {
  // const { type } = req.body;
  const { id: authUserId, blocked } = req.user;
  const { id: userId } = req.params;

  // check if the likes or repost already contain the authUser as one of its userId. If, it does, make it undo the reaction.(e.g; like and dislike)
  try {
    const blockRecord = blocked.find((record) => record.userId.equals(userId));

    const updateUser = await User.updateOne(
      { _id: authUserId },
      blockRecord
        ? { $pull: { blocked: blockRecord } }
        : { $push: { blocked: { userId } } }
    );

    // notification
    // Nobody gets notified when a block happens.

    res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const deleteUser = async (req, res) => {
  // This is a red zone. Account deactivation
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// Other functions
const fetchUsers = async (query) => {
  const { id, id_ne, _start, _end } = query;
  const users = await User.find(
    {
      _id:
        id_ne && id_ne.length > 0 ? { $ne: id_ne } : id && id.length > 0 && id,
    },
    { password: 0 }
  )
    .skip(_start)
    .limit(_end);

  return users;
};

export {
  getAuthenticatedUser,
  getUser,
  getUsersById,
  updateUserDetails,
  followUser,
  blockUser,
  deleteUser,
};
