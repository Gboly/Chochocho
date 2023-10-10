import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {
  getTransformed,
  selectTotalFetchedResult,
  mutualUpdate,
} from "../../util/functions";

import { apiSlice } from "../api";
import {
  setIsReported,
  setIsReporting,
  updateProgress,
} from "../actions/layoutActions";
import { setIsUpdated, setIsUpdating } from "../actions/profileActions";
import axios from "axios";

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
        ...(result?.ids || []).map((id) => ({ type: "Users", id })),
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
      providesTags: (result, error, arg) => [
        { type: "Users", id: "auth" },
        { type: "Users", id: result?.id },
      ],
    }),
    reportUser: builder.mutation({
      queryFn: async (body, api) => {
        try {
          api.dispatch(setIsReporting());
          const result = await axios.post(
            "http://localhost:3100/users/report",
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

          api.dispatch(setIsReported());
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
    }),
    followUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}/follow`,
        method: "PUT",
        credentials: "include",
      }),
      onQueryStarted(
        { authUserId, userId, updates },
        { dispatch, queryFulfilled, getState }
      ) {
        mutualUpdate({
          authUserId,
          userId,
          updates,
          getState,
          dispatch,
          queryFulfilled,
        });
      },
    }),
    blockUser: builder.mutation({
      query: ({ userId }) => ({
        url: `/users/${userId}/block`,
        method: "PUT",
        credentials: "include",
      }),
      onQueryStarted(
        { authUserId, userId, updates },
        { dispatch, queryFulfilled, getState }
      ) {
        mutualUpdate({
          authUserId,
          userId,
          updates,
          getState,
          dispatch,
          queryFulfilled,
          block: true,
        });
      },
    }),
    updateProfileDetails: builder.mutation({
      queryFn: async (body, api) => {
        try {
          api.dispatch(setIsUpdating());
          const result = await axios.patch(
            "http://localhost:3100/users/authUser",
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

          api.dispatch(setIsUpdated());
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
      invalidatesTags: [{ type: "Users", id: "auth" }],
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
  useReportUserMutation,
  useFollowUserMutation,
  useBlockUserMutation,
  useUpdateProfileDetailsMutation,
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
