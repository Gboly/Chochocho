import { Router } from "express";
import {
  addNotification,
  getNotifications,
  markAllASRead,
  updateNotificationViewStatus,
} from "../../controllers/notification/notification.js";

const router = Router();

router.route("/").get(getNotifications).post(addNotification);
router.patch("/readAll", markAllASRead);
router.patch("/:id", updateNotificationViewStatus);

export default router;
