import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { fetchTeacherDetails } from '../redux/reducers/DetailTeachersSlice'; // Import your slice file and thunk action

// Dummy array of teachers
const teachers = [
  {
    id: 1,
    name: 'John Doe',
    subject: 'Mathematics',
    qualifications: 'Bachelor of Science in Mathematics',
    experience: 5,
    contact_information: 'john.doe@example.com',
    bio: 'Passionate about teaching mathematics.',
    availabilities: [
      { start_time: new Date(), end_time: new Date(), date: new Date() },
      { start_time: new Date(), end_time: new Date(), date: new Date() },
    ],
  },
  // Add more dummy teacher objects as needed
];

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const fecthStatus = useSelector((state) => state.TeacherDetails.status);
  if (fecthStatus === 'succeeded') {
    navigate('/details');
  }

  const handleTeacherDetails = (teacherId) => {
    dispatch(fetchTeacherDetails(teacherId));
    localStorage.setItem('TEACHERID', teacherId);
  };

  return (
    <div>
      <h1>Teachers</h1>
      <div>
        {teachers.map((teacher) => (
          <div key={teacher.id}>
            <h2>{teacher.name}</h2>
            <p>
              Subject:
              {teacher.subject}
            </p>
            <p>
              Qualifications:
              {teacher.qualifications}
            </p>
            <p>
              Experience:
              {teacher.experience}
              {' '}
              years
            </p>
            <p>
              Contact Information:
              {teacher.contact_information}
            </p>
            <p>
              Bio:
              {teacher.bio}
            </p>
            {/* <h3>Availabilities:</h3>
            <ul>
              {teacher.availabilities.map((availability) => (
                <li key={availability.id}>
                  Start Time:
                  {' '}
                  {availability.start_time.toString()}
                  <br />
                  End Time:
                  {' '}
                  {availability.end_time.toString()}
                  <br />
                  Date:
                  {' '}
                  {availability.date.toString()}
                </li>
              ))}
            </ul> */}
            <button type="button" onClick={() => handleTeacherDetails(teacher.id)}>View Details</button>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}
