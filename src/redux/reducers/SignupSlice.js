import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for signup
export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await fetch('http://localhost:3000/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error('Error signing up');
  }

  const data = await response.json();
  const { id } = data;
  // Store token in local storage
  localStorage.setItem('currentUser', id);
  return data; // You can return any data you need after signup
});

const initialState = {
  user: null,
  status: 'idle',
  error: null,
  admin: false,
};

const SignupSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      state.admin = action.payload.admin;
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default SignupSlice.reducer;
