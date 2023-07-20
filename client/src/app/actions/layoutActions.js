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
  openReport,
  closeReport,
  setReportValue,
  setIsReporting,
  setIsReported,
  openLogOut,
  closeLogOut,
  hideOpaqueOverlay,
} = layoutSlice.actions;
