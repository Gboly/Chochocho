import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  optionsState: { isOpen: false },
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    openNotificationOptions: (state, action) => {
      state.optionsState = { isOpen: true };
      return state;
    },
    closeNotificationOptions: (state) => {
      state.optionsState = initialState.optionsState;
      return state;
    },
  },
});

export const notificationReducer = notificationSlice.reducer;

export const getNotificationOptionsState = (state) =>
  state.notification.optionsState;
