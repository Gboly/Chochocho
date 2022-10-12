import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import { selectTotalFetchedResult } from "../../util/functions";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

const addDate = (responseData) =>
  responseData.map((post) => {
    post.date = new Date().toISOString();
    return post;
  });

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts?type=post",
      transformResponse: (responseData, meta, arg) => {
        //Adding date is just due to fact that posts in the fake document doesn't contain date. This should be corrected after setting up backend.
        const loadedPosts = addDate(responseData);
        return postsAdapter.upsertMany(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) =>
        result && [
          { type: "Posts", id: "List" },
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
    getPostComments: builder.query({
      query: (commentsIds) => `/posts?id=${commentsIds}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, meta, arg) => {
        const loadedPosts = addDate(response);
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
        ],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostCommentsQuery } =
  extendedPostsApiSlice;

const selectedEndPoints = ["getPosts", "getPostComments"];

// This provides both regular posts and comments
export const {
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);

// This provides all regular postIds (no comments)
export const selectRegularPostIds = createSelector(selectAllPosts, (allPosts) =>
  allPosts.reduce((accum, post) => {
    post.type === "post" && accum.push(post.id);
    return accum;
  }, [])
);

export const selectPostIdsByUserId = createSelector(
  [selectAllPosts, (state, userId) => userId],
  (allPosts, userId) => {
    const userPosts = allPosts.reduce((accum, current) => {
      current?.userId === userId && accum.push(current.id);
      return accum;
    }, []);
    return userPosts;
  }
);
