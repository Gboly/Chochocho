import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api";

const postsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
      transformResponse: (responseData) => {
        const loadedPosts = responseData.map((post) => {
          post.date = new Date().toISOString();
          return post;
        });
        return postsAdapter.setAll(initialState, loadedPosts);
      },
      providesTags: (result, error, arg) =>
        result && [
          { type: "Posts", id: "List" },
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
  }),
});

export const { useGetPostsQuery } = extendedPostsApiSlice;

const selectPostResult = extendedPostsApiSlice.endpoints.getPosts.select();

const selectPostData = createSelector(selectPostResult, (postResult) => {
  const data = postResult.data;
  return data;
});

export const {
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) => selectPostData(state) ?? initialState);

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
