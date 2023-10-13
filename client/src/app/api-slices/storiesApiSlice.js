import { apiSlice } from "../api";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import axios from "axios";
import { updateProgress } from "../actions/layoutActions";

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
  }),
});

export const { useGetStoryByIdQuery, useCreateStoryMutation } =
  extendedStoriesApiSlice;
