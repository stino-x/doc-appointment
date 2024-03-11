import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for deleting an appointment
export const deleteClass = createAsyncThunk(
  'appointments/delete',
  async (appointmentId, teacherId, userID) => {
    const response = await fetch(`http://localhost:3000/users/${userID}/teachers/${teacherId}/appointments/${appointmentId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Error deleting appointment');
    }
    const data = await response.json();
    return data;
  },
);

const initialState = {
  status: 'idle',
  error: null,
};

const DeleteClassSlice = createSlice({
  name: 'deleteClass',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteClass.pending, (state) => {
      state.status = 'loading';
      state.error = null; // Clear previous errors when making a new request
    });
    builder.addCase(deleteClass.fulfilled, (state) => {
      state.status = 'succeeded';
    });
    builder.addCase(deleteClass.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default DeleteClassSlice.reducer;
