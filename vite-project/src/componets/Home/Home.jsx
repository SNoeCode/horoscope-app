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






// import React, { useState, useEffect } from 'react';
// import './Home.css';

// const Horoscope = ({ selectedSign }) => {
//   const [horoscopeData, setHoroscopeData] = useState({});
//   const [currentPeriod, setCurrentPeriod] = useState('daily');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!selectedSign) return;

//     const loadHoroscopeData = async () => {
//       setLoading(true);
//       try {
//         const response = await fetch('/horoscope.json');
//         if (response.ok) {
//           const data = await response.json();
//           setHoroscopeData(data);
//         } else {
//           console.error('Failed to load horoscope data:', response.status);
//         }
//       } catch (error) {
//         console.error('Error loading horoscope data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadHoroscopeData();
//   }, [selectedSign]);

//   return selectedSign ? (
//     <div className="horoscope-container">
//       <h3>{selectedSign.toUpperCase()} Horoscope ({currentPeriod})</h3>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <p>{horoscopeData[selectedSign]?.[currentPeriod]?.summary || 'Data unavailable'}</p>
//       )}
//     </div>
//   ) : null;
// };

// const Home = () => {
//   const [selectedSign, setSelectedSign] = useState(null);

//   const zodiacSigns = [
//     { name: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
//     { name: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
//     { name: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
//     { name: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
//     { name: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
//     { name: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
//     { name: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
//     { name: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
//     { name: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
//     { name: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
//     { name: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
//     { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
//   ];

//   return (
//     <div className="home-container">
//       <div className="home-content">
//         <h1 className="hero-title">✨ Cosmic Horoscope ✨</h1>
//         <p className="hero-subtitle">Discover Your Celestial Destiny</p>

//         <h2 className="section-title">Choose Your Zodiac Sign</h2>
//         <div className="zodiac-grid">
//           {zodiacSigns.map(sign => (
//             <button
//               key={sign.name}
//               onClick={() => setSelectedSign(sign.name)}
//               className="zodiac-card"
//               title={sign.dates}
//             >
//               <div className="zodiac-symbol">{sign.symbol}</div>
//               <div className="zodiac-name">{sign.name}</div>
//               <div className="zodiac-dates">{sign.dates}</div>
//             </button>
//           ))}
//         </div>

//         {/* Render Horoscope when a sign is selected */}
//         <Horoscope selectedSign={selectedSign} />
//       </div>
//     </div>
//   );
// };

// export default Home;





// import React from 'react';
// import './Home.css';

// const Home = ({ onSignSelect }) => {
//   const zodiacSigns = [
//     { name: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
//     { name: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
//     { name: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
//     { name: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
//     { name: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
//     { name: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
//     { name: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
//     { name: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
//     { name: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
//     { name: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
//     { name: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
//     { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
//   ];

//   return (
//     <div className="home-container">
//       {/* Animated stars background */}
//       <div className="stars-container">
//         <div className="star star-1"></div>
//         <div className="star star-2"></div>
//         <div className="star star-3"></div>
//         <div className="star star-4"></div>
//         <div className="star star-5"></div>
//         <div className="star star-6"></div>
//       </div>

//       <div className="home-content">
//         {/* Header Section */}
//         <div className="hero-section">
//           <h1 className="hero-title">
//             ✨ Cosmic Horoscope ✨
//           </h1>
//           <p className="hero-subtitle">
//             Discover Your Celestial Destiny
//           </p>
//           <p className="hero-description">
//             Unlock the secrets of the universe and explore what the stars have in store for you
//           </p>
//         </div>

//         {/* Zodiac Selection Grid */}
//         <div className="zodiac-section">
//           <h2 className="section-title">Choose Your Zodiac Sign</h2>
//           <div className="zodiac-grid">
//             {zodiacSigns.map(sign => (
//               <button
//                 key={sign.name}
//                 onClick={() => onSignSelect(sign.name)}
//                 className="zodiac-card"
//                 title={sign.dates}
//               >
//                 <div className="zodiac-symbol">{sign.symbol}</div>
//                 <div className="zodiac-name">{sign.name}</div>
//                 <div className="zodiac-dates">{sign.dates}</div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Features Section */}
//         <div className="features-section">
//           <h2 className="section-title">What Awaits You</h2>
//           <div className="features-grid">
//             <div className="feature-card">
//               <div className="feature-icon">📅</div>
//               <h3>Daily Insights</h3>
//               <p>Get personalized daily horoscopes with guidance for love, career, and creativity</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">🌙</div>
//               <h3>Monthly Overview</h3>
//               <p>Discover key dates and monthly themes to plan your cosmic journey</p>
//             </div>
//             <div className="feature-card">
//               <div className="feature-icon">⭐</div>
//               <h3>Yearly Forecast</h3>
//               <p>Explore major life themes and transformative periods ahead</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';
// import zodiacSymbols from '../../assets/signs'; // Ensure the file actually exists // Adjust path as needed

// const zodiac_signs = [
//   "aries", "taurus", "gemini", "cancer", "leo", "virgo",
//   "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
// ];

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1 className="hero-title">Discover Your Cosmic Destiny</h1>
//           <p className="hero-subtitle">
//             Unlock the secrets of the stars with personalized horoscope readings
//           </p>
//           <div className="hero-buttons">
//             <button className="cta-button primary">Get My Reading</button>
//             <button className="cta-button secondary">Learn More</button>
//           </div>
//         </div>
//         <div className="hero-image">
//           <div className="cosmic-placeholder">🌟✨🔮</div>
//         </div>
//       </section>

//       {/* Zodiac Signs Grid */}
//       <section className="zodiac-section">
//         <h2 className="section-title">Choose Your Zodiac Sign</h2>
//         <div className="zodiac-grid">
//           {zodiac_signs.map((sign) => (
//             <Link key={sign} to={`/${sign}`} className="zodiac-card-link">
//               <div className="zodiac-card">
//                 <div className="zodiac-icon">
//                   <img 
//                     src={zodiacSymbols[sign]} 
//                     alt={`${sign} constellation`}
//                     className="zodiac-symbol"
//                   />
//                 </div>
//                 <h3 className="zodiac-name">
//                   {sign.charAt(0).toUpperCase() + sign.slice(1)}
//                 </h3>
//                 <p className="zodiac-dates">
//                   {getZodiacDates(sign)}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2 className="section-title">What We Offer</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">🌟</div>
//             <h3>Daily Insights</h3>
//             <p>Get personalized daily horoscope readings tailored to your zodiac sign</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">📅</div>
//             <h3>Monthly Forecasts</h3>
//             <p>Comprehensive monthly predictions to help plan your future</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">📆</div>
//             <h3>Yearly Overview</h3>
//             <p>Annual astrological guidance for life's biggest decisions</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="cta-section">
//         <div className="cta-content">
//           <h2>Ready to Explore Your Future?</h2>
//           <p>Join thousands of others discovering their cosmic path</p>
//           <button className="cta-button primary large">Start Your Journey</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Helper function to get zodiac date ranges
// const getZodiacDates = (sign) => {
//   const dates = {
//     aries: "Mar 21 - Apr 19",
//     taurus: "Apr 20 - May 20",
//     gemini: "May 21 - Jun 20",
//     cancer: "Jun 21 - Jul 22",
//     leo: "Jul 23 - Aug 22",
//     virgo: "Aug 23 - Sep 22",
//     libra: "Sep 23 - Oct 22",
//     scorpio: "Oct 23 - Nov 21",
//     sagittarius: "Nov 22 - Dec 21",
//     capricorn: "Dec 22 - Jan 19",
//     aquarius: "Jan 20 - Feb 18",
//     pisces: "Feb 19 - Mar 20"
//   };
//   return dates[sign] || "Date Range";
// };

// export default Home;
// import React from 'react';
// import { Link } from 'react-router-dom';
// import './Home.css';

// const zodiac_signs = [
//   "aries", "taurus", "gemini", "cancer", "leo", "virgo",
//   "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
// ];

// const Home = () => {
//   return (
//     <div className="home-container">
//       {/* Hero Section */}
//       <section className="hero-section">
//         <div className="hero-content">
//           <h1 className="hero-title">Discover Your Cosmic Destiny</h1>
//           <p className="hero-subtitle">
//             Unlock the secrets of the stars with personalized horoscope readings
//           </p>
//           <div className="hero-buttons">
//             <button className="cta-button primary">Get My Reading</button>
//             <button className="cta-button secondary">Learn More</button>
//           </div>
//         </div>
//         <div className="hero-image">
//           <div className="cosmic-placeholder">🌟✨🔮</div>
//         </div>
//       </section>

//       {/* Zodiac Signs Grid */}
//       <section className="zodiac-section">
//         <h2 className="section-title">Choose Your Zodiac Sign</h2>
//         <div className="zodiac-grid">
//           {zodiac_signs.map((sign) => (
//             <Link key={sign} to={`/${sign}`} className="zodiac-card-link">
//               <div className="zodiac-card">
//                 <div className="zodiac-icon">♈</div>
//                 <h3 className="zodiac-name">
//                   {sign.charAt(0).toUpperCase() + sign.slice(1)}
//                 </h3>
//                 <p className="zodiac-dates">
//                   {getZodiacDates(sign)}
//                 </p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="features-section">
//         <h2 className="section-title">What We Offer</h2>
//         <div className="features-grid">
//           <div className="feature-card">
//             <div className="feature-icon">🌟</div>
//             <h3>Daily Insights</h3>
//             <p>Get personalized daily horoscope readings tailored to your zodiac sign</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">📅</div>
//             <h3>Monthly Forecasts</h3>
//             <p>Comprehensive monthly predictions to help plan your future</p>
//           </div>
//           <div className="feature-card">
//             <div className="feature-icon">📆</div>
//             <h3>Yearly Overview</h3>
//             <p>Annual astrological guidance for life's biggest decisions</p>
//           </div>
//         </div>
//       </section>

//       {/* Call to Action Section */}
//       <section className="cta-section">
//         <div className="cta-content">
//           <h2>Ready to Explore Your Future?</h2>
//           <p>Join thousands of others discovering their cosmic path</p>
//           <button className="cta-button primary large">Start Your Journey</button>
//         </div>
//       </section>
//     </div>
//   );
// };

// // Helper function to get zodiac date ranges
// const getZodiacDates = (sign) => {
//   const dates = {
//     aries: "Mar 21 - Apr 19",
//     taurus: "Apr 20 - May 20",
//     gemini: "May 21 - Jun 20",
//     cancer: "Jun 21 - Jul 22",
//     leo: "Jul 23 - Aug 22",
//     virgo: "Aug 23 - Sep 22",
//     libra: "Sep 23 - Oct 22",
//     scorpio: "Oct 23 - Nov 21",
//     sagittarius: "Nov 22 - Dec 21",
//     capricorn: "Dec 22 - Jan 19",
//     aquarius: "Jan 20 - Feb 18",
//     pisces: "Feb 19 - Mar 20"
//   };
//   return dates[sign] || "Date Range";
// };

// export default Home;
