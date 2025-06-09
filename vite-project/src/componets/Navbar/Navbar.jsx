// Navbar.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false); // Close menu after navigation
  };
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => handleNavigation("/")}>
          <span className="brand-icon">✨</span>
          <span className="brand-text">Cosmic Horoscope</span>
        </div>
        
        {/* Hamburger Menu Button */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
          <button className="nav-link" onClick={() => handleNavigation("/")}>
            🏠 Home
          </button>
          <button className="nav-link" onClick={() => handleNavigation("/horoscope")}>
            🔮 Horoscope
          </button>
          <button className="nav-link" onClick={() => handleNavigation("/learn")}>
            📖 Learn
          </button>
          <button className="nav-link" onClick={() => handleNavigation("/numerology")}>
            🧭 Numerology
          </button>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && <div className="menu-overlay" onClick={() => setIsMenuOpen(false)}></div>}
      </div>
    </nav>
  );
};

export default Navbar;