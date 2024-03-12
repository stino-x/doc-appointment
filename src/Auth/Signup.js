/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signup } from '../redux/reducers/SignupSlice';
import '../assets/stylesheets/signup.css';
import '../assets/stylesheets/autherization.css';

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const signupStatus = useSelector((state) => state.signup.status);
  if (signupStatus === 'succeeded') {
    navigate('/home');
  }
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    admin: false,
    nickname: '',
    image: '',
  });
  const handleChange = (e) => {
    const {
      name, value, type, checked,
    } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Dispatch signup action
    await dispatch(signup(formData));
    // Clear form inputs on successful signup
    setFormData({
      name: '',
      email: '',
      password: '',
      password_confirmation: '', // Reset to empty string
      admin: false,
      nickname: '',
      image: '',
    });
  };
  return (
    <div className="page">
      <h2>Signup</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            name="password_confirmation" // Updated to 'password_confirmation'
            value={formData.password_confirmation} // Updated to 'password_confirmation'
            onChange={handleChange}
            // required
          />
        </div>
        <div>
          <label htmlFor="admin">Admin:</label>
          <input
            type="checkbox"
            id="admin"
            name="admin"
            checked={formData.admin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="nickname">Nickname:</label>
          <input
            type="text"
            id="nickname"
            name="nickname"
            value={formData.nickname}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Signup</button>
      </form>
    </div>
  );
};
export default SignupForm;
