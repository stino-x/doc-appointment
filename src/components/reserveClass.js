import React from 'react';
import '../assets/stylesheets/reserve-class.css'

const ReserveClass = () => {
  return (
    <div className="add-reservation-container">
      <form className="add-reservation-form" >
        <h2 className="add-reservation-title">Add Reservation</h2>
        <div className="inputs-fields">
          <div className="form-group">
            <label htmlFor="name">
              Class Name:
              <input
                type="text"
                name="name"
                id="name"
                className="input-class-name"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="start_date">
              Start Date:
              <input
                type="date"
                name="startDate"
                id="start_date"
                className="input-reservation-date"
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="number_of_days">
              Number of Classes:
              <input
                type="number"
                name="numberOfDays"
                id="number_of_days"
                className="input-reservation-days"
                placeholder="Enter class price"
              />
            </label>

          </div>
        </div>
        <button className="add-reservation-button" type="submit">Reserve Class</button>
      </form>
    </div>
  );
};

export default ReserveClass;