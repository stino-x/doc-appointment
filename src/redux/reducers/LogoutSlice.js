import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logoutUser = createAsyncThunk('logout/logoutUser', async () => {
  // Make a DELETE request to log out the user
  const response = await axios.delete('http://localhost:3000/logout', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('userToken')}`,
    },
  });

  if (response.ok) {
    // Clear the user token from local storage
    localStorage.removeItem('userToken');
    return true; // Indicate successful logout
  }
  throw new Error('Failed to log out');
});

const initialState = {
  isLoggingOut: false,
  logoutError: null,
};

const logoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(logoutUser.pending, (state) => {
      state.isLoggingOut = true;
      state.logoutError = null;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoggingOut = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.isLoggingOut = false;
      state.logoutError = action.error.message;
    });
  },
});

export default logoutSlice.reducer;
