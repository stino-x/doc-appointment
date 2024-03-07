/* eslint-disable max-len */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './LoadingAnimation.css'; // Assuming you have CSS for your loading animation

const LoadingAnimation = ({
  loadingSignup, loadingTeacher, loadingDetails, loadingAvailability, loadingClass,
}) => {
  const isLoading = loadingSignup || loadingTeacher || loadingDetails || loadingAvailability || loadingClass;

  return (
    <div className="loading-container">
      {isLoading && (
        <div className={`scene ${isLoading ? 'loading' : ''}`}>
          <div className="shadow" />
          <div className="jumper">
            <div className="spinner">
              <div className="scaler">
                <div className="loader">
                  <div className="cuboid">
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                    <div className="cuboid__side" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  loadingSignup: state.signup.loading,
  loadingTeacher: state.createTeacher.loading,
  loadingDetails: state.TeacherDetails.loading,
  loadingAvailability: state.createAvailability.loading,
  loadingClass: state.createClass.loading,
});

LoadingAnimation.propTypes = {
  loadingSignup: PropTypes.bool.isRequired,
  loadingTeacher: PropTypes.bool.isRequired,
  loadingDetails: PropTypes.bool.isRequired,
  loadingAvailability: PropTypes.bool.isRequired,
  loadingClass: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(LoadingAnimation);
