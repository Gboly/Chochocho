import { Router } from "express";
import { addNewStory, getStoryById } from "../../controllers/story/story.js";
import Story from "../../models/story.js";

const router = Router();

router.get("/:id", getStoryById);
router.post("/", addNewStory);

export default router;
