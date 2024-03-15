/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { createDoctor } from '../redux/reducers/newdoctorSlice';
import styles from '../Styles/DoctorsForm.module.css'; // Import CSS module

export default function DoctorsForm() {
  const [name, setName] = useState('');
  const [picture, setPicture] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startingShift, setStartingShift] = useState('');
  const [endingShift, setEndingShift] = useState('');

  const dispatch = useDispatch();
  const status = useSelector((state) => state.createDoctor.status);
  const error = useSelector((state) => state.createDoctor.error);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createDoctor({
      name,
      picture,
      speciality,
      email,
      phone,
      starting_shift: startingShift,
      ending_shift: endingShift,
    }));

    if (!error) {
      // Only navigate if the doctor creation is successful
      navigate('/home');
    }
  };

  return (
    <>
      <Link className={styles['link-form']} to="/home">HOME</Link>
      <div className={styles.container}>
        <div className={styles.text}>ADD DOCTOR</div>
        <form onSubmit={handleSubmit}>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input type="text" id="firstName" value={name} onChange={(e) => setName(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="firstName">Name</label>
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input type="text" id="picture" value={picture} onChange={(e) => setPicture(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="picture">Picture</label>
            </div>
            <div className={styles['input-data']}>
              <input type="text" id="speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="speciality">Speciality</label>
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="email">Email</label>
            </div>
            <div className={styles['input-data']}>
              <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <div className={styles.underline} />
              <label htmlFor="phone">Phone</label>
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input type="text" id="startingShift" value={startingShift} onChange={(e) => setStartingShift(e.target.value)} pattern="[0-2][0-9]:00" min="00:00" max="23:00" required />
              <div className={styles.underline} />
              <label htmlFor="startingShift">Starting Shift (HH:00)</label>
            </div>
            <div className={styles['input-data']}>
              <input type="text" id="endingShift" value={endingShift} onChange={(e) => setEndingShift(e.target.value)} pattern="[0-2][0-9]:00" min="00:00" max="23:00" required />
              <div className={styles.underline} />
              <label htmlFor="endingShift">Ending Shift (HH:00)</label>
            </div>
          </div>
          <div className={styles['form-row']}>
            <div className={styles['input-data']}>
              <input className={styles['test-button']} type="submit" value="Submit" />
            </div>
          </div>
          {status === 'loading' && <div>Loading...</div>}
          {status === 'failed' && (
          <div>
            Error:
            {' '}
            {error}
          </div>
          )}
        </form>
      </div>
    </>
  );
}
