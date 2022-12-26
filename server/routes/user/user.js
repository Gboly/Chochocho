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

router.route("/").get(getUsersById).delete(deleteUser);
router.get("/authenticatedUser", getAuthenticatedUser);
router.route("/:id").get(getUser).patch(updateUserDetails);
router.put("/:id/follow", followUser);
router.put("/:id/block", blockUser);

export default router;
