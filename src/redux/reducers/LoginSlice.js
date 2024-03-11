import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-hot-toast';

const apiURL = 'http://localhost:3000/auth';

export const login = createAsyncThunk('auth/login', async (credentials) => {
  try {
    const response = await fetch(`${apiURL}/sign_in`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
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
      'Sign-in failed. Please check your credentials and try again.',
    );
    throw error;
  }
});

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  status: 'idle',
  loading: false,
  error: null,
};

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.loading = false;
        state.user = action.payload;
        localStorage.clear();
        localStorage.setItem('user', JSON.stringify(action.payload));
        localStorage.setItem('USERID', action.payload.data.id);
        localStorage.setItem('sessionUID', action.payload.data.uid);
        localStorage.setItem('client', action.payload.headers.client);
        localStorage.setItem('access-token', action.payload.headers['access-token']);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default LoginSlice.reducer;
