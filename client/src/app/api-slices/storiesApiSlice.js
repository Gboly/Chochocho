import { apiSlice } from "../api";
import { createEntityAdapter } from "@reduxjs/toolkit";

const storiesAdapter = createEntityAdapter({});

const initialState = storiesAdapter.getInitialState();

const extendedStoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getStoryById: builder.query({
      query: (storyId) => `/stories/${storyId}`,
      transformResponse: (response, meta, arg) => response,
      providesTags: (result) => [{ type: "Stories", id: result }],
    }),
  }),
});

export const { useGetStoryByIdQuery } = extendedStoriesApiSlice;
