import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const apiURL = 'http://localhost:3000/auth';

export const logout = createAsyncThunk('auth/logout', async (_, { getState }) => {
  try {
    const state = getState();
    const { user } = state.auth;
    console.log('I JUST FIRED ');

    if (!user) {
      localStorage.clear();
      return null;
    }

    const client = localStorage.getItem('client');
    const accessToken = localStorage.getItem('access-token');

    if (!client || !accessToken) {
      localStorage.clear();
      return null;
    }

    const headers = {
      'access-token': accessToken,
      client,
      uid: user.data.uid,
    };

    // Simulating a logout endpoint as delete request
    // You may need to adjust this if your API has a different endpoint for logout
    await fetch(`${apiURL}/sign_out`, {
      method: 'DELETE',
      headers,
    });

    localStorage.clear();
    return null;
  } catch (error) {
    toast.error('Sign-out failed. Please try again.');
    throw error;
  }
});

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  error: null,
};

const LogoutSlice = createSlice({
  name: 'logout',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        localStorage.clear();
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default LogoutSlice.reducer;
