import { Router } from "express";
import {
  getAuthenticatedUser,
  getUser,
  getUsersById,
  updateUserDetails,
  followUser,
  deleteUser,
  blockUser,
} from "../../controllers/user/user.js";

const router = Router();

router.route("/").get(getUsersById).patch(updateUserDetails).delete(deleteUser);
router.get("/authenticatedUser", getAuthenticatedUser);
router.route("/:id").get(getUser);
router.put("/:id/follow", followUser);
router.put("/:id/block", blockUser);

export default router;
