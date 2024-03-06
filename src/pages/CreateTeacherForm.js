/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTeacher } from '../redux/reducers/createteacherSlice';

const CreateTeacherForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    qualifications: '',
    experience: 0,
    contactInformation: '',
    bio: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTeacher(formData))
      .then(() => {
        // Reset form fields after successful submission
        setFormData({
          name: '',
          subject: '',
          qualifications: '',
          experience: 0,
          contactInformation: '',
          bio: '',
        });
      })
      .catch((error) => {
        console.error('Error creating teacher:', error);
        // Handle error (display error message, etc.)
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Name:</label>
      <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      <label>Subject:</label>
      <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />
      <label>Qualifications:</label>
      <input type="text" name="qualifications" value={formData.qualifications} onChange={handleChange} required />
      <label>Experience:</label>
      <input type="number" name="experience" value={formData.experience} onChange={handleChange} required />
      <label>Contact Information:</label>
      <input type="text" name="contactInformation" value={formData.contactInformation} onChange={handleChange} required />
      <label>Bio:</label>
      <textarea name="bio" value={formData.bio} onChange={handleChange} required />
      <button type="submit">Create Teacher</button>
    </form>
  );
};

export default CreateTeacherForm;
