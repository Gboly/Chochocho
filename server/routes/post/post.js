import { Router } from "express";
import {
  addNewPost,
  bookmarkPost,
  deletePost,
  getPostById,
  getPostCommentsOrParents,
  getPosts,
  getPostsByAuthUser,
  reactToPost,
  updatePost,
} from "../../controllers/post/post.js";

const router = Router();

router.route("/").post(addNewPost).get(getPosts);
router.route("/:id").get(getPostById).patch(updatePost).delete(deletePost);
router.get("/:id/:postRel", getPostCommentsOrParents);
router.put("/:id/react", reactToPost);
router.put("/:id/bookmark", bookmarkPost);
router.get("/authUser", getPostsByAuthUser);

export default router;
