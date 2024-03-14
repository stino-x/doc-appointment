/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import { signupAndLogin } from '../redux/reducers/authSlice';
import styles from '../Styles/Signup.module.css'; // Import CSS module

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const signupStatus = useSelector((state) => state.auth.status);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Prevent multiple submissions while waiting for response
    if (signupStatus === 'loading') {
      return;
    }
    dispatch(signupAndLogin({
      firstname, lastname, email, password, role,
    }))
      .unwrap()
      .then(() => {
        // Reset input fields
        setFirstname('');
        setLastname('');
        setEmail('');
        setPassword('');
        setRole('');
        navigate('/home'); // Use navigate instead of history.push
      })
      .catch((error) => {
        console.error('Signup failed:', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        SIGN UP
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input type="text" id="firstName" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
            <div className={styles.underline} />
            <label htmlFor="firstName">First Name</label>
          </div>
          <div className={styles['input-data']}>
            <input type="text" id="lastName" value={lastname} onChange={(e) => setLastname(e.target.value)} required />
            <div className={styles.underline} />
            <label htmlFor="lastName">Last Name</label>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div className={styles.underline} />
            <label htmlFor="email">Email Address</label>
          </div>
          <div className={styles['input-data']}>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <div className={styles.underline} />
            <label htmlFor="website">Password</label>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={`${styles['input-data']} ${styles.textarea}`}>
            <br />
            <select className={styles['drop-down']} value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="doctor">Doctor</option>
              <option value="normal">Normal</option>
            </select>
            <br />
          </div>
        </div>
        <div className={`${styles['form-row']} ${styles['button-row']}`}>
          <div className={styles['input-data']}>
            <input className={styles['test-button']} type="submit" value="Submit" />
          </div>
        </div>
        <div className={`${styles['form-row']} ${styles['login-message']}`}>
          <div className={styles['input-data']}>
            Already have an account?
            {' '}
            <Link to="/login">Login</Link>
          </div>
        </div>
      </form>
    </div>
  );
}
