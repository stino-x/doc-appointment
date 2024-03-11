// store.js
import { configureStore } from '@reduxjs/toolkit';
import SignupReducer from './reducers/SignupSlice';
// import TeacherSliceReducer from './reducers/createteacherSlice';
// import DetailsTeacherSliceReducer from './reducers/DetailTeachersSlice';
import AvailabilitySliceReducer from './reducers/createAvailabilitySlice';
// import ClassSliceReducer from './reducers/createClassSlice';
import DisplayTeachersSliceReducer from './reducers/fetchTeachersSlice';
import DisplayClassesSliceReducer from './reducers/fetchClassesSlice';
// import DeleteClassSliceReducer from './reducers/deleteClassSlice';
// import deleteTeacherSliceReducer from './reducers/deleteteacherSlice';
import LoginSliceReducer from './reducers/LoginSlice';
import LogoutSliceReducer from './reducers/LogoutSlice';

const rootReducer = {
  signup: SignupReducer,
  //   createTeacher: TeacherSliceReducer,
  //   TeacherDetails: DetailsTeacherSliceReducer,
  createAvailability: AvailabilitySliceReducer,
  //   createClass: ClassSliceReducer,
  //   deleteClass: DeleteClassSliceReducer,
  //   deleteTeacher: deleteTeacherSliceReducer,
  Teachers: DisplayTeachersSliceReducer,
  AllClasses: DisplayClassesSliceReducer,
  Login: LoginSliceReducer,
  Logout: LogoutSliceReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
