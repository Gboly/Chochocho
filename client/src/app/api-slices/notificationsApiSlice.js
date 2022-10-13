import { apiSlice } from "../api";
import { createEntityAdapter } from "@reduxjs/toolkit";
import { selectTotalFetchedResult, unNormalize } from "../../util/functions";

const notificationsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date),
});

export const initialState = notificationsAdapter.getInitialState();

const refineNotification = (response) =>
  response.map((item) => {
    item.date = new Date(item.date).toISOString();
    return item;
  });

const extendedNotificationsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      // When using proper backend, the searchQuery is not need because req.user would settle it
      query: ({ searchQuery, start, end }) =>
        `/notifications?id=${searchQuery}&_start=${start}&_end=${end}`,
      // Normally, i should use this queryState instead of initialState together with upsertMany but it just doesn't produce the right result
      // I'm combining the prvious result together with the new just so the skip-limit process is better
      transformResponse: (response, meta, { queryState }) => {
        const refinedNotification = refineNotification(response);
        const presentState = unNormalize(queryState);
        const newState = [...presentState, ...refinedNotification];
        return notificationsAdapter.setAll(initialState, newState);
      },
      providesTags: (result) => {
        return [
          { type: "Notifications", id: "List" },
          ...result.ids.map((id) => ({ type: "Notifications", id })),
        ];
      },
    }),
  }),
});

export const { useGetNotificationsQuery } = extendedNotificationsApiSlice;

const selectedEndPoints = ["getNotifications"];
export const {
  selectAll: selectAllNotifications,
  selectById: selectNotificationById,
  selectIds: selectNotificationsIds,
} = notificationsAdapter.getSelectors((state) =>
  selectTotalFetchedResult(state, selectedEndPoints, initialState)
);
