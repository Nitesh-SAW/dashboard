import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  buttons: [],
};

const headerSlice = createSlice({
  name: "Header",
  initialState,
  reducers: {
    setHeader(state, action) {
      state.title = action.payload.title;
      state.buttons = action.payload.buttons || [];
    },
    clearHeader(state) {
      state.title = "";
      state.buttons = [];
    },
  },
});

export const { setHeader, clearHeader } = headerSlice.actions;
export default headerSlice.reducer;
