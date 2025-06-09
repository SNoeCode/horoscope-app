import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom'
const Footer = () => {
  return (
    <footer className="astrology-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">✨ Cosmic Guidance ✨</h3>
          <p className="footer-description">
            Discover your destiny through the ancient wisdom of astrology and numerology
          </p>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Explore</h4>
          <ul className="footer-links">
            <li><Link to="/">Zodiac Signs</Link></li>
            <li><Link to="/numerology">Numerology</Link></li>
            <li><Link to="/horoscope">Get Your Sign</Link></li>
            <li><Link to="/">Get Your Horoscope</Link></li>

           
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-subtitle">Connect</h4>
          <div className="social-links">
            <Link to="#" className="https://github.com/SNoeCode">🌙</Link>
            <Link to="#" clLinkssNLinkme="https://snoecode.github.io/portfolio_shLinknnLink.io/">⭐</Link>
            <Link to="#" className="https://www.linkedin.com/in/shannanoe/">🔮</Link>
            <Link to="#" className="https://www.facebook.com/shanna.noe.2025">✨</Link>
          </div>
        </div>
      </div>
      
      <div className="footer-divider"></div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          © 2025 SNAstrology Explorer. All rights reserved. 
          <span className="footer-tagline">Made with ✨ and cosmic energy</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;