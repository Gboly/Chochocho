import Notification from "../../models/notification.js";
import User from "../../models/user.js";
import { getAnArrayOfSpecificKeyPerObjectInArray } from "../../util/helperFunctions.js";

const addNotification = async (req, res) => {
  try {
    const notification = new Notification(req.body);
    await notification.save();
    res.status(201).json(notification);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getNotifications = async (req, res) => {
  const { id, _start, _end } = req.query;
  const { notifications } = req.user;
  // This should only supply the authUser's notifications
  const query = id
    ? { ...req.query, _id: id }
    : {
        ...req.query,
        _id: getAnArrayOfSpecificKeyPerObjectInArray(
          notifications,
          "notificationId"
        ),
      };
  try {
    const myNotifications = await Notification.find(query)
      .skip(_start)
      .limit(_end);
    myNotifications.length > 0
      ? res.status(200).json(myNotifications)
      : res.status(404).json({ error: "No post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// update notification view status for user
const updateNotificationViewStatus = async (req, res) => {
  const { id: notificationId } = req.params;
  const { id: authUserId } = req.user;

  try {
    const updatedUser = await User.updateOne(
      { _id: authUserId },
      { "notifications.$[notn].viewed": true },
      { arrayFilters: [{ "notn.notificationId": notificationId }] }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const sendNotification = async ({
  type,
  snippet,
  userId,
  postId,
  recipient,
  username,
}) => {
  const notification = new Notification({
    userId,
    postId,
    type,
    snippet,
  });
  await notification.save();

  const _id = Array.isArray(recipient) ? recipient : [recipient];

  const query = username ? { username: _id } : { _id };

  const updatedUser = await User.updateMany(query, {
    $push: {
      notifications: { notificationId: notification.id, viewed: false },
    },
  });
  console.log(updatedUser);
};

export {
  getNotifications,
  addNotification,
  sendNotification,
  updateNotificationViewStatus,
};
