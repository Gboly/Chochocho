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

router.route("/").get(getUsersById);
router
  .get("/authUser", getAuthenticatedUser)
  .patch(updateUserDetails)
  .delete(deleteUser);
router.route("/:id").get(getUser);
router.put("/:id/follow", followUser);
router.put("/:id/block", blockUser);

export default router;
