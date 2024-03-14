/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { fetchAvailableSlots } from '../redux/reducers/FetchAvailableSlotsSlice';
import { createReservation } from '../redux/reducers/createReservationSlice';
import styles from '../Styles/ReservationForm.module.css';

export default function ReservationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const availableSlots = useSelector((state) => state.availableSlots.availableSlots);
  // const reservationStatus = useSelector((state) => state.createReservation.status);
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reservationData, setReservationData] = useState({
    start_time: '',
    end_time: '',
    day_of_month: '',
    day_of_week: '',
    month: '',
  });

  useEffect(() => {
    dispatch(fetchAvailableSlots(localStorage.getItem('selectedDoctorId')));
  }, [dispatch]);

  // const getMonthNumber = (monthName) => {
  //   const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  //   return monthNames.indexOf(monthName) + 1; // Months are 1-indexed
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    const docId = localStorage.getItem('selectedDoctorId');
    const formattedReservationData = {
      start_time: parseInt(reservationData.start_time.split(':')[0], 10),
      end_time: parseInt(reservationData.end_time.split(':')[0], 10),
      day_of_month: parseInt(reservationData.day_of_month, 10),
      day_of_week: reservationData.day_of_week,
      month: parseInt(reservationData.month, 10),
    };
    console.log(formattedReservationData);
    console.log(reservationData.month);

    dispatch(createReservation({ doctorId: docId, reservationData: formattedReservationData }))
      .unwrap()
      .then(() => {
        // Handle success
        setReservationData({
          start_time: '',
          end_time: '',
          day_of_month: '',
          day_of_week: '',
          month: '',
        });
        setSelectedSlot('');
        navigate('/reservations');
      })
      .catch((error) => {
        console.error('Reservation creation failed:', error);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.text}>RESERVATION FORM</div>
      <form onSubmit={handleSubmit}>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <select value={selectedSlot} onChange={(e) => setSelectedSlot(e.target.value)}>
              <option value="">Please select from the available slots ONLY</option>
              {availableSlots.map((slot) => (
                <option key={slot.id} value={slot.start_time}>
                  {slot.start_time}
                  -
                  {slot.end_time}
                  ,
                  {slot.day_of_month}
                  ,
                  {slot.day_of_week}
                  ,
                  {slot.month}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input
              type="text"
              id="startTime"
              name="start_time"
              value={reservationData.start_time}
              onChange={(e) => setReservationData({ ...reservationData, start_time: e.target.value })}
              required
            />
            <div className={styles.underline} />
            <label htmlFor="startTime">Start Time (HH:00)</label>
          </div>
          <div className={styles['input-data']}>
            <input
              type="text"
              id="endTime"
              name="end_time"
              value={reservationData.end_time}
              onChange={(e) => setReservationData({ ...reservationData, end_time: e.target.value })}
              required
            />
            <div className={styles.underline} />
            <label htmlFor="endTime">End Time (HH:00)</label>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input
              type="number"
              id="dayOfMonth"
              name="day_of_month"
              value={reservationData.day_of_month}
              onChange={(e) => setReservationData({ ...reservationData, day_of_month: e.target.value })}
              required
            />
            <div className={styles.underline} />
            <label htmlFor="dayOfMonth">Day of Month</label>
          </div>
          <div className={styles['input-data']}>
            <input
              type="text"
              id="dayOfWeek"
              name="day_of_week"
              value={reservationData.day_of_week}
              onChange={(e) => setReservationData({ ...reservationData, day_of_week: e.target.value })}
              required
            />
            <div className={styles.underline} />
            <label htmlFor="dayOfWeek">Day of Week</label>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input
              type="number"
              id="month"
              name="month"
              value={reservationData.month}
              onChange={(e) => setReservationData({ ...reservationData, month: parseInt(e.target.value, 10) })}
              required
            />
            <div className={styles.underline} />
            <label htmlFor="month">Month</label>
          </div>
        </div>
        <div className={styles['form-row']}>
          <div className={styles['input-data']}>
            <input className={styles['test-button']} type="submit" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  );
}
