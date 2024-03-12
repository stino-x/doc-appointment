import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleBodyClick = (event) => {
      if (isOpen && event.target.closest('.dropdown') === null) {
        setIsOpen(false);
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, [isOpen]);

  const closeNavbar = () => {
    setIsOpen(false);
  };

  return (
    <nav className="dropdown">
      <button type="button" aria-label="Save" className="dropbtn" onClick={toggleDropdown}>
        <span className={`dropbtn__icon1 ${isOpen ? 'active' : ''}`} />
        <span className={`dropbtn__icon2 ${isOpen ? 'active' : ''}`} />
      </button>
      <ul className={`list ${isOpen ? 'active' : ''}`}>
        <img className="logo" src="https://cdn.freelogodesign.org/files/dca7d4dff3b547d8991b09b057a11880/thumb/logo_200x200.png?v=638345321150000000" alt="logo" />
        <li>
          <Link to="/" onClick={closeNavbar}>Home</Link>
        </li>
        <li>
          <Link to="classes" onClick={closeNavbar}>Classes</Link>
        </li>
        <>
          <li>
            <Link to="add-class" onClick={closeNavbar}>Add Class</Link>
          </li>
          <li>
            <Link to="delete_classes" onClick={closeNavbar}>Delete Class</Link>
          </li>
          <li>
            <Link to="reserve-class" onClick={closeNavbar}>Reserve</Link>
          </li>
          <li>
            <Link to="reservations" onClick={closeNavbar}>Reservations</Link>
          </li>
          <li>
            <button className="logout-button" type="button">Logout</button>
          </li>
        </>
        <>
          <li>
            <Link to="login" onClick={closeNavbar}>Login</Link>
          </li>
          <li>
            <Link to="signup" onClick={closeNavbar}>Register</Link>
          </li>
        </>
        <div className="menu-footer">
          <div className="icons">
            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/733/733635.png" alt="logo" />
            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/20/20837.png" alt="logo" />
            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/59/59490.png" alt="logo" />
            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/4926/4926536.png" alt="logo" />
            <img className="logo" src="https://cdn-icons-png.flaticon.com/128/152/152817.png" alt="logo" />
          </div>
          <p className="copy">Copyright © 2023</p>
        </div>
      </ul>
    </nav>
  );
};

export default Navbar;
