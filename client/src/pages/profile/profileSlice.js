import { createSlice } from "@reduxjs/toolkit";
import { settingsType } from "../../util/types";

const initialState = {
  editProfileState: { isOpen: false },
  editProfileImageState: {
    isOpen: false,
    initiatingRoute: "",
    imageType: "",
    reading: false,
    src: "",
  },
  isUpdating: false,
  isUpdated: false,
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    openEditProfile: (state) => {
      state.editProfileState.isOpen = true;
      return state;
    },
    closeEditProfile: (state) => {
      state.editProfileState.isOpen = false;
      state.isUpdated = false;
      return state;
    },
    openEditProfileImage: (state, action) => {
      const { src, reading, imageType } = action.payload;
      if (state.editProfileState.isOpen) {
        state.editProfileState.isOpen = false;
      }
      if (reading) {
        state.editProfileImageState.reading = true;
      } else {
        state.editProfileImageState = {
          isOpen: true,
          initiatingRoute: action.payload?.initiatingRoute,
          src,
          imageType,
          reading: false,
        };
      }
      return state;
    },
    closeEditProfileImage: (state) => {
      const preservedInitiatingRoute =
        state.editProfileImageState.initiatingRoute;
      state.editProfileImageState = { ...initialState.editProfileImageState };
      preservedInitiatingRoute !== settingsType &&
        (state.editProfileState.isOpen = true);
      state.isUpdated = false;
      return state;
    },
    setIsUpdating: (state) => ({
      ...state,
      isUpdating: true,
    }),
    setIsUpdated: (state) => ({
      ...state,
      isUpdating: false,
      isUpdated: true,
    }),
  },
});

export const getEditProfileState = (state) => state.profile.editProfileState;
export const getEditProfileImageState = (state) =>
  state.profile.editProfileImageState;
export const getProfileUpdateState = ({
  profile: { isUpdated, isUpdating },
}) => ({
  isUpdated,
  isUpdating,
});

export const profileReducer = profileSlice.reducer;
