import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSkills = createAsyncThunk("fetchSkills", async () => {
  const response = await fetch(
    "https://breezend-backend-2.onrender.com/api/job/get-skills"
  );
  return await response.json();
});

export const addSkill = createAsyncThunk("skills/addSkill", async (skill) => {
  const response = await fetch(
    "https://breezend-backend-2.onrender.com/api/job/add-skills",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(skill),
    }
  );
  return response.json();
});

export const updateSkill = createAsyncThunk(
  "skills/updateSkill",
  async ({ id, skillname }) => {
    const response = await fetch(
      `https://breezend-backend-2.onrender.com/api/job/update-skill/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ skillname }),
      }
    );
    return response.json();
  }
);

const skillsslice = createSlice({
  name: "skill",
  initialState: {
    skills: [],
    loading: false,
    error: null,
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
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addSkill.fulfilled, (state, action) => {
        state.skills.push(action.payload);
      })
      .addCase(updateSkill.fulfilled, (state, action) => {
        state.loading = false;
        const updatedSkill = action.payload;
        const index = state.skills.findIndex(
          (skill) => skill.id === updatedSkill.id
        );
        if (index !== -1) {
          state.skills = state.skills.map((skill) =>
            skill.id === updatedSkill.id ? { ...skill, ...updatedSkill } : skill
          );
        }
      });
  },
});

export default skillsslice.reducer;
