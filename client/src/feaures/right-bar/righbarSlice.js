import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendsOptionState: { isOpen: false },
};

export const rightbarSlice = createSlice({
  name: "rightbar",
  initialState,
  reducers: {
    openFriendsOptions: (state) => {
      state.friendsOptionState.isOpen = true;
      return state;
    },
    closeFriendsOptions: (state) => {
      state.friendsOptionState.isOpen = false;
      return state;
    },
  },
});

export const rightbarReducer = rightbarSlice.reducer;

export const getFriendsOptionsState = (state) =>
  state.rightbar.friendsOptionState;
