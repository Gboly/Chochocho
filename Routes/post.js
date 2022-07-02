import express from "express"
import { create, update, deletePost, like, getPost, getTlPosts } from "../Controllers/post.js";

const router = express.Router()

router.route("/:id")
.post(create)
.patch(update)
.delete(deletePost)

router.patch("/:id/like", like)

router.get("/:postId", getPost)
router.get("/:id/posts", getTlPosts)

export default router;