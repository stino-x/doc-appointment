import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for signup and login
export const signupAndLogin = createAsyncThunk('auth/signupAndLogin', async (userData) => {
  // Signup request
  localStorage.clear();
  const signupResponse = await fetch('http://localhost:3000/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!signupResponse.ok) {
    throw new Error('Error signing up');
  }

  const signupData = await signupResponse.json();
  const { id } = signupData;

  // Store token in local storage
  localStorage.setItem('currentUser', id);

  // Login request immediately after signup
  const loginResponse = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
  });

  if (!loginResponse.ok) {
    throw new Error('Error logging in');
  }

  const loginData = await loginResponse.json();
  const { token } = loginData;

  // Store token in local storage
  localStorage.setItem('userToken', token);

  return token;
});

const initialState = {
  token: localStorage.getItem('userToken') || null,
  status: 'idle',
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signupAndLogin.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(signupAndLogin.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.token = action.payload;
    });
    builder.addCase(signupAndLogin.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default authSlice.reducer;
