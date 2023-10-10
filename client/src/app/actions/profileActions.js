import { profileSlice } from "../../pages/profile/profileSlice";

export const {
  openEditProfile,
  closeEditProfile,
  openEditProfileImage,
  closeEditProfileImage,
  setIsUpdating,
  setIsUpdated,
} = profileSlice.actions;
