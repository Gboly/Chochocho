import { apiSlice } from "../api";
import { createEntityAdapter } from "@reduxjs/toolkit";
import {
  findByIdKey,
  getTransformed,
  selectTotalFetchedResult,
} from "../../util/functions";
import { extendedUsersApiSlice } from "./usersApiSlice";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
  selectId: (notification) => notification?._id,
});

export const initialState = notificationsAdapter.getInitialState();

const extendedNotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: ({ skip, limit }) => `/notifications?_start=${skip}&_end=${limit}`,
      keepUnusedDataFor: 60 * 60 * 24 * 10,
      transformResponse: (response, meta, arg) =>
        getTransformed(response, notificationsAdapter, "getNotifications"),
      providesTags: (result) => {
        return [
          { type: "Notifications", id: "List" },
          ...result.ids.map((id) => ({ type: "Notifications", id })),
        ];
      },
    }),
    viewNotification: builder.mutation({
      query: ({ notificationId }) => ({
        url: `/notifications/${notificationId}`,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted({ notificationId }, { dispatch, queryFulfilled }) {
        const viewNotn = dispatch(
          extendedUsersApiSlice.util.updateQueryData(
            "getAuthUser",
            undefined,
            (draft) => {
              draft.notifications = draft.notifications.map((notification) => {
                notification.notificationId === notificationId &&
                  (notification.viewed = true);
                return notification;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          viewNotn.undo();
        }
      },
    }),
    markAllAsRead: builder.mutation({
      query: () => ({
        url: `/notifications/readAll`,
        method: "PATCH",
        credentials: "include",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        const viewNotn = dispatch(
          extendedUsersApiSlice.util.updateQueryData(
            "getAuthUser",
            undefined,
            (draft) => {
              draft.notifications = draft.notifications.map((notification) => {
                notification.viewed = true;
                return notification;
              });
            }
          )
        );
        try {
          await queryFulfilled;
        } catch (error) {
          viewNotn.undo();
        }
      },
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useViewNotificationMutation,
  useMarkAllAsReadMutation,
} = extendedNotificationsApiSlice;

const selectedEndPoints = ["getNotifications"];
export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationsIds,
} = notificationsAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);
