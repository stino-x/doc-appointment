/* eslint-disable no-empty-pattern */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  doctor: null,
  status: 'idle', // or 'loading', 'succeeded', 'failed'
  error: null,
};

// Define a thunk action to fetch doctor details by ID
export const fetchDoctorById = createAsyncThunk(
  'doctors/fetchDoctorById',
  async (_, { rejectWithValue }) => {
    try {
      // Get the doctor ID from localStorage
      const doctorId = localStorage.getItem('selectedDoctorId');
      if (!doctorId) {
        throw new Error('No doctor ID found in localStorage');
      }

      const response = await fetch(`http://localhost:3000/doctors/${doctorId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch doctor details');
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Create a slice for doctor details
const doctorDetailsSlice = createSlice({
  name: 'doctorDetails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDoctorById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchDoctorById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.doctor = action.payload;
        state.error = null; // Clear error when fetching succeeds
      })
      .addCase(fetchDoctorById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the action creator
export const { } = doctorDetailsSlice.actions;

// Export the reducer
export default doctorDetailsSlice.reducer;
