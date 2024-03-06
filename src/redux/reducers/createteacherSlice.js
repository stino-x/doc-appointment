import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for creating a teacher
export const createTeacher = createAsyncThunk('teachers/create', async (teacherData) => {
  const response = await fetch('http://localhost:3000/teachers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teacherData),
  });

  if (!response.ok) {
    throw new Error('Error creating teacher');
  }

  const data = await response.json();
  return data; // You can return any data you need after creating the teacher
});

const initialState = {
  teacher: null,
  status: 'idle',
  error: null,
};

const TeacherSlice = createSlice({
  name: 'teachers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createTeacher.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(createTeacher.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.teacher = action.payload;
    });
    builder.addCase(createTeacher.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default TeacherSlice.reducer;