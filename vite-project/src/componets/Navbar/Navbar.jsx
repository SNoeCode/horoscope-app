import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand" onClick={() => navigate("/")}>
          <span className="brand-icon">✨</span>
          <span className="brand-text">Cosmic Horoscope</span>
        </div>

        <div className="navbar-links">
          <button className="nav-link" onClick={() => navigate("/")}>
            🏠 Home
          </button>
          <button className="nav-link" onClick={() => navigate("/horoscope")}>
            🔮 Horoscope
          </button>
          <div className="navbar-links">
            <button className="nav-link" onClick={() => navigate("/learn")}>
              📖 Learn
            </button>
            <div className="navbar-links">
              <button className="nav-link" onClick={() => navigate("/numerlogy")}>
                🧭Numerlogy
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
