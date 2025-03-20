import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchdepartment = createAsyncThunk("fetchdepartment", async () => {
  const response = await fetch(
    "https://breezend-backend-2.onrender.com/api/job/get-department"
  );
  if (!response.ok) throw new error("Failed to fetch");
  return await response.json();
});

export const adddepartment = createAsyncThunk(
  "department/adddepartment",
  async (depatm) => {
    const response = await fetch(
      "https://breezend-backend-2.onrender.com/api/job/create-dpartment",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(depatm),
      }
    );
    return await response.json();
  }
);

export const updateDepartment = createAsyncThunk(
  "department/updateDepartment",
  async ({ id, department }) => {
    console.log("debug", id, department)
    const response = await fetch(
      `https://breezend-backend-2.onrender.com/api/job/update-department/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ department }),
      }
    );
    return response.json();
  }
);

const departmentslice = createSlice({
  name: "Department",
  initialState: {
    departments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchdepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchdepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload;
      })
      .addCase(fetchdepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(adddepartment.fulfilled, (state, action) => {
        state.departments.push(action.payload);
      })
      .addCase(updateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = state.departments.map((dep) =>
          dep.id === action.payload.id ? action.payload : dep
        );
      });
  },
});
export default departmentslice.reducer;
