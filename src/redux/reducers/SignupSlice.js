import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const apiURL = 'http://localhost:3000/auth';

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  try {
    const response = await fetch(`${apiURL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const responseData = await response.json();
    const headers = {
      'access-token': response.headers.get('access-token'),
      client: response.headers.get('client'),
    };
    toast.success(`Welcome, ${responseData.data.full_name}`);

    return { data: responseData.data, headers };
  } catch (error) {
    toast.error(
      'Registration failed. Please check your information and try again.',
    );
    throw error;
  }
});

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  loading: false,
  status: 'idle',
  error: null,
};

const SignupSlice = createSlice({
  name: 'Signup',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.status = 'succeeded';
        state.error = null;
        state.user = action.payload;
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('USERID', action.payload.data.id);
        localStorage.setItem('sessionUID', action.payload.data.uid);
        localStorage.setItem('client', action.payload.headers.client);
        localStorage.setItem('access-token', action.payload.headers['access-token']);
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default SignupSlice.reducer;
