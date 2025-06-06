import React, { useState, useEffect } from 'react';
import './Home.css';
import Horoscope from '../Horoscope/Horoscope'


const Home = () => {
  const [selectedSign, setSelectedSign] = useState(null);

  const zodiacSigns = [
    { name: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
    { name: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
    { name: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
    { name: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
    { name: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
    { name: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
    { name: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
    { name: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
    { name: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
    { name: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
    { name: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
    { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
  ];

  return (
    <>
    <Horoscope/>
    <div className="home-container">
      <div className="home-content">
        <h1 className="hero-title">✨ Cosmic Horoscope ✨</h1>
        <p className="hero-subtitle">Discover Your Celestial Destiny</p>

        <h2 className="section-title">Choose Your Zodiac Sign</h2>
        <div className="zodiac-grid">
          {zodiacSigns.map(sign => (
            <button
              key={sign.name}
              onClick={() => setSelectedSign(sign.name)}
              className="zodiac-card"
              title={sign.dates}
              >
              <div className="zodiac-symbol">{sign.symbol}</div>
              <div className="zodiac-name">{sign.name}</div>
              <div className="zodiac-dates">{sign.dates}</div>
            </button>
          ))}
        </div>

        {/* Render Horoscope when a sign is selected */}
        <Horoscope selectedSign={selectedSign} />
      </div>
    </div>
              </>
  );
};

export default Home;



