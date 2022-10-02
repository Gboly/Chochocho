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
  setIsFreshPage,
  updateScrollCache,
} = layoutSlice.actions;
