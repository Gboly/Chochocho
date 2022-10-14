import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api";
import { layoutReducer } from "../layout/layoutSlice";
import { createPostReducer } from "../feaures/posts/create-post/createPostSlice";
import { postExcerptReducer } from "../feaures/posts/post-excerpt/postExcerptSlice";
import { profileReducer } from "../pages/profile/profileSlice";
import { notificationReducer } from "../pages/notifications/notificationSlice";
import { communityReducer } from "../pages/community/communitySlice";
import { rightbarReducer } from "../feaures/right-bar/righbarSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    layout: layoutReducer,
    createPost: createPostReducer,
    postExcerpt: postExcerptReducer,
    profile: profileReducer,
    notification: notificationReducer,
    community: communityReducer,
    rightbar: rightbarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
