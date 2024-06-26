import Story from "../../models/story.js";
import User from "../../models/user.js";
import {
  deriveStoryQueryIds,
  excludeBlocked,
} from "../../util/helperFunctions.js";
import { returnShortForBlockedUsers } from "../../util/helperFunctions.js";
import cloudinary from "../../config/cloudinaryConfig.js";

const addNewStory = async (req, res) => {
  const { id: authUserId, storyVisibility } = req.user;
  const { mediaType, media } = req.body;

  if (!mediaType || !media)
    return res.status(400).json({ error: "Invalid details" });

  let cloudinaryMedia;
  try {
    cloudinaryMedia = await cloudinary.uploader.upload(media, {
      folder: "story",
      resource_type: mediaType,
    });

    const story = new Story({
      userId: authUserId,
      // This is included to keep track of the user's storyVisibility setting at the time when a story is created.
      // This is useful when deleting a story.
      storyVisibility,
      mediaType,
      media: cloudinaryMedia?.secure_url || "",
      createdAt: new Date(),
    });
    await story.save();

    const updates = [
      {
        updateOne: {
          filter: { _id: authUserId },
          update: {
            $push: {
              myStories: { storyId: story.id, viewed: false, date: new Date() },
            },
          },
        },
      },
      {
        updateMany: {
          filter: { _id: deriveStoryQueryIds(req.user) },
          update: {
            $push: {
              otherStories: {
                storyId: story.id,
                userId: authUserId,
                viewed: false,
                date: new Date(),
              },
            },
          },
        },
      },
    ];

    const updatedUsers = await User.bulkWrite(updates);

    console.log(updatedUsers);
    res.status(201).json(story);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

// Add new story to story collection
// use bulkwrite to perform actions below
// - update authUser's myStory field

// - update followers, mutuals or custom based on setting with story in their otherStories field.
// check authUsers storyVisibility.type
// if followers, use the designated helper function to generate the array of only ids from the authUser followers field. This would be the query for the updateMany.
// if mutuals, use helper function to generate mutualIds from authuser followers field
// if custom select, generate array of Ids from provided users and use as query.
// if custom exempt, filter out the provided users from the followers and then use the result as query

// *****
//story view update
const viewStory = async (req, res) => {
  const { id: storyId } = req.params;
  const { myStories, otherStories, _id } = req.user;

  // This ensures that whenever a story is being viewed, all preceeding stories are also deemed viewed.
  // The whatsapp UX.
  let userId;
  const isMyStory = myStories.some((story) => story.storyId.equals(storyId));
  const storyField = isMyStory ? myStories : otherStories;
  const updateField = isMyStory ? "myStories" : "otherStories";

  const storyIndex = storyField.findIndex((story) => {
    story.storyId.equals(storyId) && (userId = story.userId);
    return story.storyId.equals(storyId);
  });
  const updatedStories = storyField.map((story, idx) =>
    (isMyStory ? true : story.userId.equals(userId)) && idx <= storyIndex
      ? { ...JSON.parse(JSON.stringify(story)), viewed: true, date: story.date }
      : story
  );

  try {
    const updatedUser = await User.updateOne(
      { _id },
      {
        [updateField]: updatedStories,
      }
    );

    // const updatedUser = await User.updateOne(
    //   { _id },
    //   {
    //     "otherStories.$[item].viewed": true,
    //   },
    //   {
    //     arrayFilters: [{ "item.storyId": req.params.id }],
    //   }
    // );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

//**** */
// story visibility type update is done in the updateUser endpoint

// ****
// mute storyAuthors
const muteStoryAuthor = async (req, res) => {
  const { id: authUserId, mutedStoryAuthors } = req.user;
  const { id: userId } = req.params;

  // check if the mutedStoryAuthors already contain the userId. If, it does, make it undo the mute
  try {
    const muteRecord = mutedStoryAuthors.find((record) =>
      record.userId.equals(userId)
    );

    const updateUser = await User.updateOne(
      { _id: authUserId },
      muteRecord
        ? { $pull: { mutedStoryAuthors: muteRecord } }
        : { $push: { mutedStoryAuthors: { userId, date: new Date() } } }
    );

    // notification
    // Nobody gets notified when a mute happens.

    res.status(201).json(updateUser);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

//***** */
// delete story
const deleteStory = async (req, res) => {
  const { id: authUserId } = req.user;
  const { id: storyId } = req.params;
  try {
    const deletedStory = await Story.findByIdAndDelete(storyId);

    const updates = [
      {
        updateOne: {
          filter: { _id: authUserId },
          update: { $pull: { myStories: { storyId } } },
        },
      },
      {
        updateMany: {
          filter: {
            _id: deriveStoryQueryIds(req.user, deletedStory.storyVisibility),
          },
          update: {
            $pull: {
              otherStories: { storyId },
            },
          },
        },
      },
    ];

    const updatedUsers = await User.bulkWrite(updates);

    console.log(updatedUsers);

    res.status(200).json(deletedStory);
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

    const refinedResult_Short4BlockedUser = returnShortForBlockedUsers(
      [story],
      req.user
    );

    story
      ? res.status(200).json(refinedResult_Short4BlockedUser[0])
      : res.status(404).json({ error: "No story found" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ error: "An error was encountered. Incorrect details." });
  }
};

export { getStoryById, addNewStory, viewStory, muteStoryAuthor, deleteStory };
