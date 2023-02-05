import { createSlice } from "@reduxjs/toolkit";
import { visibilityOptions } from "../../../util/formRadioOptions";

const initialState = {
  createPost: false,
  editPost: { isOpen: false, id: "" },
  visibiltyOptionsState: { isOpen: false, valueId: 0 },
  postText: "",
  // Make provision for more than one picture
  uploadedMedia: { type: "", src: "", reading: false },
  writeAlt: { isOpen: false, value: "", type: "" },
};

export const createPostSlice = createSlice({
  name: "createPost",
  initialState,
  reducers: {
    openCreatePost: (state) => (state = { ...state, createPost: true }),
    closeCreatePost: (state) => {
      state.createPost = false;
      if (state.writeAlt.isOpen) {
        state.writeAlt.isOpen = false;
      }
    },
    openEditPost: (state, action) => {
      state.editPost = { isOpen: true, id: action.payload };
      return state;
    },
    closeEditPost: (state, action) => {
      state = { ...initialState };
      return state;
    },
    showVisibilityOptions: (state) => {
      state.visibiltyOptionsState.isOpen = true;
      return state;
    },
    hideVisibiltyOptions: (state) => {
      state.visibiltyOptionsState.isOpen = false;
      return state;
    },
    setVisibilityValue: (state, action) => {
      state.visibiltyOptionsState.valueId = action.payload;
      return state;
    },
    writePost: (state, action) => {
      state.postText = action.payload;
      return state;
    },
    readUploadedMedia: (state, action) => {
      const { type, src, reading } = action.payload;
      if (reading === true) {
        state.uploadedMedia.reading = true;
      } else {
        state.uploadedMedia = { type, src, reading: false };
      }
      return state;
    },
    removeMedia: (state) => {
      state.uploadedMedia = { type: "", src: "", reading: false };
      state.writeAlt.value = "";
      return state;
    },
    openWriteAlt: (state, action) => {
      state.writeAlt = {
        isOpen: true,
        value: action.payload?.defaultAlt || "",
        type: action.payload?.type || "",
      };

      //This is taking care of both the edit post scenario and normal create post scenario.
      //It is closing down either createPost or editPost depending on the one that is currently being displayed.
      if (state.writeAlt.type === "create post") {
        state.createPost = false;
      } else if (state.writeAlt.type === "edit post") {
        state.editPost.isOpen = false;
      }

      return state;
    },
    closeWriteAlt: (state) => {
      state.writeAlt.isOpen = false;

      //This is taking care of both the edit post scenario and normal create post scenario.
      //It is bringing back createPost popup after closing down writeAlt
      if (state.writeAlt.type === "create post") {
        state.createPost = true;
      } else if (state.writeAlt.type === "edit post") {
        state.editPost.isOpen = true;
      }
      return state;
    },
    setAltValue: (state, action) => {
      state.writeAlt.value = action.payload;
      return state;
    },
  },
});

export const createPostReducer = createPostSlice.reducer;

export const getCreatePostState = (state) => state.createPost.createPost;

export const getEditPostState = (state) => state.createPost.editPost;

export const getVisibilityOptionsState = (state) =>
  state.createPost.visibiltyOptionsState;

export const getPostText = (state) => state.createPost.postText;

export const getUploadedMedia = (state) => state.createPost.uploadedMedia;

export const getWriteAltState = (state) => state.createPost.writeAlt;

export const getNewPostDetails = ({ createPost }) => {
  const {
    postText,
    uploadedMedia: { type, src },
    writeAlt: { value },
    visibiltyOptionsState: { valueId },
  } = createPost;
  const content = postText;
  const mediaType = type ? type.split("/")[0] : "";
  const media = [{ src, alt: value }];
  const visibleFor = visibilityOptions[valueId];

  return { content, mediaType, media, visibleFor };
};

// export const getPostByCurrent
