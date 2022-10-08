import { createEntityAdapter, createSelector, current } from "@reduxjs/toolkit";
import { unNormalize } from "../../util/functions";
import { store } from "../store";

import { apiSlice } from "../api";

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

const selectPostResult = extendedPostsApiSlice.endpoints.getPosts.select();

export const selectPostData = createSelector(selectPostResult, (postResult) => {
  const data = postResult.data;
  return data;
});

const selectedEndPoints = ["getPosts", "getPostComments"];

const selectQueriesData = (queries) =>
  Object.values(queries).reduce((accum, query) => {
    selectedEndPoints.includes(query.endpointName) &&
      query.status === "fulfilled" &&
      accum.push(query.data);
    return accum;
  }, []);

const mergeSelectedQueriesData = (selectedQueriesData) =>
  selectedQueriesData.reduce((accum, current) => {
    accum = {
      // Removing duplicates from ids
      ids: [...new Set([...accum.ids, ...current.ids])],
      entities: { ...accum.entities, ...current.entities },
    };
    return accum;
  }, initialState);

export const selectPostsAndPostCommentsResult = (state) => {
  const selectedQueriesData = selectQueriesData(state.api.queries);
  const mergedSelectedQueriesData =
    mergeSelectedQueriesData(selectedQueriesData);
  return mergedSelectedQueriesData;
};

// This provides both regular posts and comments
export const {
  selectAll: selectAllPosts,
  selectIds: selectPostsIds,
  selectById: selectPostById,
} = postsAdapter.getSelectors((state) =>
  selectPostsAndPostCommentsResult(state)
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
