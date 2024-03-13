import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Async thunk for creating a doctor
export const createDoctor = createAsyncThunk(
  'doctors/createDoctor',
  async (doctorData, { rejectWithValue }) => {
    try {
      // Retrieve the token from local storage
      const authToken = localStorage.getItem('userToken');

      // Make the POST request
      const response = await fetch('http://localhost:3000/doctors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(doctorData),
      });

      // Check if response is successful
      if (!response.ok) {
        throw new Error('Error creating doctor');
      }

      // Parse response data
      const data = await response.json();

      return data; // Return the created doctor data
    } catch (error) {
      return rejectWithValue(error.message); // Return the error message
    }
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const newdoctorSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createDoctor.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(createDoctor.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(createDoctor.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set the error message
    });
  },
});

export default newdoctorSlice.reducer;
