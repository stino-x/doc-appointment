/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/stylesheets/card.css';
import { FaStar } from 'react-icons/fa';

export default function CardComponent({ teacher }) {
  return (
    <section className="articles">
      <article>
        <div className="article-wrapper">
          <figure>
            <img src={teacher.image} alt="" />
          </figure>
          <div className="article-body">
            <h2>{teacher.name}</h2>
            <h2>Subject:</h2>
            <p>{teacher.subject}</p>
            <h2>Qualifications:</h2>
            <p>{teacher.qualifications}</p>
            <h2>Status:</h2>
            <p>{teacher.active ? 'ACTIVE' : 'NOT ACTIVE'}</p>
            <h2>Experience:</h2>
            <p className="rating">
              {[...Array(teacher.experience)].map(() => (
                <FaStar key={teacher} />
              ))}
            </p>
            <button type="button" className="details-button" onClick={() => {}}>
              <a href="#" className="read-more">
                {' '}
                <span className="sr-only">BOOK CLASS</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </button>
          </div>
        </div>
      </article>
    </section>
  );
}

CardComponent.propTypes = {
  teacher: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    qualifications: PropTypes.string.isRequired,
    experience: PropTypes.number.isRequired,
    contact_information: PropTypes.string,
    bio: PropTypes.string,
    active: PropTypes.bool,
    admin_user: PropTypes.number,
  }).isRequired,
};
