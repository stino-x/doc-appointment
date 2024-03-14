import React from 'react';
import { useSelector } from 'react-redux';
import '../Styles/ProfileCard.css';

const ProfileCard = () => {
  // Accessing doctors directly from Redux store state
  const doctors = useSelector((state) => state.doctorsList.doctors);

  // Assuming you want to render data from Redux store
  return (
    <div className="profile-card">
      {doctors.map((doctor) => (
        <div key={doctor.id} className="profile-info">
          <h2>{doctor.name}</h2>
          <p className="location">{doctor.email}</p>
          <p className="bio">{doctor.phone}</p>
        </div>
      ))}
    </div>
  );
};

export default ProfileCard;
