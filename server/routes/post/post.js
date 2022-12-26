import { Router } from "express";
import {
  addNewPost,
  deletePost,
  getPostById,
  getPosts,
  reactToPost,
  updatePost,
} from "../../controllers/post/post.js";

const router = Router();

router.route("/").post(addNewPost).get(getPosts);
router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);
router.put("/:id/react", reactToPost);

export default router;
