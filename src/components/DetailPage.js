import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchDoctorById } from '../redux/reducers/doctorDetailsSlice';
import styles from '../Styles/DetailPage.module.css'; // Import the CSS module file

const extractTime = (datetimeString) => {
  const time = new Date(datetimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return time;
};

export default function DoctorDetails() {
  const dispatch = useDispatch();
  const doctor = useSelector((state) => state.doctorDetails.doctor);
  const status = useSelector((state) => state.doctorDetails.status);
  const error = useSelector((state) => state.doctorDetails.error);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768); // Check initial screen size

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Fetch the doctor details when the component mounts
    dispatch(fetchDoctorById(localStorage.getItem('selectedDoctorId')));
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  // Check if doctor object exists before accessing its properties
  if (!doctor) {
    return <div>No doctor details available.</div>;
  }

  const startingShift = extractTime(doctor.starting_shift);
  const endingShift = extractTime(doctor.ending_shift);

  return (
    <div className={`${styles['doctor-page']} ${isMobile ? styles.mobile : styles.desktop}`}>
      <div className={styles['doctor-image']}>
        <img src={doctor.picture} alt="Doctor" />
      </div>
      <div className={styles['doctor-info']}>
        <div className={styles['doctor-details']}>
          <h1>{doctor.name}</h1>
          <p>
            Specialist in:
            {doctor.speciality}
          </p>
          <p>
            Email:
            {doctor.email}
          </p>
          <p>
            Phone:
            {doctor.phone}
          </p>
          <p>
            Shift:
            {startingShift}
            {' '}
            -
            {endingShift}
          </p>
          {/* Link to the reservation form */}
          <Link to="/doctor-reservation-form" className={styles.button}>RESERVE</Link>
        </div>
      </div>
    </div>
  );
}
