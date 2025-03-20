import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
  const response = await fetch("https://breezend-backend-2.onrender.com/api/job/get-jobs");
  if (!response.ok) throw new error("Failed to fetch");
  return await response.json();
});

export const deleteJobs = createAsyncThunk(
  'job/deleteJobs',
  async (jobId, { rejectWithValue }) => {
    console.log("deleting Jobs:", jobId)
    try {
      const response = await axios.post('https://breezend-backend-2.onrender.com/api/job/delete-job',
        { jobId: jobId },
      )
      console.log("Delete Responses:", response.data)
    } catch (error) {
      console.error('Delete Job API Error:', error.response?.data || 'Something went wrong');
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);
export const updateJobs = createAsyncThunk(
  'job/updateJobs',
  async ({ id, formData }, { rejectWithValue }) => {
    console.log("updateJobs Jobs:", id, formData);
    try {
      const response = await axios.put(`https://breezend-backend-2.onrender.com/api/job/edit-jobs/${id}`,
        formData,
      )
      console.log("Update Responses:", response.data)
      // return response.data;
    } catch (error) {
      console.error("Update Job API Error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
);

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
      })
      .addCase(deleteJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = action.payload;
        // state.jobs = state.jobs.filter(job => job.id !== action.payload);
      })
      .addCase(deleteJobs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(updateJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});
export default jobSlice.reducer;
