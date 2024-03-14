import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// Async thunk for login
export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }) => {
  localStorage.clear();
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('Error logging in');
  }

  const data = await response.json();
  const { token, id } = data;

  // Store token in local storage
  localStorage.setItem('currentUser', id);

  // Store token in local storage
  localStorage.setItem('userToken', token);

  return token;
});

const initialState = {
  token: localStorage.getItem('userToken') || null,
  status: 'idle',
  error: null,
};

const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default loginSlice.reducer;
