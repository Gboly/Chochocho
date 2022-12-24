import Notification from "../../models/notification.js";
import User from "../../models/user.js";

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
  const { _start, _end } = req.query;
  try {
    const notifications = await Notification.find(req.query)
      .skip(_start)
      .limit(_end);
    notifications.length > 0
      ? res.status(200).json(notifications)
      : res.status(404).json({ error: "No post found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const sendNotification = async ({ body, userId, postId, recievers }) => {
  const { type, content, mediaType } = body;
  const notification = new Notification({
    userId,
    postId,
    type,
    snippet: deriveSnippet(content, mediaType),
  });
  await notification.save();

  const updatedUser = await User.updateMany(
    { _id: recievers },
    {
      $push: {
        notifications: { notificationId: notification.id, viewed: false },
      },
    }
  );
  console.log(updatedUser);
};

// util functions
const deriveSnippet = (content, mediaType) => {
  return content
    ? content.slice(0, 11)
    : mediaType === "image"
    ? "photo"
    : "video";
};

export { getNotifications, addNotification, sendNotification };
