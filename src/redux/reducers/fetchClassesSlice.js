import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching all appointments
export const fetchClasses = createAsyncThunk(
  'appointments/fetchAll',
  async () => {
    const response = await fetch('http://localhost:3000/appointments');
    if (!response.ok) {
      throw new Error('Error fetching appointments');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  classes: [],
  status: 'idle',
  error: null,
};

const DisplayClassesSlice = createSlice({
  name: 'classes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchClasses.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(fetchClasses.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.classes = action.payload;
    });
    builder.addCase(fetchClasses.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default DisplayClassesSlice.reducer;
