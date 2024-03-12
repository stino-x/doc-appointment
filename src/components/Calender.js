import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import Calendar from 'react-calendar';
import { createClass } from '../redux/reducers/createClassSlice';
import '../assets/stylesheets/tiles.css';

// Adjust the import path accordingly
const CalendarInput = () => {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null); // Change initial state to null
  console.log('selectdate', selectedDate);
  const [showCalendar, setShowCalendar] = useState(false);
  const [appointments] = useState([
    {
      id: 1,
      teacher_id: 1,
      user_id: 2,
      start_time: '2024-03-08T09:00:00Z',
      end_time: '2024-03-08T10:00:00Z',
      capacity: 1,
      date: '2024-03-20', // This date is different from the selected date
      created_at: '2024-03-07T12:34:56Z',
      updated_at: '2024-03-07T12:34:56Z',
    },
    {
      id: 2,
      teacher_id: 1,
      user_id: null,
      start_time: '2024-03-08T10:00:00Z',
      end_time: '2024-03-08T11:00:00Z',
      capacity: 1,
      date: '2024-03-29', // This date matches the selected date
      created_at: '2024-03-07T13:45:32Z',
      updated_at: '2024-03-07T13:45:32Z',
    },
    {
      id: 3,
      teacher_id: 1,
      user_id: null,
      start_time: '2024-03-08T14:00:00Z',
      end_time: '2024-03-08T18:00:00Z',
      capacity: 1,
      date: '2024-03-29', // This date matches the selected date
      created_at: '2024-03-07T13:45:32Z',
      updated_at: '2024-03-07T13:45:32Z',
    },
  ]);
  const [SelectedTimes, setSelectedTimes] = useState([]);
  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    // setSelectedStartTime(null); // Reset selected start time when date changes
    // setSelectedEndTime(null); // Reset selected end time when date changes
  };
  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };
  // Function to format the date for Ruby
  const formatDateForRuby = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  const handleTileClick = (date) => {
    // Convert the selected date to the format used in Ruby (YYYY-MM-DD)
    const rawdate = date;
    console.log('rawdate', rawdate);
    const formattedSelectedDate = formatDateForRuby(date);
    console.log('formattedSelectedDate', formattedSelectedDate);
    // Find appointments that match the selected date in the Ruby array
    const matchingAppointments = appointments.filter(
      (appointment) => formatDateForRuby(new Date(appointment.date)) === formattedSelectedDate,
    );
    console.log('matchingAppointments', matchingAppointments);
    // Extract start and end times of matching appointments
    const startEndTimes = matchingAppointments.map((appointment) => ({
      start_time: appointment.start_time,
      end_time: appointment.end_time,
    }));
    // Update state with start and end times
    setSelectedTimes(startEndTimes);
    console.log('Selecttimes', SelectedTimes);
  };
  useEffect(() => {
    if (selectedDate) {
      handleTileClick(selectedDate);
    }
  }, [selectedDate]); // Update time slots when selectedDate changes
  const useRID = localStorage.getItem('USERID');
  const teacherID = localStorage.getItem('TEACHERID');
  const handleCreateClass = () => {
    // Dispatch the action to create class with selected date, start time, and end time
    if (selectedDate && SelectedTimes.length > 0) {
      const startTime = moment.utc(SelectedTimes[0].start_time).format('HH:mm');
      const endTime = moment.utc(SelectedTimes[0].end_time).format('HH:mm');
      dispatch(createClass({
        teacherId: teacherID, // Pass teacherID to the action payload
        userID: useRID, // Pass userID to the action payload
        appointmentData: {
          date: selectedDate.toISOString().split('T')[0],
          start_time: startTime,
          end_time: endTime,
        },
      }));
    } else {
      console.log('Please select date and time');
    }
  };
  return (
    <div className="calendar-input">
      <input
        type="text"
        value={selectedDate ? selectedDate.toDateString() : 'SELECT DATE HERE'} // Display selected date in the input field if it's not null
        onClick={toggleCalendar} // Toggle calendar visibility when input is clicked
        readOnly // Make the input field read-only to prevent manual input
      />
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate || new Date()} // Set the value to null or new Date()
            tileClassName={({ date }) => {
              const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().split('T')[0];
              // console.log('REAL RAW DATE', date);
              // console.log('Formatted date:', formattedDate);
              const isBooked = appointments.some(
                (appointment) => appointment.date === formattedDate,
              );
              return isBooked ? 'booked-date' : 'not-booked';
            }}
            onClickDay={() => handleTileClick(selectedDate || new Date())} // Handle click event
          />
        </div>
      )}
      <div className="time-slots">
        <h3>Select Time Slot:</h3>
        {SelectedTimes.length > 0 ? (
          SelectedTimes.map((timeSlot) => (
            <div key={timeSlot.start_time}>
              {`${moment.utc(timeSlot.start_time).format('HH:mm')} - ${moment.utc(timeSlot.end_time).format('HH:mm')}`}
            </div>
          ))
        ) : (
          <div>No available time slots</div>
        )}
      </div>
      <button type="button" onClick={handleCreateClass}>Create Class</button>
    </div>
  );
};
export default CalendarInput;
