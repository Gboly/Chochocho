import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  opaqueOverlay: { isOpen: false, type: "" },
  transparentOverlay: {
    isOpen: false,
    type: "",
    x: "",
    y: "",
    isBottom: false,
  },
  sidebarNav: false,
  confirmation: { isOpen: false, type: "" },
  pageHeight: "",
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
  },
});

export const layoutReducer = layoutSlice.reducer;

export const getSidebarState = (state) => state.layout.sidebarNav;
export const getConfirmationState = (state) => state.layout.confirmation;
export const getPageHeight = (state) => state.layout.pageHeight;
export const getOpaqueOverlayState = (state) => state.layout.opaqueOverlay;
export const getTransparentOverlayState = (state) =>
  state.layout.transparentOverlay;
