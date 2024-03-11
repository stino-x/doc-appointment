import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTeacherDetails } from '../redux/reducers/DetailTeachersSlice'; // Update the path accordingly
import '../assets/stylesheets/details.css';

const TeacherDetails = () => {
  const dispatch = useDispatch();
  const teacherDetails = useSelector((state) => state.TeacherDetails.teacherDetails);
  const loading = useSelector((state) => state.TeacherDetails.loading);
  const error = useSelector((state) => state.TeacherDetails.error);
  const teacherId = localStorage.getItem('TEACHERID');

  useEffect(() => {
    dispatch(fetchTeacherDetails(teacherId));
  }, [dispatch, teacherId]);

  return (
    <section className="class-details">
      {loading && <p>Loading...</p>}
      {error && (
      <p>
        Error:
        {error}
      </p>
      )}
      {teacherDetails && (
        <>
          <img className="details-img" src={teacherDetails.imageUrl} alt="class" />
          <div className="details-info">
            <h4>
              {teacherDetails.name}
              <br />
              <p className="h3">- $2 deposit upon any class</p>
            </h4>
            <div className="details-price">
              <p>Contact Information</p>
              <p>{teacherDetails.contactInformation}</p>
            </div>
            <div className="details-price">
              <p>Subject</p>
              <p>{teacherDetails.subject}</p>
            </div>
            <div className="details-price">
              <p>Qualifications</p>
              <p>{teacherDetails.qualifications}</p>
            </div>
            <div className="details-price">
              <p>Experience</p>
              <p>
                {teacherDetails.experience}
                {' '}
                years
              </p>
            </div>
            <div className="details-price">
              <p>Bio</p>
              <p>{teacherDetails.bio}</p>
            </div>
            <div className="details-price">
              <p>Availabilities:</p>
              {teacherDetails.availabilities.map((availability) => (
                <p key={availability.id}>
                  {availability.date}
                  :
                  {availability.start_time}
                  {' '}
                  -
                  {availability.end_time}
                </p>
              ))}
            </div>
            <div className="details-button">
              <button type="button" className="reserve">
                Reserve
                <img src="https://img.icons8.com/?size=24&id=JV9QvsUAUkOM&format=png" alt="icon" />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default TeacherDetails;
