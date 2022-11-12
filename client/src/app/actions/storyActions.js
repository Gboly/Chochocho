import { storySlice } from "../../pages/story/storySlice";

export const {
  openStoryOptions,
  closeStoryOptions,
  openMuteStoryAuthor,
  closeMuteStoryAuthor,
  openReportStory,
  closeReportStory,
  readUploadedMedia,
  removeMedia,
} = storySlice.actions;
