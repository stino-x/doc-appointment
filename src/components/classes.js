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
import CardComponent from './CardComponent';

const teachers = [{
  teachers: [
    {
      id: 1,
      name: 'John Doe',
      subject: 'Mathematics',
      image: 'https://picsum.photos/id/103/800/450',
      qualifications: 'Ph.D. in Mathematics',
      experience: 10,
      contact_information: 'john.doe@example.com',
      bio: 'John Doe is a passionate mathematician with extensive teaching experience.',
      active: true,
      availabilities: [
        {
          id: 1,
          start_time: '2024-03-13T09:00:00Z',
          end_time: '2024-03-13T11:00:00Z',
          capacity: 5,
          date: '2024-03-13',
        },
        {
          id: 2,
          start_time: '2024-03-14T10:00:00Z',
          end_time: '2024-03-14T12:00:00Z',
          capacity: 3,
          date: '2024-03-14',
        },
      ],
    },
    {
      id: 2,
      name: 'Jane Smith',
      subject: 'Science',
      image: 'https://picsum.photos/id/1011/800/450',
      qualifications: 'M.Sc. in Biology',
      experience: 8,
      contact_information: 'jane.smith@example.com',
      bio: 'Jane Smith is an enthusiastic biologist who loves sharing her knowledge.',
      active: true,
      availabilities: [
        {
          id: 3,
          start_time: '2024-03-15T13:00:00Z',
          end_time: '2024-03-15T15:00:00Z',
          capacity: 4,
          date: '2024-03-15',
        },
        {
          id: 4,
          start_time: '2024-03-16T14:00:00Z',
          end_time: '2024-03-16T16:00:00Z',
          capacity: 6,
          date: '2024-03-16',
        },
      ],
    },
    {
      id: 3,
      name: 'Alice Johnson',
      subject: 'English Literature',
      image: 'http://example.com/images/alicejohnson.jpg',
      qualifications: 'MA in English Literature',
      experience: 5,
      contact_information: 'alice.johnson@example.com',
      bio: 'Alice Johnson is an avid reader and an experienced English teacher.',
      active: true,
      availabilities: [
        {
          id: 5,
          start_time: '2024-03-17T09:00:00Z',
          end_time: '2024-03-17T11:00:00Z',
          capacity: 8,
          date: '2024-03-17',
        },
        {
          id: 6,
          start_time: '2024-03-18T10:00:00Z',
          end_time: '2024-03-18T12:00:00Z',
          capacity: 10,
          date: '2024-03-18',
        },
      ],
    },
    {
      id: 4,
      name: 'Michael Brown',
      subject: 'History',
      image: 'https://picsum.photos/id/1005/800/450',
      qualifications: 'BA in History',
      experience: 7,
      contact_information: 'michael.brown@example.com',
      bio: 'Michael Brown is passionate about exploring and teaching history.',
      active: true,
      availabilities: [
        {
          id: 7,
          start_time: '2024-03-19T13:00:00Z',
          end_time: '2024-03-19T15:00:00Z',
          capacity: 6,
          date: '2024-03-19',
        },
        {
          id: 8,
          start_time: '2024-03-20T14:00:00Z',
          end_time: '2024-03-20T16:00:00Z',
          capacity: 8,
          date: '2024-03-20',
        },
      ],
    },
    {
      id: 5,
      name: 'Emily Wilson',
      subject: 'Chemistry',
      image: 'http://example.com/images/emilywilson.jpg',
      qualifications: 'Ph.D. in Chemistry',
      experience: 12,
      contact_information: 'emily.wilson@example.com',
      bio: 'Emily Wilson is a dedicated chemist and educator, with a focus on practical experiments.',
      active: true,
      availabilities: [
        {
          id: 9,
          start_time: '2024-03-21T09:00:00Z',
          end_time: '2024-03-21T11:00:00Z',
          capacity: 4,
          date: '2024-03-21',
        },
        {
          id: 10,
          start_time: '2024-03-22T10:00:00Z',
          end_time: '2024-03-22T12:00:00Z',
          capacity: 6,
          date: '2024-03-22',
        },
      ],
    },
  ],
}];

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
      {teachers.map((teacher) => (
        <SwiperSlide key={teacher.id} style={{ display: 'flex' }} className="class">
          <Link className="link" to={`/teachers/${teacher.id}`} state={{ teacher }}>
            <CardComponent teacher={teacher} />
          </Link>
        </SwiperSlide>
      ))}
      <div className="prev">◁</div>
      <div className="next">▷</div>
    </Swiper>
  </section>
);

export default Classes;
