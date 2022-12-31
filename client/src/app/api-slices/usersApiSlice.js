import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { selectTotalFetchedResult } from "../../util/functions";

import { apiSlice } from "../api";

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getUsersById: builder.query({
      query: ({ userIds, start, end }) => {
        if (!start && !end) {
          return `/users?id=${userIds}`;
        }
        return `/users?id=${userIds}&_start=${start}&_end=${end}`;
      },
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
    userSignUp: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: [{ type: "Users", id: "List" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUsersByIdQuery,
  useGetUsersByIdExceptionsQuery,
  useUserSignUpMutation,
} = extendedUsersApiSlice;

const selectedEndPoints = ["getUsersById", "getUsersByIdExceptions"];
export const {
  selectAll: selectAllFetchedUsers,
  selectIds: selectFetchedUsersIds,
  selectById: selectFetchedUsersById,
} = usersAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);
