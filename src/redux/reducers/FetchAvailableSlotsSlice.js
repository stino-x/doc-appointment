import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for fetching available slots for a specific doctor
export const fetchAvailableSlots = createAsyncThunk(
  'reservations/fetchAvailableSlots',
  async (doctorId, { rejectWithValue }) => {
    try {
      const authToken = localStorage.getItem('userToken');
      const response = await fetch(`http://localhost:3000/doctors/${doctorId}/available_slots`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
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
  availableSlots: [], // Added availableSlots field to store fetched data
};

const availableSlotsSlice = createSlice({
  name: 'availableSlots', // Change the name to match the API call
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAvailableSlots.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAvailableSlots.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.availableSlots = action.payload; // Store fetched slots data
      })
      .addCase(fetchAvailableSlots.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default availableSlotsSlice.reducer;
