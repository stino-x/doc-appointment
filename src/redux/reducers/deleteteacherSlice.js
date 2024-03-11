import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for deleting a teacher
export const deleteTeacher = createAsyncThunk(
  'teachers/delete',
  async (teacherId, userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}/teachers/${teacherId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting teacher');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  status: 'idle',
  error: null,
  loading: false,
};

const deleteTeacherSlice = createSlice({
  name: 'deleteTeacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTeacher.pending, (state) => {
      state.status = 'loading';
      state.loading = true;
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(deleteTeacher.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(deleteTeacher.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default deleteTeacherSlice.reducer;
