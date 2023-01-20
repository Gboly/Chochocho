import { layoutSlice } from "../../layout/layoutSlice";

export const {
  openSidebarNav,
  closeSidebarNav,
  showConfirmation,
  closeConfirmation,
  setPageHeight,
  openOpaqueOverlay,
  closeOpaqueOverlay,
  openTransparentOverlay,
  closeTransparentOverlay,
  openLogOut,
  closeLogOut,
} = layoutSlice.actions;
