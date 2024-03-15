/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome, faBook, faPlus, faPowerOff, faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import styles from '../Styles/Landingpage.module.css'; // Import module styles
import DoctorCards from './Doctorcards';
import { logoutUser } from '../redux/reducers/LogoutSlice';
import exampleImage from '../images/Image.png';

export default function Landingpage() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className={styles.landingconatiner}>
      <nav className={styles['main-menu']}>
        {' '}
        <ul>
          <li>
            <Link to="/home">
              <img className={styles.logo} src={exampleImage} alt="Example" style={{ maxWidth: '50%', height: 'auto' }} />
              {/* <span className={styles['nav-text']}>
                HOME
              </span> */}
            </Link>
          </li>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} className={styles.fa} size="2x" />
              <span className={styles['nav-text']}>
                HOME
              </span>
            </Link>
          </li>
          <li className={styles['has-subnav']}>
            <Link to="/reservations">
              <FontAwesomeIcon icon={faBook} className={styles.fa} size="2x" />
              <span className={styles['nav-text']}>
                RESERVATIONS
              </span>
            </Link>
          </li>
          <li className={styles['has-subnav']}>
            <Link to="/doctor-select">
              <FontAwesomeIcon icon={faPlus} className={styles.fa} size="2x" />
              <span className={styles['nav-text']}>
                ADD-RESERVATIONS
              </span>
            </Link>
          </li>
          <li className={styles['has-subnav']}>
            <Link to="/add-doctor">
              <FontAwesomeIcon icon={faUserPlus} className={styles.fa} size="2x" />
              <span className={styles['nav-text']}>
                ADD DOCTORS
              </span>
            </Link>
          </li>
        </ul>
        <ul className={styles.logout}>
          <li onClick={handleLogout}>
            <Link to="/login">
              <FontAwesomeIcon icon={faPowerOff} className={styles.fa} size="2x" />
              <span className={styles['nav-text']}>
                Logout
              </span>
            </Link>
          </li>
        </ul>
      </nav>
      <DoctorCards />
    </div>
  );
}
