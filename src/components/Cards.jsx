/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import styles from '../Styles/Cards.module.css'; // Import your component-specific CSS module

const Cards = ({ doctor }) => {
  // if (!doctor) return null;
  const navigate = useNavigate();

  const {
    name, id,
    picture, starting_shift: startingShift, ending_shift: endingShift, email, phone,
  } = doctor;

  const handleDoctorClick = (doctorId) => {
    localStorage.setItem('selectedDoctorId', doctorId);
    // Navigate to details page with the doctor's ID
    navigate('details');
  };

  return (
    <div className={styles.card}>
      <img className={styles['product--image']} src={picture} alt={name} />
      <h2>{name}</h2>
      <p className={styles.price}>
        {startingShift}
        {' '}
        -
        {' '}
        {endingShift}
      </p>
      <p>{email}</p>
      <p>{phone}</p>
      <p>
        <button type="button" onClick={() => handleDoctorClick(id)}>Details</button>
      </p>
    </div>
  );
};

Cards.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    picture: PropTypes.string.isRequired,
    starting_shift: PropTypes.string.isRequired,
    ending_shift: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }),
};

export default Cards;
