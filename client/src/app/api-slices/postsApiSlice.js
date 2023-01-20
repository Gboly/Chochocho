import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { getTransformed, selectTotalFetchedResult } from "../../util/functions";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post._id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ skip, limit }) =>
        `/posts?type=post&_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response) => getTransformed(response, postsAdapter),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Posts", id: "List" },
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
    getPostsByUserId: builder.query({
      query: ({ userId, skip, limit }) =>
        `/posts?userId=${userId}&_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response) => getTransformed(response, postsAdapter),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Posts", id: "User" },
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
    getPostComments: builder.query({
      query: ({ ids, skip, limit }) =>
        `/posts?id=${ids}&_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response) => getTransformed(response, postsAdapter),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
        ],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostCommentsQuery,
  useGetPostsByUserIdQuery,
} = extendedPostsApiSlice;

const selectedEndPoints = ["getPosts", "getPostComments", "getPostsByUserId"];

// This provides both regular posts and comments
export const {
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);

// This provides all regular postIds (no comments)
// export const selectRegularPostIds = createSelector(selectAllPosts, (allPosts) =>
//   allPosts.reduce((accum, post) => {
//     post.type === "post" && accum.push(post._id);
//     return accum;
//   }, [])
// );
const regularPostsEndPoint = ["getPosts"];
export const selectRegularPostIds = createSelector(
  (state) => state,
  (state) => {
    const regularPostData = selectTotalFetchedResult(
      state,
      regularPostsEndPoint,
      initialState
    );
    return regularPostData?.ids || [];
  },
  []
);

const postByUserIdEndPoint = ["getPostsByUserId"];
export const selectPostIdsByUserId = createSelector(
  (state, originalArgs) => ({ state, originalArgs }),
  ({ state, originalArgs }) => {
    const userPostsData = selectTotalFetchedResult(
      state,
      postByUserIdEndPoint,
      initialState,
      originalArgs
    );
    return userPostsData?.ids || [];
  },
  []
);

// export const selectPostIdsByUserId = createSelector(
//   [selectAllPosts, (state, userId) => userId],
//   (allPosts, userId) => {
//     const userPosts = allPosts.reduce((accum, current) => {
//       current?.userId === userId && accum.push(current.id);
//       return accum;
//     }, []);
//     return userPosts;
//   }
// );
