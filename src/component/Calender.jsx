import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarInput = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
  };

  const toggleCalendar = () => {
    setShowCalendar((prev) => !prev);
  };

  return (
    <div className="calendar-input">
      <input
        type="text"
        value={selectedDate.toDateString()} // Display selected date in the input field
        onClick={toggleCalendar} // Toggle calendar visibility when input is clicked
        readOnly // Make the input field read-only to prevent manual input
      />
      {showCalendar && (
        <div className="calendar-container">
          <Calendar
            onChange={handleDateChange}
            value={selectedDate}
          />
        </div>
      )}
    </div>
  );
};

export default CalendarInput;
