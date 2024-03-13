import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Carousel from 'react-multi-carousel';
import { fetchDoctors } from '../redux/reducers/doctorslistSlice';
import Cards from './Cards';
import styles from '../Styles/Cards.module.css';
import exampleImage from '../images/Image.png';
import 'react-multi-carousel/lib/styles.css';

function DoctorCards() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctorsList);
  const { status, error, doctors: doctorsData } = doctors;

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 1 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  const extractTime = (datetimeString) => {
    const time = new Date(datetimeString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return time;
  };

  return (
    <>
      {status === 'loading' && <div>Loading...</div>}
      {status === 'failed' && (
      <div>
        Error:
        {error}
      </div>
      )}
      {status === 'succeeded' && doctorsData && doctorsData.length > 0 && (
        <Carousel responsive={responsive}>
          <div className={styles.cardWrapper}>
            <h1 className={styles.title}>CHECK OUT OUR DOCTORS</h1>
            <div className={styles.imageBox}>
              <img className={styles.responsiveImage} src={exampleImage} alt="Example" />
            </div>
          </div>
          {doctorsData.map((doctor) => (
            <Cards
              key={doctor.id}
              doctor={{
                ...doctor,
                starting_shift: extractTime(doctor.starting_shift),
                ending_shift: extractTime(doctor.ending_shift),
              }}
            />
          ))}
        </Carousel>
      )}
    </>
  );
}

export default DoctorCards;
