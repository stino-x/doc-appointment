import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Async thunk for fetching doctors
export const fetchDoctors = createAsyncThunk('doctors/fetchDoctors', async (_, { rejectWithValue }) => {
  try {
    const authToken = localStorage.getItem('userToken');

    const response = await fetch('http://localhost:3000/doctors', {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching doctors');
    }

    const data = await response.json(); // Parse response JSON data

    return data; // Return the parsed data
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const initialState = {
  doctors: [],
  status: 'idle',
  error: null,
};

const doctorslistSlice = createSlice({
  name: 'doctors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDoctors.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchDoctors.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.error = null;
      state.doctors = action.payload; // Set the fetched doctors data
    });
    builder.addCase(fetchDoctors.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set the error message
    });
  },
});

export default doctorslistSlice.reducer;
