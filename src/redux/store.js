// store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/authSlice';
import createDoctorReducer from './reducers/newdoctorSlice'; // Update import path
import createReservationReducer from './reducers/createReservationSlice';
import deleteDoctorReducer from './reducers/deletedoctorSlice'; // Update import path
import doctorsListReducer from './reducers/doctorslistSlice'; // Update import path
import fetchReservationsReducer from './reducers/reservationslistSlice'; // Update import path
import loginReducer from './reducers/LoginSlice';
import logoutReducer from './reducers/LogoutSlice';
import doctorDetailsReducer from './reducers/doctorDetailsSlice'; // Import the new slice
import availableSlotsSliceReducer from './reducers/FetchAvailableSlotsSlice'; // Import the new slice

const rootReducer = {
  auth: authReducer,
  createDoctor: createDoctorReducer,
  createReservation: createReservationReducer,
  deleteDoctor: deleteDoctorReducer,
  doctorsList: doctorsListReducer,
  fetchReservations: fetchReservationsReducer,
  login: loginReducer,
  logout: logoutReducer,
  doctorDetails: doctorDetailsReducer,
  availableSlots: availableSlotsSliceReducer, // Add the new slice reducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
