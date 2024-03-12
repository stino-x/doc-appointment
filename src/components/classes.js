import React from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation, Pagination, Scrollbar, A11y,
} from 'swiper/modules';

import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import '../assets/stylesheets/classes.css';

const classes = [
  {
    id: 1,
    image: 'https://example.com/house1.jpg',
    name: 'Arabic class',
    platform: 'Zoom',
    description: 'An intensive course',
    price_per_lesson: 100,
  },
  {
    id: 2,
    image: 'https://example.com/house2.jpg',
    name: 'English class',
    platform: 'Skype',
    description: 'Easy to take course',
    price_per_lesson: 150,
  },
  {
    id: 3,
    image: 'https://example.com/house1.jpg',
    name: 'Arabic class',
    platform: 'Zoom',
    description: 'An intensive course',
    price_per_lesson: 100,
  },
  {
    id: 4,
    image: 'https://example.com/house2.jpg',
    name: 'English class',
    platform: 'Skype',
    description: 'Easy to take course',
    price_per_lesson: 150,
  },
  {
    id: 5,
    image: 'https://example.com/house1.jpg',
    name: 'Arabic class',
    platform: 'Zoom',
    description: 'An intensive course',
    price_per_lesson: 100,
  },
  {
    id: 6,
    image: 'https://example.com/house2.jpg',
    name: 'English class',
    platform: 'Skype',
    description: 'Easy to take course',
    price_per_lesson: 150,
  },
  {
    id: 7,
    image: 'https://example.com/house1.jpg',
    name: 'Arabic class',
    platform: 'Zoom',
    description: 'An intensive course',
    price_per_lesson: 100,
  },
  {
    id: 8,
    image: 'https://example.com/house2.jpg',
    name: 'English class',
    platform: 'Skype',
    description: 'Easy to take course',
    price_per_lesson: 150,
  },
  // Add more dummy house objects as needed
];

const Classes = () => (
  <section className="classes-section">
    <h2 className="classes-tittle">Classes</h2>
    <Swiper
      className="swiper"
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={30}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 50,
        },
      }}
      navigation={{
        prevEl: '.prev',
        nextEl: '.next',
      }}
    >
      {classes.map((slide) => (
        <SwiperSlide
          key={slide.id}
          style={{ display: 'flex' }}
          className="class"
        >
          <Link className="link" to={`/classes/${slide.id}`} state={{ class: slide }}>
            <div className="circle">
              <img className="class-img" src={slide.image} alt="class" />
            </div>
            <div className="details">
              <h3>{slide.name}</h3>
              <p className="points">. . . . . . . . . . . . . . . . . . . . .</p>
              <p>
                Platform:&nbsp;
                {slide.platform}
                ,&nbsp;
                {slide.description}
                , on a price of&nbsp;
                {slide.price_per_lesson}
                $ per lesson
              </p>
              <div className="circle-icons">
                <img className="circle-icon" src="https://cdn-icons-png.flaticon.com/128/665/665209.png" alt="icons" />
                <img className="circle-icon" src="https://cdn-icons-png.flaticon.com/128/665/665228.png" alt="icons" />
                <img className="circle-icon" src="https://cdn-icons-png.flaticon.com/128/665/665211.png" alt="icons" />
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
      <div className="prev">◁</div>
      <div className="next">▷</div>
    </Swiper>
  </section>
);

export default Classes;
