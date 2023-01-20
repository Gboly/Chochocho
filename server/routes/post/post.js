import { Router } from "express";
import {
  addNewPost,
  deletePost,
  getPostById,
  getPosts,
  getPostsByAuthUser,
  reactToPost,
  updatePost,
} from "../../controllers/post/post.js";

const router = Router();

router.route("/").post(addNewPost).get(getPosts);
router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);
router.put("/:id/react", reactToPost);
router.get("/authUser", getPostsByAuthUser);

export default router;
