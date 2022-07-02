import express from "express"
import { update, deleteUser, getuser, follow, unFollow } from "../Controllers/user.js";

const router = express.Router();

router.route("/:id")
.patch(update)
.delete(deleteUser)
.get(getuser)

router.patch("/:id/follow", follow)
router.patch("/:id/unfollow", unFollow)

export default router