import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk("fetchSkills", async () => {
    const response = await fetch("https://breezend-backend-2.onrender.com/api/job/get-skills")
    return await response.json()
})

const skills = createSlice({
    name: "skill",
    initialState: {
        skills: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSkills.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSkills.fulfilled, (state, action) => {
                state.loading = false;
                state.skills = action.payload; // Store fetched skills
            })
            .addCase(fetchSkills.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
})

export default skills.reducer;