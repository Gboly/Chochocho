import { createSlice } from "@reduxjs/toolkit";
import { getCommunityOutletIndexFromLocation } from "../../util/functions";

const initialState = {
  outletOption: {
    isOpen: false,
    valueId: getCommunityOutletIndexFromLocation(window.location.pathname),
  },
  ignoredSuggestedIds: [],
};

// console.log(window.location.pathname);

export const communitySlice = createSlice({
  name: "community",
  initialState,
  reducers: {
    openOutletOptions: (state) => {
      state.outletOption.isOpen = true;
      return state;
    },
    closeOutletOptions: (state) => {
      state.outletOption.isOpen = false;
      return state;
    },
    setOutletOption: (state, action) => {
      state.outletOption.valueId = action.payload;
      return state;
    },
    ignoreSuggestedUser: (state, action) => {
      state.ignoredSuggestedIds.push(action.payload);
      return state;
    },
  },
});

export const communityReducer = communitySlice.reducer;

export const getOutletOptionState = (state) => state.community.outletOption;

export const getIgnoredUserIds = (state) => state.community.ignoredSuggestedIds;
