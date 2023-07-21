import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opaqueOverlay: { isOpen: false, type: "", hidden: false },
  transparentOverlay: {
    isOpen: false,
    type: "",
    x: "",
    y: "",
    isBottom: false,
  },
  sidebarNav: false,
  confirmation: { isOpen: false, type: "", progress: 0 },
  pageHeight: "",
  report: {
    isOpen: false,
    valueId: "",
    id: "",
    isReporting: false,
    isReported: false,
  },
  logOut: false,
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openOpaqueOverlay: (state, action) => {
      state.opaqueOverlay = {
        isOpen: true,
        type: action.payload || "",
        hidden: false,
      };
      return state;
    },
    hideOpaqueOverlay: (state, action) => {
      state.opaqueOverlay.hidden = true;
      return state;
    },
    closeOpaqueOverlay: (state) => {
      state.opaqueOverlay = { isOpen: false, type: "", hidden: false };
      return state;
    },
    openTransparentOverlay: (state, action) => {
      const { type, x, y, isBottom } = action.payload;
      state.transparentOverlay = {
        isOpen: true,
        type,
        x,
        y,
        isBottom: isBottom || false,
      };
      return state;
    },
    closeTransparentOverlay: (state) => {
      state.transparentOverlay = { isOpen: false, type: "", x: "", y: "" };
      return state;
    },
    openSidebarNav: (state) => {
      state.sidebarNav = true;
      return state;
    },
    closeSidebarNav: (state) => {
      state.sidebarNav = false;
      return state;
    },
    showConfirmation: (state, action) => {
      const { type, progress } = action.payload;
      state.confirmation = {
        isOpen: true,
        type,
        progress: progress || state.confirmation.progress,
      };
      return state;
    },
    updateProgress: (state, action) => {
      state.confirmation.progress = action.payload;
      return state;
    },
    closeConfirmation: (state) => {
      state.confirmation = initialState.confirmation;
      return state;
    },
    setPageHeight: (state, action) => {
      state.pageHeight = action.payload;
      return state;
    },
    openReport: (state, action) => {
      state.report = {
        ...state.report,
        isOpen: true,
        id: action.payload?.storyId || action.payload,
      };
      return state;
    },
    closeReport: (state) => {
      state.report = initialState.report;
      return state;
    },
    setReportValue: (state, action) => {
      state.report.valueId = action.payload;
      return state;
    },
    setIsReporting: (state) => {
      state.report.isReporting = true;
      return state;
    },
    setIsReported: (state) => {
      state.report = { ...state.report, isReporting: false, isReported: true };
    },
    openLogOut: (state, action) => {
      state.logOut = true;
      return state;
    },
    closeLogOut: (state, action) => {
      state.logOut = false;
      return state;
    },
  },
});

export const layoutReducer = layoutSlice.reducer;

export const getSidebarState = (state) => state.layout.sidebarNav;
export const getConfirmationState = (state) => state.layout.confirmation;
export const getPageHeight = (state) => state.layout.pageHeight;
export const getOpaqueOverlayState = (state) => state.layout.opaqueOverlay;
export const getTransparentOverlayState = (state) =>
  state.layout.transparentOverlay;
export const getReportState = (state) => state.layout.report;
export const getLogOutState = (state) => state.layout.logOut;
