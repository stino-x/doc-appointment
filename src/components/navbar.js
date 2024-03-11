import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/stylesheets/navbar.css';
import LogoutButton from './LogoutButton';

const Navbar = () => (
  <nav className="dropdown">
    <ul>
      <img className="logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqUlEQVR4nO2SQQqDMBBF33Fc2JUuvUBpT603qaVleokphQgSYiB1jNTmw4dhEvL4M4Gioky6AHdAjT0C5xh43AA6+RYD68Y+HliABuhyggWo3TutNVhcotbVIWjtna0Gv4DT7G4FPLz+p/e03LF4iZbqpaT6DTiUKJQ+llRTwbHdidu1v28TcJMwRlNwl5jIDKzGPg44pOtPgP9LQ4bPNewF7vPPs4id9AasA5TYbAtamwAAAABJRU5ErkJggg==" alt="logo" />
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="classes">Classes</Link>
      </li>
      <>
        <li>
          <Link to="add-class">Add Class</Link>
        </li>
        <li>
          <Link to="delete-class">Delete Class</Link>
        </li>
        <li>
          <Link to="reserve-class">Reserve</Link>
        </li>
        <li>
          <Link to="reservations">Reservations</Link>
        </li>
        <LogoutButton />
        <li />
      </>
      <>
        <li>
          <Link to="login">Login</Link>
        </li>
        <li>
          <Link to="signup">Sign up</Link>
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

export default Navbar;
