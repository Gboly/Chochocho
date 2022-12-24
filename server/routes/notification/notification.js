import { Router } from "express";
import {
  addNotification,
  getNotifications,
} from "../../controllers/notification/notification.js";

const router = Router();

router.route("/").get(getNotifications).post(addNotification);

export default router;
