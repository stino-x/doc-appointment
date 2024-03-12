/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createClass } from '../redux/reducers/createClassSlice';
import CalendarInput from '../components/Calender';

const CreateClassForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
  });
  const { error, loading } = useSelector((state) => state.createClass);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const teacherId = localStorage.getItem('teacherId');
  const userId = localStorage.getItem('USERID');
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createClass({ teacherId, appointmentData: formData, userId }));
  };
  return (
    <div className="add-reservation-container">
      <h2 className="add-reservation-title">Create Appointment</h2>
      {error && (
      <div className="error">
        Error:
        {error}
      </div>
      )}
      <form className="add-reservation-form" onSubmit={handleSubmit}>
        <div className="inputs-fields">
          <div className="form-group">
            <label>Date:</label>
            <input className="input-reservation-date" type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Start Time:</label>
            <input className="input-reservation-time" type="time" name="startTime" value={formData.startTime} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>End Time:</label>
            <input className="input-reservation-time" type="time" name="endTime" value={formData.endTime} onChange={handleChange} required />
          </div>
          <CalendarInput />
          <button type="submit" className="add-reservation-button" disabled={loading === true}>Create Appointment</button>
        </div>
      </form>
    </div>
  );
};
export default CreateClassForm;
