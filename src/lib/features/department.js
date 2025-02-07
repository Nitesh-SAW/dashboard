import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchdepartment = createAsyncThunk("fetchdepartment", async () => {
  try {
    const response = await fetch("https://breezend-backend-2.onrender.com/api/job/get-department");
    if (!response.ok) throw new error("Failed to fetch");
    return await response.json();
  } catch (error) {
    console.log(error)
  }
});
const departmentslice = createSlice({
  name: "department",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  // No reducers needed for now
  extraReducers: (builder) => {
    builder
      .addCase(fetchdepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload; // Store fetched skills
      })
      .addCase(fetchdepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default departmentslice.reducer;
