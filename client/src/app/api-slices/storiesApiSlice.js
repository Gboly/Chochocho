import { apiSlice } from "../api";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProgress } from "../actions/layoutActions";
import { extendedUsersApiSlice } from "./usersApiSlice";
import { removeFromAnArray, showErrorAlert } from "../../util/functions";

const storiesAdapter = createEntityAdapter({});

const initialState = storiesAdapter.getInitialState();

const extendedStoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoryById: builder.query({
      query: (storyId) => `/stories/${storyId}`,
      transformResponse: (response, meta, arg) => response,
      providesTags: (result) => [{ type: "Stories", id: result }],
    }),
    createStory: builder.mutation({
      queryFn: async ({ body }, api) => {
        try {
          const result = await axios.post(
            "http://localhost:3100/stories",
            body,
            {
              headers: {
                // Using sessionStorage to keep auth token is not a good practice. This would be corrected later.
                "auth-token": sessionStorage.getItem("authToken"),
              },
              onUploadProgress: (upload) => {
                let progress = Math.round((100 * upload.loaded) / upload.total);
                // This is just a UI trick.
                api.dispatch(updateProgress(progress === 100 ? 95 : progress));
              },
            }
          );

          api.dispatch(updateProgress(100));
          return { data: result.data };
        } catch (axiosError) {
          let err = axiosError;
          return {
            error: {
              status: err.response?.status,
              data: err.response?.data || err.message,
            },
          };
        }
      },
      invalidatesTags: (result, error, { authUserId }) => [
        { type: "Users", id: "auth" },
      ],
    }),
    deleteStory: builder.mutation({
      query: ({ storyId }) => ({
        url: `/stories/${storyId}`,
        method: "DELETE",
        credentials: "include",
      }),
      async onQueryStarted(
        { storyId },
        { dispatch, queryFulfilled, getState }
      ) {
        const patchResult = dispatch(
          extendedUsersApiSlice.util.updateQueryData(
            "getAuthUser",
            undefined,
            (draft) => {
              const myStories = draft.myStories;
              draft.myStories = myStories.filter(
                (myStory) => myStory.storyId !== storyId
              );
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          showErrorAlert();
          patchResult.undo();
        }
      },
    }),
    muteStoryAuthor: builder.mutation({
      query: ({ userId }) => ({
        url: `/stories/${userId}/mute`,
        method: "PUT",
        credentials: "include",
      }),
      async onQueryStarted({ userId }, { dispatch, queryFulfilled, getState }) {
        const patchResult = dispatch(
          extendedUsersApiSlice.util.updateQueryData(
            "getAuthUser",
            undefined,
            (draft) => {
              let authors = draft?.mutedStoryAuthors;
              const isMuted = (authors || []).some(
                (author) => author.userId === userId
              );
              isMuted
                ? (draft.mutedStoryAuthors = removeFromAnArray(
                    authors,
                    "userId",
                    userId
                  ))
                : (draft.mutedStoryAuthors = [...authors, { userId }]);
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          showErrorAlert();
          patchResult.undo();
        }
      },
    }),
    viewStory: builder.mutation({
      query: ({ storyId }) => ({
        url: `/stories/${storyId}`,
        method: "PATCH",
        credentials: "include",
      }),
      // async onQueryStarted(
      //   { storyId },
      //   { dispatch, queryFulfilled, getState }
      // ) {
      //   const patchResult = dispatch(
      //     extendedUsersApiSlice.util.updateQueryData(
      //       "getAuthUser",
      //       undefined,
      //       (draft) => {
      //         const otherStories = draft?.otherStories;
      //         const updated = otherStories.map((story) =>
      //           story.storyId === storyId ? { ...story, viewed: true } : story
      //         );
      //         draft.otherStories = updated;
      //       }
      //     )
      //   );
      //   try {
      //     await queryFulfilled;
      //   } catch (error) {
      //     showErrorAlert();
      //     patchResult.undo();
      //   }
      // },
    }),
  }),
});

export const {
  useGetStoryByIdQuery,
  useCreateStoryMutation,
  useDeleteStoryMutation,
  useMuteStoryAuthorMutation,
  useViewStoryMutation,
} = extendedStoriesApiSlice;
