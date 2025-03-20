import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"

export const fetchqustion = createAsyncThunk("fetchqustion", async () => {
  const response = await fetch("https://breezend-backend-2.onrender.com/api/job/get-question");
  if (!response.ok) throw new error("Failed to create");
  return await response.json();
});

export const createQuestion = createAsyncThunk(
  "create/question", async (question, { rejectWithValue }) => {
    try {
      console.log(question)
      const response = await axios.post(`https://breezend-backend-2.onrender.com/api/job/create-question`, question)
      return response.data
    } catch (error) {
      console.error(`Create Question API Error ${error.response?.data}, Somethings went wrong`);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  }
)

const qustionSlice = createSlice({
  name: "Qustion",
  initialState: {
    questions: [],
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
        state.questions = action.payload;
      })
      .addCase(fetchqustion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createQuestion.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createQuestion.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.questions = action.payload;
      })
      .addCase(createQuestion.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});
export default qustionSlice.reducer;
