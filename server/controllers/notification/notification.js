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
      .sort({ date: -1 })
      .skip(_start)
      .limit(_end);
    myNotifications.length > 0
      ? res.status(200).json(myNotifications)
      : res.status(204).json(myNotifications);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "An error was encountered." });
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
    return res.status(400).json({ error: "An error was encountered." });
  }
};

const markAllASRead = async (req, res) => {
  const { id: authUserId } = req.user;
  try {
    const updatedUser = await User.updateOne(
      { _id: authUserId },
      { "notifications.$[].viewed": true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "An error was encountered." });
  }
};

const filterNotifications = async (req, res) => {
  const { type } = req.params;
  const { _id: authUserId, allowedNotificationTypes: ant } = req.user;
  const filterType = `allowedNotificationTypes.${type}`;
  try {
    const updatedUser = await User.updateOne(
      { _id: authUserId },
      { [filterType]: !ant[type] }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "An error was encountered." });
  }
};

const sendNotification = async ({
  type,
  snippet,
  userId,
  postId,
  recipient: _id,
  username,
  authUser,
}) => {
  const query = username ? { username: _id } : { _id };
  const filterType = `allowedNotificationTypes.${type}`;

  // Check if the recipients wants to recieve notifications of this type
  const user = await User.find({ ...query, [filterType]: true });

  if (user.length >= 1) {
    const notification = new Notification({
      userId,
      postId,
      type,
      snippet,
      date: new Date().toISOString(),
    });
    await notification.save();

    // Whenever the query key is username, the blocked users are yet to be excluded. Here, we are ensuring that the blocked is excluded.
    const updateQueryIds = authUser
      ? excludeBlocked(
          getAnArrayOfSpecificKeyPerObjectInArray(user, "_id"),
          authUser
        )
      : getAnArrayOfSpecificKeyPerObjectInArray(user, "_id");

    const updatedUser = await User.updateMany(
      { _id: updateQueryIds },
      {
        $push: {
          notifications: {
            notificationId: notification.id,
            viewed: false,
            date: new Date().toISOString(),
          },
        },
      }
    );
    console.log(updatedUser);
  }
};

export {
  getNotifications,
  addNotification,
  sendNotification,
  updateNotificationViewStatus,
  markAllASRead,
  filterNotifications,
};
