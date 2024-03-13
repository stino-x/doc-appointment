import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchReservations = createAsyncThunk(
  'reservations/fetchReservations',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('userToken'); // Retrieve token from local storage
      const userId = localStorage.getItem('currentUser'); // Retrieve user ID from local storage

      // Make the API request using fetch
      const response = await fetch(`http://localhost:3000/users/${userId}/your_reservations`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the auth token in the headers
        },
      });

      // Check if response status is not in the 200 range
      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      // Parse the response as JSON
      const data = await response.json();
      console.log(data);

      return data;
    } catch (error) {
      // Return the error message
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  reservations: [],
  status: 'idle',
  error: null,
};

const reservationslistSlice = createSlice({
  name: 'reservations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReservations.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchReservations.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.reservations = action.payload;
    });
    builder.addCase(fetchReservations.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default reservationslistSlice.reducer;
