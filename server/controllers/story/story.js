import Story from "../../models/story.js";

const addNewStory = async (req, res) => {
  try {
    const story = new Story({ userId: req.user.id, ...req.body });
    await story.save();
    res.status(201).json(story);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

const getStoryById = async (req, res) => {
  const { id } = req.params;
  try {
    const story = await Story.findById(id);
    story
      ? res.status(200).json(story)
      : res.status(404).json({ error: "No story found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

export { getStoryById, addNewStory };
