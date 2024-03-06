import React from 'react';
import '../assets/stylesheets/add-class.css'

const AddClass = () => {

  return (
    <div className="add-class-body" >
      <div className="add-class-container">
        <form className="add-class-form">
          <h2 className="add-class-title">Add class</h2>
          <input
            type="text"
            name="name"
            id="name"
            className="input-class-name"
            placeholder="Enter the class name"
          />
          <input
            type="text"
            name="address"
            placeholder="Enter the class address"
            id="address"
            className="input-class-address"
          />
          <textarea
            name="description"
            id="description"
            className="input-class-description"
            placeholder="Enter the class description"
          />
          <input
            type="number"
            name="price_per_day"
            id="price_per_day"
            className="input-class-price"
            placeholder="Enter rental price per day"
          />
          <input
            type="text"
            name="image"
            id="image"
            className="input-class-image"
            placeholder="Enter the class image url"
          />
          <img
            alt="Preview"
            className="preview-image"
          />
          <button className="add-class-button" type="submit">Add class</button>
        </form>
      </div>
    </div>
  );
};

export default AddClass;