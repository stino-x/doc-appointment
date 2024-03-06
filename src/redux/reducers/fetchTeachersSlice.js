import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching all teachers
export const fetchTeachers = createAsyncThunk(
  'teachers/fetchAll',
  async () => {
    const response = await fetch('http://localhost:3000/teachers');
    if (!response.ok) {
      throw new Error('Error fetching teachers');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  teachers: [],
  status: 'idle',
  error: null,
};

const DisplayTeachersSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeachers.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(fetchTeachers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.teachers = action.payload;
    });
    builder.addCase(fetchTeachers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default DisplayTeachersSlice.reducer;
