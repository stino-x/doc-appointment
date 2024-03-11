/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createAvailability } from '../redux/reducers/createAvailabilitySlice';

const CreateAvailabilityForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    start_time: '',
    end_time: '',
    capacity: '',
    date: '',
  });
  const teacherId = localStorage.getItem('teacherId');
  const userId = localStorage.getItem('USERID');
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAvailability({ teacherId, availabilityData: formData, userId }))
      .then(() => {
        // Reset form fields after successful submission
        setFormData({
          start_time: '',
          end_time: '',
          capacity: '',
          date: '',
        });
      })
      .catch((error) => {
        console.error('Error creating availability:', error);
        // Handle error (display error message, etc.)
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Start Time:</label>
      <input type="datetime-local" name="start_time" value={formData.start_time} onChange={handleChange} required />
      <label>End Time:</label>
      <input type="datetime-local" name="end_time" value={formData.end_time} onChange={handleChange} required />
      <label>Capacity:</label>
      <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} required />
      <label>Date:</label>
      <input type="date" name="date" value={formData.date} onChange={handleChange} required />
      <button type="submit">Create Availability</button>
    </form>
  );
};
export default CreateAvailabilityForm;
