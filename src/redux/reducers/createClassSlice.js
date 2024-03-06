import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for creating an appointment under a teacher
export const createClass = createAsyncThunk(
  'appointments/create',
  async ({ teacherId, appointmentData }, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3000/teachers/${teacherId}/appointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const ClassSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createClass.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(createClass.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null; // Clear errors on successful request
    });
    builder.addCase(createClass.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set the error message from the payload
    });
  },
});

export default ClassSlice.reducer;
