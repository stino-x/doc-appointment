import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching teacher details
export const fetchTeacherDetails = createAsyncThunk(
  'teachers/fetchDetails',
  async (teacherId) => {
    const response = await fetch(`http://localhost:3000/teachers/${teacherId}`);
    if (!response.ok) {
      throw new Error('Error fetching teacher details');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  teacherDetails: null,
  status: 'idle',
  loading: false,
  error: null,
};

const DetailTeachersSlice = createSlice({
  name: 'detailTeachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherDetails.pending, (state) => {
      state.loading = true;
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(fetchTeacherDetails.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.teacherDetails = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchTeacherDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

export default DetailTeachersSlice.reducer;
