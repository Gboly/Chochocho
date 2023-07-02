import { layoutSlice } from "../../layout/layoutSlice";

export const {
  openSidebarNav,
  closeSidebarNav,
  showConfirmation,
  updateProgress,
  closeConfirmation,
  setPageHeight,
  openOpaqueOverlay,
  closeOpaqueOverlay,
  openTransparentOverlay,
  closeTransparentOverlay,
  openLogOut,
  closeLogOut,
  hideOpaqueOverlay,
} = layoutSlice.actions;
