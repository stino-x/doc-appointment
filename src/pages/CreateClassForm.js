/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClass } from '../redux/reducers/createClassSlice';

const CreateClassForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const { status, error } = useSelector((state) => state.appointment);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const teacherId = localStorage.getItem('teacherId');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClass({ teacherId, appointmentData: formData }));
  };

  return (
    <div>
      <h2>Create Appointment</h2>
      {error && (
      <div>
        Error:
        {error}
      </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} required />
        <label>Start Time:</label>
        <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
        <label>End Time:</label>
        <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
        <button type="submit" disabled={status === 'loading'}>Create Appointment</button>
      </form>
    </div>
  );
};

export default CreateClassForm;
