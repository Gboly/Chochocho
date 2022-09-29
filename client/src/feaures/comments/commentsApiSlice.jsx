import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../../app/api";

const commentsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = commentsAdapter.getInitialState();

export const extendedCommentsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => "/comments",
      transformResponse: (responseData) => {
        const loadedComments = responseData.map((comment) => {
          comment.date = new Date().toISOString();
          return comment;
        });
        return commentsAdapter.setAll(initialState, loadedComments);
      },
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
        ],
    }),
  }),
});

export const { useGetCommentsQuery } = extendedCommentsApiSlice;

const selectCommentResult =
  extendedCommentsApiSlice.endpoints.getComments.select();

const selectCommentData = createSelector(
  selectCommentResult,
  (commentResult) => {
    const data = commentResult.data;
    return data;
  }
);

export const {
  selectAll: selectAllComments,
  selectIds: selectCommentsIds,
  selectById: selectCommentById,
} = commentsAdapter.getSelectors(
  (state) => selectCommentData(state) ?? initialState
);

export const selectCommentByPostId = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) => comments.filter((comment) => comment.postId === postId)
);

export const selectPostTotalComments = createSelector(
  [selectAllComments, (state, postId) => postId],
  (comments, postId) =>
    comments.filter((comment) => comment.postId === postId).length
);
