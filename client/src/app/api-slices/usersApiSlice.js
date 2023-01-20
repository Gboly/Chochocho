import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { getTransformed, selectTotalFetchedResult } from "../../util/functions";

import { apiSlice } from "../api";

const usersAdapter = createEntityAdapter({
  selectId: (user) => user._id,
});

const initialState = usersAdapter.getInitialState();

export const extendedUsersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserById: builder.query({
      query: (userId) => `/users/${userId}`,
      transformResponse: (response) => getTransformed(response),
      providesTags: (result, error, id) => [{ type: "Users", id }],
    }),
    getUsersById: builder.query({
      query: ({ userIds, start, end }) => {
        if (!start && !end) {
          return `/users?id=${userIds}`;
        }
        return `/users?id=${userIds}&_start=${start}&_end=${end}`;
      },
      transformResponse: (response) => getTransformed(response, usersAdapter),
      providesTags: (result, error, arg) => [
        { type: "Users", id: "List" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
    getUsersByIdExceptions: builder.query({
      query: ({ userIds, start, end }) =>
        `/users?id_ne=${userIds}&_start=${start}&_end=${end}`,
      transformResponse: (response) => getTransformed(response, usersAdapter),
      providesTags: (result, error, arg) => [
        { type: "Users", id: "List" },
        ...result.ids.map((id) => ({ type: "Users", id })),
      ],
    }),
    userSignUp: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
        credentials: "include",
      }),
      transformResponse: (response) => {
        sessionStorage.setItem("authToken", response.token);
        return response;
      },
      invalidatesTags: [{ type: "Users", id: "List" }],
    }),
    userSignin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
        credentials: "include",
        // mode: "cors",
      }),
      transformResponse: (response) => {
        sessionStorage.setItem("authToken", response.token);
        return response;
      },
      invalidatesTags: [{ type: "Users", id: "List" }],
    }),
    getAuthUser: builder.query({
      query: () => "/users/authUser",
      transformResponse: (response) => getTransformed(response),
      providesTags: (result, error, arg) => [{ type: "Users", id: "auth" }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useGetUsersByIdQuery,
  useGetUsersByIdExceptionsQuery,
  useUserSignUpMutation,
  useUserSigninMutation,
  useGetAuthUserQuery,
} = extendedUsersApiSlice;

const selectedEndPoints = ["getUsersById", "getUsersByIdExceptions"];
export const {
  selectAll: selectAllFetchedUsers,
  selectIds: selectFetchedUsersIds,
  selectById: selectFetchedUsersById,
} = usersAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);

export const selectUserIdsByArgs = createSelector(
  (state, originalArgs) => ({ state, originalArgs }),
  ({ state, originalArgs }) => {
    const usersData = selectTotalFetchedResult(
      state,
      selectedEndPoints,
      initialState,
      originalArgs
    );
    return usersData?.ids || [];
  },
  []
);
