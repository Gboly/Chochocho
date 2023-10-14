import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  options: { isOpen: false, storyId: "" },
  mute: { isOpen: false, storyId: "", username: "" },
  deleteStory: { isOpen: false, storyId: "", username: "", isActive: false },
  uploadedMedia: { type: "", src: "", reading: false },
  settings: {
    isOpen: false,
    visibilityType: "",
    selectUserIsOpen: false,
    users: [],
  },
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
    openDeleteStory: (state, action) => {
      const { storyId, username } = action.payload;
      state.deleteStory = { isOpen: true, storyId, username };
      return state;
    },
    closeDeleteStory: (state) => {
      state.deleteStory = initialState.deleteStory;
      return state;
    },
    activateDelete: (state, action) => {
      state.deleteStory.isActive = true;
      state.deleteStory.storyId = action.payload;
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
    openSettings: (state) => {
      state.settings.isOpen = true;
      return state;
    },
    changeVisibilityType: (state, action) => {
      const customTypes = ["custom select", "custom exempt"];
      state.settings.visibilityType = action.payload;
      !customTypes.includes(action.payload) && (state.settings.users = []);
    },
    openSelectUser: (state) => {
      state.settings.selectUserIsOpen = true;
    },
    closeSelectUserAsCancel: (state, action) => {
      state.settings.selectUserIsOpen = false;
      //action.payload is the default selected users from backend
      state.settings.users = [...action.payload];
    },
    closeSelectUserAsDone: (state) => {
      state.settings.selectUserIsOpen = false;
    },
    supplyCheckedUsers: (state, action) => {
      state.settings.users = [...action.payload];
      return state;
    },
    selectUser: (state, action) => {
      state.settings.users.push(action.payload);
      return state;
    },
    deselectUser: (state, action) => {
      const userIndex = state.settings.users.indexOf(action.payload);
      state.settings.users.splice(userIndex, 1);
      return state;
    },
    closeSettings: (state) => {
      state.settings = initialState.settings;
      return state;
    },
  },
});

export const storyReducer = storySlice.reducer;

export const getStoryOptionsState = (state) => state.story.options;

export const getMuteStoryAuthorState = (state) => state.story.mute;

export const getDeleteStoryState = (state) => state.story.deleteStory;

export const getUploadedMedia = (state) => state.story.uploadedMedia;

export const getStorySettingsState = (state) => state.story.settings;
