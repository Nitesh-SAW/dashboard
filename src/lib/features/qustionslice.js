import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchqustion = createAsyncThunk("fetchqustion", async () => {
  const response = await fetch("https://breezend-backend-2.onrender.com/api/job/get-question");
  if (!response.ok) throw new error("Failed to create");
  return await response.json();
});

const qustionSlice = createSlice({
  name: "Qustion",
  initialState: {
    qustions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchqustion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchqustion.fulfilled, (state, action) => {
        state.loading = false;
        state.qustions = action.payload;
      })
      .addCase(fetchqustion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default qustionSlice.reducer;
