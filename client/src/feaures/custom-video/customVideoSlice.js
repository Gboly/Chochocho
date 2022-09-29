import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  initialPlay: { isOpen: false, id: "" },
  playing: { isOpen: false, id: "" },
  controls: { isOpen: false, id: "" },
};

export const customVideoSlice = createSlice({
  name: "custom-video",
  initialState,
  reducers: {
    setInitialPlay: (state, action) => {
      state.initialPlay = { isOpen: false, id: action.payload };
      state.controls = { isOpen: false, id: action.payload };
      state.playing = { isOpen: false, id: action.payload };
      return state;
    },
    showControls: (state, action) => {
      if (state.initialPlay.isOpen && state.playing.isOpen) {
        state.controls = { isOpen: true, id: action.payload };
      }
      return state;
    },
    hideControls: (state, action) => {
      if (state.initialPlay && state.playing) {
        state.controls = { isOpen: false, id: action.payload };
      }
      return state;
    },
    playOrPause: (state, action) => {
      if (!state.playing.isOpen) {
        state.playing = { isOpen: true, id: action.payload };
      } else {
        state.playing = { isOpen: false, id: action.payload };
      }
      return state;
    },
  },
});

export const customVideoReducer = customVideoSlice.reducer;

export const getInitialPlayState = (state) => state.customVideo.initialPlay;
export const getPlayState = (state) => state.customVideo.playing;
export const getControlsState = (state) => state.customVideo.controls;
