import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import zodiacSymbols from '../../assets/signs'; // Ensure the file actually exists // Adjust path as needed

const zodiac_signs = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Discover Your Cosmic Destiny</h1>
          <p className="hero-subtitle">
            Unlock the secrets of the stars with personalized horoscope readings
          </p>
          <div className="hero-buttons">
            <button className="cta-button primary">Get My Reading</button>
            <button className="cta-button secondary">Learn More</button>
          </div>
        </div>
        <div className="hero-image">
          <div className="cosmic-placeholder">🌟✨🔮</div>
        </div>
      </section>

      {/* Zodiac Signs Grid */}
      <section className="zodiac-section">
        <h2 className="section-title">Choose Your Zodiac Sign</h2>
        <div className="zodiac-grid">
          {zodiac_signs.map((sign) => (
            <Link key={sign} to={`/${sign}`} className="zodiac-card-link">
              <div className="zodiac-card">
                <div className="zodiac-icon">
                  <img 
                    src={zodiacSymbols[sign]} 
                    alt={`${sign} constellation`}
                    className="zodiac-symbol"
                  />
                </div>
                <h3 className="zodiac-name">
                  {sign.charAt(0).toUpperCase() + sign.slice(1)}
                </h3>
                <p className="zodiac-dates">
                  {getZodiacDates(sign)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🌟</div>
            <h3>Daily Insights</h3>
            <p>Get personalized daily horoscope readings tailored to your zodiac sign</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Monthly Forecasts</h3>
            <p>Comprehensive monthly predictions to help plan your future</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📆</div>
            <h3>Yearly Overview</h3>
            <p>Annual astrological guidance for life's biggest decisions</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Explore Your Future?</h2>
          <p>Join thousands of others discovering their cosmic path</p>
          <button className="cta-button primary large">Start Your Journey</button>
        </div>
      </section>
    </div>
  );
};

// Helper function to get zodiac date ranges
const getZodiacDates = (sign) => {
  const dates = {
    aries: "Mar 21 - Apr 19",
    taurus: "Apr 20 - May 20",
    gemini: "May 21 - Jun 20",
    cancer: "Jun 21 - Jul 22",
    leo: "Jul 23 - Aug 22",
    virgo: "Aug 23 - Sep 22",
    libra: "Sep 23 - Oct 22",
    scorpio: "Oct 23 - Nov 21",
    sagittarius: "Nov 22 - Dec 21",
    capricorn: "Dec 22 - Jan 19",
    aquarius: "Jan 20 - Feb 18",
    pisces: "Feb 19 - Mar 20"
  };
  return dates[sign] || "Date Range";
};

export default Home;
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
