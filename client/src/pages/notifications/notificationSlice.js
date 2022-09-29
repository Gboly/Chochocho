import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  optionsState: { isOpen: false },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotificationOptions: (state) => {
      state.optionsState.isOpen = true;
      return state;
    },
    closeNotificationOptions: (state) => {
      state.optionsState.isOpen = false;
      return state;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;

export const getNotificationOptionsState = (state) =>
  state.notification.optionsState;
