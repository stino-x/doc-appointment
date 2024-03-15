/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { fetchDoctors } from '../redux/reducers/doctorslistSlice';
import styles from '../Styles/DoctorSelect.module.css'; // Import CSS module
// Function to extract time from datetime string
const extractTime = (datetimeString) => {
  const time = new Date(datetimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
};

export default function DoctorSelect() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctorsList.doctors);
  const status = useSelector((state) => state.doctorsList.status);
  const error = useSelector((state) => state.doctorsList.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleDoctorClick = (doctorId) => {
    localStorage.setItem('selectedDoctorId', doctorId);
    navigate('/doctor-reservation-form');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleDoctorClick(null);
    }
  };

  return (
    <>
      <Link className={styles['link-form']} to="/home">HOME</Link>
      <div className={styles.selectbody}>
        <nav className={styles.menu}>
          <ol>
            <li className={styles['menu-item']}>
              <span
                role="button"
                tabIndex={0}
                onClick={() => handleDoctorClick(null)}
                onKeyDown={handleKeyDown}
              >
                SELECT A DOCTOR
              </span>
              <ol className={styles['sub-menu']}>
                {status === 'loading' && <div>Loading...</div>}
                {status === 'failed' && (
                <div>
                  Error:
                  {error}
                </div>
                )}
                {doctors.map((doctor) => (
                  <li key={doctor.id} className={styles['doctor-details']} onClick={() => handleDoctorClick(doctor.id)}>
                    <div className={styles['doctor-picture']}>
                      <img src={doctor.picture} alt="Doctor" />
                    </div>
                    <div className={styles['doctor-info']}>
                      <h3>{doctor.name}</h3>
                      <p>
                        <strong>Speciality:</strong>
                        {doctor.speciality}
                      </p>
                      <p>
                        <strong>Email:</strong>
                        {doctor.email}
                      </p>
                      <p>
                        <strong>Phone:</strong>
                        {doctor.phone}
                      </p>
                      <p>
                        <strong>Shift:</strong>
                        {' '}
                        {extractTime(doctor.starting_shift)}
                        {' '}
                        -
                        {' '}
                        {extractTime(doctor.ending_shift)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </li>
          </ol>
        </nav>
      </div>
    </>
  );
}
