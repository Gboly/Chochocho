import express from "express"
import { update, deleteUser, getuser, follow } from "../Controllers/user.js";

const router = express.Router();

router.route("/:id")
.patch(update)
.delete(deleteUser)
.get(getuser)
.patch(follow)

export default router