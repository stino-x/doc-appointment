// RootLayout.js

import React from 'react';
import Navbar from '../components/navbar.js';
import '../assets/stylesheets/rootLayout.css';
import icon from '../assets/images/icon.png';

const RootLayout = ({ children }) => {
  return (
    <div className="root-layout">
      <div className="sidebar">
        <div className="icon">
          <img src={icon} alt="Icon" />
        </div>
        <Navbar />
        <footer>
          {/* Social links */}
          <div className="social-links">
            <a href="#">Facebook</a>
            <a href="#">Twitter</a>
            <a href="#">Instagram</a>
          </div>
        </footer>
      </div>
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default RootLayout;
