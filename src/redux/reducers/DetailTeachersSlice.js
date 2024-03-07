import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching detailed teacher information
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
  teacher: null,
  status: 'idle',
  error: null,
  loading: false,
};

const DetailsTeacherSlice = createSlice({
  name: 'detailsTeacher',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTeacherDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeacherDetails.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.teacher = action.payload;
    });
    builder.addCase(fetchTeacherDetails.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default DetailsTeacherSlice.reducer;
