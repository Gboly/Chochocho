import Router from "express";
import {
  addNewPost,
  getPostById,
  getPosts,
} from "../../controllers/post/post.js";

const router = Router();

router.route("/").post(addNewPost).get(getPosts);
router.get("/:id", getPostById);

export default router;
