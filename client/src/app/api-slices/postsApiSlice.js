import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api";
import {
  getPostTransformed,
  getTransformed,
  removeFromAnArray,
  selectTotalFetchedResult,
  unNormalize,
} from "../../util/functions";

const postsAdapter = createEntityAdapter({
  selectId: (post) => post?._id || post?.id,
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const postSliceInitialState = postsAdapter.getInitialState();

export const extendedPostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: ({ skip, limit }) =>
        `/posts?type=post&type=repost&_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, meta, args) => {
        // The args are attached to each post data to allow for easy access when making optimistic update
        return getPostTransformed(response, postsAdapter);
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
        getPostTransformed(response, postsAdapter),
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
        response && getPostTransformed(response, postsAdapter),
      providesTags: (result, error, arg) =>
        result && [
          { type: "Comments", id: "List" },
          { type: "Posts", id: "List" },
          ...result.ids.map((id) => ({ type: "Comments", id })),
          ...result.ids.map((id) => ({ type: "Posts", id })),
        ],
    }),
    getPostCommentsOrParents: builder.query({
      query: ({ id, type, skip, limit }) =>
        `/posts/${id}/${type}?_start=${skip || ""}&_end=${limit || ""}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, _, args) =>
        getPostTransformed(response, postsAdapter),
      providesTags: (result, error, arg) => {
        return (
          result && [
            { type: "Comments", id: "List" },
            ...result.ids.map((id) => ({ type: "Comments", id })),
          ]
        );
      },
    }),
    reactToPost: builder.mutation({
      query: ({ postId, type }) => ({
        url: `/posts/${postId}/react`,
        method: "PUT",
        body: { type },
        credentials: "include",
      }),
      async onQueryStarted(
        { postId, type, update, tagType },
        { dispatch, queryFulfilled, getState }
      ) {
        //const tagTypes = [{ type: tagType, id: postId }];
        const tagTypes = [
          { type: "Posts", id: postId },
          { type: "Comments", id: postId },
        ];
        let updateResult = update();
        for (const {
          endpointName,
          originalArgs,
        } of extendedPostsApiSlice.util.selectInvalidatedBy(
          getState(),
          tagTypes
        )) {
          const patchResult = dispatch(
            extendedPostsApiSlice.util.updateQueryData(
              endpointName,
              originalArgs,
              (draft) => {
                const post = draft.entities[postId];
                post && (post[type] = updateResult);
              }
            )
          );
          try {
            await queryFulfilled;
          } catch (error) {
            patchResult.undo();
          }
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

export const postsQueryEndPoints = [
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
  selectTotalFetchedResult(state, postsQueryEndPoints, postSliceInitialState)
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
      postSliceInitialState
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
      postSliceInitialState,
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
      postSliceInitialState,
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
