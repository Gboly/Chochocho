import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postOptionsState: { isOpen: false, postId: "", optionType: "" },
  postShareState: { isOpen: false, postId: "", username: "" },
  reportPostState: { isOpen: false, valueId: "", id: "" },
  followPosterState: { isOpen: false, id: "" },
  blockPosterState: { isOpen: false, id: "" },
  hiddenPosts: [],
  removedPosts: [],
  fullscreenState: { isOpen: false, media: "" },
  altMessageState: { isOpen: false, alt: "" },
  deletePost: { isOpen: false, id: "" },
  customVideoPlaybackSpeed: { isOpen: false, rateId: 3, id: "" },
  // #11
  engagedUsersListState: { isOpen: false, type: "", userIds: [] },
};

export const postExcerptSlice = createSlice({
  name: "post-excerpt",
  initialState,
  reducers: {
    openPostOption: (state, action) => {
      const { postId, optionType } = action.payload;
      state.postOptionsState = { isOpen: true, postId, optionType };
      return state;
    },
    closePostOption: (state) =>
      (state = {
        ...state,
        postOptionsState: { isOpen: false, postId: "", optionType: "" },
      }),
    openPostShare: (state, action) => {
      const { postId, username } = action.payload;
      state.postShareState = { isOpen: true, postId, username };
      return state;
    },
    closePostShare: (state) =>
      (state = {
        ...state,
        postShareState: { isOpen: false, postId: "", username: "" },
      }),
    openEngagedUsersList: (state, action) => {
      const { type, userIds } = action.payload;
      state.engagedUsersListState = { isOpen: true, type, userIds };
      return state;
    },
    closeEngagedUsersList: (state) => {
      state.engagedUsersListState = { isOpen: false, type: "", userIds: [] };
      return state;
    },
    openReportPost: (state, action) => {
      state.reportPostState.isOpen = true;
      state.reportPostState.id = action.payload;
      state.postOptionsState.isOpen = false;
      return state;
    },
    closeReportPost: (state) => {
      state.reportPostState = { isOpen: false, valueId: "", id: "" };
      return state;
    },
    setReportValue: (state, action) => {
      state.reportPostState.valueId = action.payload;
      return state;
    },
    openFollowPoster: (state, action) => {
      state.followPosterState = { isOpen: true, id: action.payload };
      state.postOptionsState.isOpen = false;
      return state;
    },
    closeFollowPoster: (state) => {
      state.followPosterState = { isOpen: false, id: "" };
    },
    openBlockPoster: (state, action) => {
      state.blockPosterState = { isOpen: true, id: action.payload };
      state.postOptionsState.isOpen = false;
      return state;
    },
    closeBlockPoster: (state) => {
      state.blockPosterState = { isOpen: false, id: "" };
    },
    hidePost: (state, action) => {
      state.hiddenPosts.push(action.payload);
      state.postOptionsState.isOpen = false;
      return state;
    },
    unhidePost: (state, action) => {
      const result = state.hiddenPosts.filter(
        (postId) => postId !== action.payload
      );
      state.hiddenPosts = result;
      return state;
    },
    removePost: (state, action) => {
      state.removedPosts.push(action.payload);
      return state;
    },
    openFullscreen: (state, action) => {
      state.fullscreenState = { isOpen: true, media: action.payload };
      return state;
    },
    closeFullscreen: (state) => {
      state.fullscreenState = { isOpen: false, media: "" };
      return state;
    },
    openAltMessage: (state, action) => {
      state.altMessageState = { isOpen: true, alt: action.payload };
      return state;
    },
    closeAltMessage: (state) => {
      state.altMessageState = { isOpen: false, alt: "" };
      return state;
    },
    openDeletePost: (state, action) => {
      state.deletePost = { isOpen: true, id: action.payload };
      state.postOptionsState.isOpen = false;
      return state;
    },
    closeDeletePost: (state) => {
      state.deletePost = { isOpen: false, id: "" };
      return state;
    },
    openPlaybackSpeed: (state, action) => {
      state.customVideoPlaybackSpeed = {
        ...state.customVideoPlaybackSpeed,
        isOpen: true,
        id: action.payload,
      };
      return state;
    },
    closePlaybackSpeed: (state) => {
      state.customVideoPlaybackSpeed = {
        ...state.customVideoPlaybackSpeed,
        isOpen: false,
        id: "",
      };
      return state;
    },
    setPlaybackRate: (state, action) => {
      state.customVideoPlaybackSpeed.rateId = action.payload;
      return state;
    },
  },
});

export const postExcerptReducer = postExcerptSlice.reducer;

export const getPostOptionState = (state) => state.postExcerpt.postOptionsState;

export const getPostShareState = (state) => state.postExcerpt.postShareState;

export const getReportPostState = (state) => state.postExcerpt.reportPostState;

export const getFollowPosterstate = (state) =>
  state.postExcerpt.followPosterState;

export const getBlockPosterstate = (state) =>
  state.postExcerpt.blockPosterState;

export const getHiddenPosts = (state) => state.postExcerpt.hiddenPosts;

export const getRemovedPosts = (state) => state.postExcerpt.removedPosts;

export const getFullscreenState = (state) => state.postExcerpt.fullscreenState;

export const getAltMessageState = (state) => state.postExcerpt.altMessageState;

export const getDeletePostState = (state) => state.postExcerpt.deletePost;

export const getPlaybackRateState = (state) =>
  state.postExcerpt.customVideoPlaybackSpeed;

// #11
export const getEngagedUsersListState = (state) =>
  state.postExcerpt.engagedUsersListState;
