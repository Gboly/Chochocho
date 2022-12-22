import { Router } from "express";
import {
  getAuthenticatedUser,
  getUser,
  getUsersById,
} from "../../controllers/user/user.js";

const router = Router();

router.get("/authenticatedUser", getAuthenticatedUser);
router.get("/:id", getUser);
router.get("/", getUsersById);

export default router;
