import { storySlice } from "../../pages/story/storySlice";

export const {
  openStoryOptions,
  closeStoryOptions,
  openMuteStoryAuthor,
  closeMuteStoryAuthor,
  openDeleteStory,
  closeDeleteStory,
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
