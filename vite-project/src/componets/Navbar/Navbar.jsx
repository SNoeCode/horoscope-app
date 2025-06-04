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
              <button className="nav-link" onClick={() => navigate("/astrology")}>
                🧭 Map your Chart
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// import React from 'react';
// import './Navbar.css';
// import { useNavigate } from 'react-router-dom';
// const Navbar = ({ onNavigate, currentView }) => {
//   return (
//     <nav className="navbar">
//       <div className="navbar-container">
//         <div className="navbar-brand" onClick={() => onNavigate('home')}>
//           <span className="brand-icon">✨</span>
//           <span className="brand-text">Cosmic Horoscope</span>
//         </div>

//         <div className="navbar-links">
//           <button
//             className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
//             onClick={() => onNavigate('home')}
//           >
//             🏠 Home
//           </button>
//           <button
//             className={`nav-link ${currentView === 'horoscope' ? 'active' : ''}`}
//             onClick={() => onNavigate('horoscope')}
//           >
//             🔮 Horoscope
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
// import { Link } from "react-router-dom";
// import React from "react";
// import "./Navbar.css";
// import Logo from "../../assets/Dev.png";

// const zodiac_signs = [
//   "aries", "taurus", "gemini", "cancer", "leo", "virgo",
//   "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
// ];

// const Navbar = () => {
//   return (
//     <div className="container-navbar">
//       <div className="logo-container">
//         <img src={Logo} alt="My Logo" className="logo" title="Portfolio coming soon" />
//       </div>
//       <nav className="navbar">
//         {zodiac_signs.map((zodiacSign) => (
//           <Link key={zodiacSign} to={`/${zodiacSign}`}>
//             <button className="nav-button">
//               {zodiacSign.charAt(0).toUpperCase() + zodiacSign.slice(1)}
//             </button>
//           </Link>
//         ))}
//       </nav>
//     </div>
//   );
// };

// export default Navbar;
