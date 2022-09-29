import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

import { apiSlice } from "../api";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) =>
        usersAdapter.setAll(initialState, responseData),
      providesTags: (result, error, arg) => [
        { type: "Users", id: "Lists" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
  }),
});

export const { useGetUsersQuery } = extendedUsersApiSlice;

const selectUsersResult = extendedUsersApiSlice.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data
);

export const {
  selectAll: selectAllUsers,
  selectIds: selectUsersIds,
  selectById: selectUserById,
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
