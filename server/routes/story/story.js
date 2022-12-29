import { Router } from "express";
import {
  addNewStory,
  getStoryById,
  muteStoryAuthor,
  viewStory,
  deleteStory,
} from "../../controllers/story/story.js";

const router = Router();

router.route("/:id").get(getStoryById).patch(viewStory).delete(deleteStory);
router.post("/", addNewStory);
router.put("/:id/mute", muteStoryAuthor);

export default router;
