import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import {
  getTransformed,
  removeFromAnArray,
  selectTotalFetchedResult,
  unNormalize,
} from "../../util/functions";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post?._id || post?.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

const initialState = postsAdapter.getInitialState();

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ skip, limit }) =>
        `/posts?type=post&_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, meta, args) => {
        // The args are attached to each post data to allow for easy access when making optimistic update
        return getTransformed(response, postsAdapter, "getPosts", args);
      },
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
      transformResponse: (response, _, args) =>
        getTransformed(response, postsAdapter, "getPostsByUserId", args),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Posts", id: "User" },
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
    getPostById: builder.query({
      query: ({ id, skip, limit }) => `/posts?id=${id}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, _, args) =>
        getTransformed(response, postsAdapter, "getPostComments", args),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
        ],
    }),
    getPostCommentsOrParents: builder.query({
      query: ({ id, type, skip, limit }) =>
        `/posts/${id}/${type}?_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, _, args) =>
        getTransformed(
          response,
          postsAdapter,
          "getPostCommentsOrParents",
          args
        ),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
        ],
    }),
    reactToPost: builder.mutation({
      query: ({ postId, type }) => ({
        url: `/posts/${postId}/react`,
        method: "PUT",
        body: { type },
        credentials: "include",
      }),
      async onQueryStarted(
        { postId, type, fetchType: { name, args }, update },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          extendedPostsApiSlice.util.updateQueryData(name, args, (draft) => {
            const post = draft.entities[postId];
            post && (post[type] = update());
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
    }),
    addPost: builder.mutation({
      query: (body) => ({
        url: "/posts",
        method: "POST",
        body,
        credentials: "include",
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `/posts/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostCommentsOrParentsQuery,
  useGetPostsByUserIdQuery,
  useGetPostByIdQuery,
  useReactToPostMutation,
  useAddPostMutation,
  useAddCommentMutation,
  useDeletePostMutation,
} = extendedPostsApiSlice;

const selectedEndPoints = [
  "getPosts",
  "getPostCommentsOrParents",
  "getPostsByUserId",
  "getPostById",
];

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
export const selectRegularPosts = createSelector(
  (state) => state,
  (state) => {
    const regularPostData = selectTotalFetchedResult(
      state,
      regularPostsEndPoint,
      initialState
    );
    return regularPostData || [];
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

const commentsOrParentsEndpoint = ["getPostCommentsOrParents"];
export const selectPostCommentsOrParentsIds = createSelector(
  (state, originalArgs) => ({ state, originalArgs }),
  ({ state, originalArgs }) => {
    const data = selectTotalFetchedResult(
      state,
      commentsOrParentsEndpoint,
      initialState,
      originalArgs
    );
    return data?.ids || [];
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
