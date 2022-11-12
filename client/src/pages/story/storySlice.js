import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: { isOpen: false, storyId: "" },
  mute: { isOpen: false, storyId: "", username: "" },
  report: { isOpen: false, storyId: "", username: "" },
  uploadedMedia: { type: "", src: "", reading: false },
};

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    openStoryOptions: (state, action) => {
      state.options = { isOpen: true, storyId: action.payload };
      return state;
    },
    closeStoryOptions: (state) => {
      state.options = initialState.options;
      return state;
    },
    openMuteStoryAuthor: (state, action) => {
      const { storyId, username } = action.payload;
      state.mute = { isOpen: true, storyId, username };
      return state;
    },
    closeMuteStoryAuthor: (state) => {
      state.mute = initialState.mute;
      return state;
    },
    openReportStory: (state, action) => {
      const { storyId, username } = action.payload;
      state.report = { isOpen: true, storyId, username };
      return state;
    },
    closeReportStory: (state) => {
      state.report = initialState.report;
      return state;
    },
    readUploadedMedia: (state, action) => {
      const { type, src, reading } = action.payload;
      if (reading === true) {
        state.uploadedMedia.reading = true;
      } else {
        state.uploadedMedia = {
          type: type.startsWith("video") ? "video" : "image",
          src,
          reading: false,
        };
      }
      return state;
    },
    removeMedia: (state) => {
      state.uploadedMedia = { type: "", src: "", reading: false };
      return state;
    },
  },
});

export const storyReducer = storySlice.reducer;

export const getStoryOptionsState = (state) => state.story.options;

export const getMuteStoryAuthorState = (state) => state.story.mute;

export const getReportStoryState = (state) => state.story.report;

export const getUploadedMedia = (state) => state.story.uploadedMedia;
