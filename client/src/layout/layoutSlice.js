import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opaqueOverlay: { isOpen: false, type: "" },
  transparentOverlay: { isOpen: false, type: "" },
  sidebarNav: false,
  confirmation: { isOpen: false, type: "" },
  pageHeight: "",
  scrollCache: { isFreshPage: true, scrollTopStack: [] },
};

export const layoutSlice = createSlice({
  name: "layout",
  initialState,
  reducers: {
    openOpaqueOverlay: (state, action) => {
      state.opaqueOverlay = { isOpen: true, type: action.payload || "" };
      return state;
    },
    closeOpaqueOverlay: (state) => {
      state.opaqueOverlay = { isOpen: false, type: "" };
      return state;
    },
    openTransparentOverlay: (state, action) => {
      state.transparentOverlay = { isOpen: true, type: action.payload || "" };
      return state;
    },
    closeTransparentOverlay: (state) => {
      state.transparentOverlay = { isOpen: false, type: "" };
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
      state.confirmation = { isOpen: true, type: action.payload };
      return state;
    },
    closeConfirmation: (state) => {
      state.confirmation = { isOpen: false, type: "" };
      return state;
    },
    setPageHeight: (state, action) => {
      state.pageHeight = action.payload;
      return state;
    },
    setIsFreshPage: (state, action) => {
      state.scrollCache.isFreshPage = action.payload;
      return state;
    },
    updateScrollCache: (state, action) => {
      action.payload
        ? state.scrollCache.scrollTopStack.push(action.payload)
        : state.scrollCache.scrollTopStack.pop();
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
export const getScrollCacheState = (state) => state.layout.scrollCache;
