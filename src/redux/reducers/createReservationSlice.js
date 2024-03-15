import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for creating a reservation
export const createReservation = createAsyncThunk(
  'reservations/createReservation',
  async ({ doctorId, reservationData }, { rejectWithValue }) => {
    try {
      // Retrieve the authToken from local storage
      const authToken = localStorage.getItem('userToken');

      // Make the API request
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}/reservations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`, // Include the auth token in the headers
        },
        body: JSON.stringify(reservationData),
      });

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Error creating reservation');
      }

      // Parse the response as JSON
      const data = await response.json();
      console.log(data);
      console.log('RESERVATION CREATED');

      // Return the created reservation data
      return data;
    } catch (error) {
      // Return the error message
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const reservationSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createReservation.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createReservation.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(createReservation.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload; // Set the error message
      });
  },
});

export default reservationSlice.reducer;
