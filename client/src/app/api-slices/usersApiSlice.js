import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { selectTotalFetchedResult } from "../../util/functions";

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
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getUsersById: builder.query({
      query: ({ userIds, start, end }) =>
        `/users?id=${userIds}&_start=${start}&_end=${end}`,
      transformResponse: (response) =>
        usersAdapter.setAll(initialState, response),
      providesTags: (result, error, arg) => [
        { type: "Users", id: "List" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
    getUsersByIdExceptions: builder.query({
      query: ({ userIds, start, end }) =>
        `/users?id_ne=${userIds}&_start=${start}&_end=${end}`,
      transformResponse: (response) =>
        usersAdapter.setAll(initialState, response),
      providesTags: (result, error, arg) => [
        { type: "Users", id: "List" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUsersByIdQuery,
  useGetUsersByIdExceptionsQuery,
} = extendedUsersApiSlice;

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

const selectedEndPoints = ["getUsersById", "getUsersByIdExceptions"];
export const {
  selectAll: selectAllFetchedUsers,
  selectIds: selectFetchedUsersIds,
  selectById: selectFetchedUsersById,
} = usersAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);
