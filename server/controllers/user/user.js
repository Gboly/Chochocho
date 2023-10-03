import User from "../../models/user.js";
import Report from "../../models/report.js";
import { sendNotification } from "../notification/notification.js";
import {
  getUpdateMutualData,
  excludeBlocked,
  removeIdFromArray,
  addToOtherStories,
} from "../../util/helperFunctions.js";
import transport from "../../config/nodeMailer.js";
import dotenv from "dotenv";
dotenv.config();

const getAuthenticatedUser = async (req, res) => {
  const authUser = req.user;
  res.status(200).json(authUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    if (id === "undefined" || id === undefined) {
      res
        .status(400)
        .json({ error: "Invalid user ID provided in the request." });
    } else {
      const user = await User.findById(id, { password: 0 });
      user
        ? res.status(200).json(user)
        : res.status(404).json({ error: "User not found" });
    }
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
    //res.status(200).json(users);
    users.length > 0
      ? res.status(200).json(users)
      : res.status(204).json(users);
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
  const { id: userToFollowId } = req.params;
  const authUser = req.user;

  const userId = excludeBlocked(userToFollowId, authUser);
  if (!userId?.length)
    return res.status(403).json({
      error: true,
      message:
        "You cannot follow this user because they have either blocked you or you blocked them.",
    });

  try {
    const user = await User.findById({
      _id: userId,
    });

    const { updateData, updates } = getUpdateMutualData([
      { authType: "following", authUser },
      { userType: "followers", user },
    ]);

    const isUnFollow = updateData.every((data) => data.existingRecord);

    const otherStoriesUpdate = {
      updateOne: {
        filter: { _id: authUser?._id },
        update: {
          otherStories: isUnFollow
            ? removeIdFromArray(authUser.otherStories, "userId", user.id)
            : addToOtherStories(authUser, user),
        },
      },
    };

    const updateResult = await User.bulkWrite([...updates, otherStoriesUpdate]);

    //notification
    //nots should only be sent when a follow is the case and not unfollow
    if (!isUnFollow) {
      await sendNotification({
        userId: authUser.id,
        type: "follow",
        recipient: userId,
      });
    }

    res.status(201).json(updates);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const blockUser = async (req, res) => {
  const { id: userId } = req.params;
  const authUser = req.user;

  try {
    const user = await User.findById({
      _id: userId,
    });

    // Update blocked
    const { updateData, updates: blockUpdates } = getUpdateMutualData([
      { authType: "youBlocked", authUser },
      { userType: "blockedYou", user },
    ]);
    //const blockedUpdateResult = await User.bulkWrite(blockUpdates);

    // Unfollow if you follow
    const { updates: unFollowUpdates } = getUpdateMutualData(
      [
        { authType: "following", authUser },
        { userType: "followers", user },
      ],
      "pull only"
    );

    // If the user follows you, stop them from following you. Become unfollowed
    const { updates: unFollowedUpdates } = getUpdateMutualData(
      [
        { authType: "followers", authUser },
        { userType: "following", user },
      ],
      "pull only"
    );

    const isUnBlock = updateData.every((data) => data.existingRecord);
    // Remove when the user is blocked
    const otherStoriesUpdate = {
      updateOne: {
        filter: { _id: authUser?._id },
        update: {
          otherStories: removeIdFromArray(
            authUser.otherStories,
            "userId",
            user.id
          ),
        },
      },
    };

    const updates = [
      ...blockUpdates,
      ...unFollowUpdates,
      ...unFollowedUpdates,
      ...(!isUnblock ? [otherStoriesUpdate] : []),
    ];
    const updateResult = await User.bulkWrite(updates);

    // notification
    // Nobody gets notified when a block happens.

    res.status(201).json(updates);
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

const reportUser = async (req, res) => {
  try {
    const report = new Report({
      ...req.body,
      reporterId: req.user.id,
    });
    await report.save();

    const mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: "REPORT",
      text: `A new report has been made. Check report collection on database for severity of report and take necessary actions. Report ${report.id}`,
    };

    try {
      await transport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }

    res.status(200).json(report);
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
  const dbQuery =
    id || id_ne
      ? {
          ...query,
          _id:
            id_ne && id_ne.length > 0
              ? { $nin: id_ne }
              : id && id.length > 0 && id,
        }
      : query;
  const users = await User.find(dbQuery, { password: 0 })
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
  reportUser,
};
