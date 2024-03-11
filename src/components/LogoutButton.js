import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/reducers/LogoutSlice';
// Path to the logout async thunk
const LogoutButton = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    console.log('I JUST FIRED ');
  };
  return (
    <button type="button" onClick={handleLogout}>Logout</button>
  );
};
export default LogoutButton;
