import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addJob = createAsyncThunk("job/addJob", async (job) => {
  console.log(job);
  try {
    const response = await fetch("https://breezend-backend-2.onrender.com/api/job/create-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error Details:", errorDetails);
      throw new Error(errorDetails.message || "Failed to submit the form");
    }

    const result = await response.json();
    console.log("Form submitted successfully:", result);
  } catch (error) {
    console.log("Internal server error", error);
  }
});

export const getJobs = createAsyncThunk("job/getJobs", async () => {
  const response = await fetch("http://localhost:3005/api/job/get-jobs");
  if (!response.ok) throw new error("Failed to fetch");
  return await response.json();
});

const jobSlice = createSlice({
  name: "Job",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.fulfilled, (state, action) => {
        (state.loading = false), state.jobs.push(action.payload);
      })
      .addCase(getJobs.pending, (state) => {
        (state.loading = true), (state.error = null);
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        (state.loading = false), (state.jobs = action.payload);
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default jobSlice.reducer;
