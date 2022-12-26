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

const sendNotification = async ({
  type,
  snippet,
  userId,
  postId,
  recipient,
}) => {
  const notification = new Notification({
    userId,
    postId,
    type,
    snippet,
  });
  await notification.save();

  const _id = Array.isArray(recipient) ? recipient : [recipient];

  const updatedUser = await User.updateMany(
    { _id },
    {
      $push: {
        notifications: { notificationId: notification.id, viewed: false },
      },
    }
  );
  console.log(updatedUser);
};

export { getNotifications, addNotification, sendNotification };
