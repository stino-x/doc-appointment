import React from 'react';
import '../assets/stylesheets/details.css'

const ClassDetails = () => {
  return (
    <section className="class-details">
      <img className="details-img" alt="class" />
      <div className="details-info">
        <h4>
          class name
          <br />
          <p className="h3">-  $2 deposit upon any class</p>
        </h4>
        <div className="details-price">
          <p>Booking Fee</p>
          <p>
            $
          </p>
        </div>
        <div className="details-price">
          <p>Option to pucharse fee</p>
          <p>
            $
          </p>
        </div>
        <div className="details-price">
          <p>Toal Amount payable</p>
          <p>
            $
          </p>
        </div>
        <div className="details-price">
          <p>Duration</p>
          <p>4 months</p>
        </div>
        <div className="details-apr">
          <p className="apr">5.9% APR</p>
          <p> Representative</p>
        </div>
        <div className="details-button">
          <button type="button" className="reserve" >
            Reserve
            <img src="https://img.icons8.com/?size=24&id=JV9QvsUAUkOM&format=png" alt="icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ClassDetails;