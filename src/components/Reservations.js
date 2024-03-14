import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'; // Import useNavigate
import { fetchReservations } from '../redux/reducers/reservationslistSlice';
import styles from '../Styles/Reservations.module.css'; // Import CSS module

export default function ReservationsTable() {
  const dispatch = useDispatch();
  const reservations = useSelector((state) => state.fetchReservations.reservations);
  const status = useSelector((state) => state.fetchReservations.status);
  const error = useSelector((state) => state.fetchReservations.error);

  useEffect(() => {
    dispatch(fetchReservations());
  }, [dispatch]);

  // Function to format reservation time
  const formatReservationTime = (time) => {
  // Convert time to number
    const parsedTime = parseInt(time, 10);

    // Check if time is greater than 12
    if (parsedTime > 11) {
    // Subtract 12 from time and append 'PM'
      return `${parsedTime} PM`;
    }
    // If not greater than 12, append 'AM'
    return `${parsedTime} AM`;
  };

  const getMonthName = (monthNumber) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[monthNumber - 1]; // Subtract 1 because array indices start from 0
  };

  let content;
  if (status === 'loading') {
    content = <div>Loading...</div>;
  } else if (status === 'failed') {
    content = (
      <div>
        Error:
        {' '}
        {error}
      </div>
    );
  } else {
    content = (
      <>
        <Link className={styles['link-form']} to="/home">HOME</Link>
        <div className={styles.reservationsbody}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Reservation ID</th>
                <th>Doctor Name</th>
                <th>Reservation Time</th>
                <th>Day of Week</th>
                <th>Month</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.reservation_id}>
                  <td>{reservation.reservation_id}</td>
                  <td>{reservation.doctor_name}</td>
                  <td>{formatReservationTime(reservation.reservation_time)}</td>
                  <td>{reservation.day_of_week}</td>
                  <td>{getMonthName(reservation.month)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  return <div className={styles.container}>{content}</div>;
}
