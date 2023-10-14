import { storySlice } from "../../pages/story/storySlice";

export const {
  openStoryOptions,
  closeStoryOptions,
  openMuteStoryAuthor,
  closeMuteStoryAuthor,
  openDeleteStory,
  closeDeleteStory,
  activateDelete,
  openReportStory,
  closeReportStory,
  readUploadedMedia,
  removeMedia,
  openSettings,
  changeVisibilityType,
  openSelectUser,
  closeSelectUserAsCancel,
  closeSelectUserAsDone,
  supplyCheckedUsers,
  selectUser,
  deselectUser,
  closeSettings,
} = storySlice.actions;
