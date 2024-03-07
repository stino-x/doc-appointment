// store.js
import { configureStore } from '@reduxjs/toolkit';
import SignupReducer from './reducers/SignupSlice';
// import createTeacherReducer from './reducers/newdoctorSlice'; // Update import path
// import createReservationReducer from './reducers/createReservationSlice';
// import deleteDoctorReducer from './reducers/deletedoctorSlice'; // Update import path
// import doctorsListReducer from './reducers/doctorslistSlice'; // Update import path
// import fetchReservationsReducer from './reducers/reservationslistSlice'; // Update import path
// import loginReducer from './reducers/loginSlice';
// import logoutReducer from './reducers/logoutSlice';
// import doctorDetailsReducer from './reducers/doctorDetailsSlice'; // Import the new slice
// import availableSlotsSliceReducer from './reducers/FetchAvailableSlotsSlice';
import TeacherSliceReducer from './reducers/createteacherSlice';
import DetailsTeacherSliceReducer from './reducers/DetailTeachersSlice';
import AvailabilitySliceReducer from './reducers/createAvailabilitySlice';
import ClassSliceReducer from './reducers/createClassSlice';
import DisplayTeachersSliceReducer from './reducers/fetchTeachersSlice';
import DisplayClassesSliceReducer from './reducers/fetchClassesSlice';
import DeleteClassSliceReducer from './reducers/deleteClassSlice';

const rootReducer = {
  signup: SignupReducer,
  createTeacher: TeacherSliceReducer,
  TeacherDetails: DetailsTeacherSliceReducer,
  createAvailability: AvailabilitySliceReducer,
  createClass: ClassSliceReducer,
  deleteClass: DeleteClassSliceReducer,
  Teachers: DisplayTeachersSliceReducer,
  AllClasses: DisplayClassesSliceReducer,
  // createReservation: createReservationReducer,
  // deleteDoctor: deleteDoctorReducer,
  // doctorsList: doctorsListReducer,
  // fetchReservations: fetchReservationsReducer,
  // login: loginReducer,
  // logout: logoutReducer,
  // doctorDetails: doctorDetailsReducer,
  // availableSlots: availableSlotsSliceReducer, // Add the new slice reducer
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
