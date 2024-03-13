import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for deleting a doctor
export const deleteDoctor = createAsyncThunk('doctors/deleteDoctor', async (doctorId, { rejectWithValue }) => {
  try {
    // Retrieve the authToken from local storage
    const authToken = localStorage.getItem('userToken');

    const response = await axios.delete(`http://localhost:3000/doctors/${doctorId}`, {
      headers: {
        Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
      },
    });

    if (!response.ok) {
      throw new Error('Error deleting doctor');
    }

    return doctorId; // Return the deleted doctor ID
  } catch (error) {
    return rejectWithValue(error.message); // Return the error message
  }
});

const initialState = {
  status: 'idle',
  error: null,
};

const deletedoctorSlice = createSlice({
  name: 'deleteDoctor',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteDoctor.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(deleteDoctor.fulfilled, (state) => {
      state.status = 'succeeded';
      state.error = null;
    });
    builder.addCase(deleteDoctor.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload; // Set the error message
    });
  },
});

export default deletedoctorSlice.reducer;
