import { useState, useEffect } from 'react';

const Horoscope = ({ selectedSign }) => {
  const [horoscopeData, setHoroscopeData] = useState({});
  const [currentPeriod, setCurrentPeriod] = useState('daily');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!selectedSign) return;

    const loadHoroscopeData = async () => {
      setLoading(true);
      try {
        const response = await fetch('/horoscope.json');
        if (response.ok) {
          const data = await response.json();
          setHoroscopeData(data);
        } else {
          console.error("Failed to load horoscope data:", response.status);
        }
      } catch (error) {
        console.error("Error loading horoscope data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHoroscopeData();
  }, [selectedSign]);

  const formatHoroscopeText = (text) => {
    return text || "No content available";
  };

  if (!selectedSign) return null;

  const currentHoroscope = horoscopeData[selectedSign];

  return (
    <div className="horoscope-container">
      <h3>{selectedSign.toUpperCase()} Horoscope</h3>

      {/* Period Selection Tabs */}
      <div className="period-tabs">
        {["daily", "monthly", "yearly"].map((period) => (
          <button
            key={period}
            onClick={() => setCurrentPeriod(period)}
            className={`period-tab ${currentPeriod === period ? "active" : ""}`}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="horoscope-reading">
          {/* Daily Horoscope */}
          {currentPeriod === "daily" && currentHoroscope?.daily && (
            <div className="reading-section">
              <div className="reading-content">
                <h3 className="reading-title">Daily Horoscope</h3>
                <p className="reading-text">
                  {formatHoroscopeText(
                    currentHoroscope.daily.content || currentHoroscope.daily.summary
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Monthly Horoscope */}
          {currentPeriod === "monthly" && currentHoroscope?.monthly && (
            <div className="reading-section">
              <div className="reading-content">
                <h3 className="reading-title">Monthly Overview</h3>
                <p className="reading-text">
                  {formatHoroscopeText(
                    currentHoroscope.monthly.overview || currentHoroscope.monthly.summary
                  )}
                </p>
              </div>
            </div>
          )}

          {/* Yearly Horoscope */}
          {currentPeriod === "yearly" && currentHoroscope?.yearly && (
            <div className="reading-section">
              <div className="reading-content">
                <h3 className="reading-title">Yearly Highlights</h3>
                <p className="reading-text">
                  {formatHoroscopeText(currentHoroscope.yearly.highlights)}
                </p>
              </div>
            </div>
          )}

          {/* Fallback for missing data */}
          {!currentHoroscope?.[currentPeriod] && (
            <p className="no-data">
              No {currentPeriod} horoscope data available for {selectedSign}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Horoscope;








// import { useState, useEffect } from 'react';

// const Horoscope = ({ selectedSign }) => {
//   const [horoscopeData, setHoroscopeData] = useState({});
//   const [currentPeriod, setCurrentPeriod] = useState('daily');
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     if (!selectedSign) return;
//    const loadHoroscopeData = async () => {
//   setLoading(true);
//   try {
//     const response = await fetch('/horoscope.json');
//     if (response.ok) {
//       const data = await response.json();
//       setHoroscopeData(data);
//     } else {
//       console.error('Failed to load horoscope data:', response.status);
//     }
//   } catch (error) {
//     console.error('Error loading horoscope data:', error);
//   } finally {
//     setLoading(false);
//   }
// };

// loadHoroscopeData();

//     // const loadHoroscopeData = async () => {
//     //   setLoading(true);
//     //   try {
//     //     const response = await fetch('/horoscope.json');
//     //     if (response.ok) {
//     //       const data = await response.json();
//     //       setHoroscopeData(data);
//     //     } else {
//     //       console.error('Failed to load horoscope data:', response.status);
//     //     }
//     //   } catch (error) {
//     //     console.error('Error loading horoscope data:', error);
//     //   } finally {
//     //     setLoading(false);
//     //   }
//     // };

//     // loadHoroscopeData();
//   }, [selectedSign]);

//   const formatHoroscopeText = (text) => {
//     return text || 'No content available';
//   };

//   const renderRatings = () => {
//     const currentHoroscope = horoscopeData[selectedSign];
//     if (!currentHoroscope?.daily?.ratings) return null;
    
//     return (
//       <div className="ratings-section">
//         <h4>Today's Ratings</h4>
//         {Object.entries(currentHoroscope.daily.ratings).map(([key, value]) => (
//           <div key={key} className="rating-item">
//             <span>{key.charAt(0).toUpperCase() + key.slice(1)}: </span>
//             <span>{'★'.repeat(value)}{'☆'.repeat(5-value)}</span>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   const renderKeyDates = (keyDates) => {
//     if (!keyDates || keyDates.length === 0) return null;
    
//     return (
//       <div className="key-dates-section">
//         <h4>Key Dates This Month</h4>
//         <ul>
//           {keyDates.map((date, index) => (
//             <li key={index}>
//               <strong>{date.date}:</strong> {date.event}
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   if (!selectedSign) return null;

//   const currentHoroscope = horoscopeData[selectedSign];

//   return (
//     <div className="horoscope-container">
//       <h3>{selectedSign.toUpperCase()} Horoscope</h3>
      
//       {/* Period Selection Tabs */}
//       <div className="period-tabs">
//         {['daily', 'monthly', 'yearly'].map(period => (
//           <button
//             key={period}
//             onClick={() => setCurrentPeriod(period)}
//             className={`period-tab ${currentPeriod === period ? 'active' : ''}`}
//           >
//             {period.charAt(0).toUpperCase() + period.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Loading State */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="horoscope-reading">
//           {/* Daily Horoscope */}
//           {currentPeriod === 'daily' && currentHoroscope?.daily && (
//             <div className="reading-section">
//               <div className="reading-content">
//                 <h3 className="reading-title">Daily Horoscope</h3>
//                 <p className="reading-text">
//                   {formatHoroscopeText(currentHoroscope.daily.content || currentHoroscope.daily.summary)}
//                 </p>
//               </div>
//               {renderRatings()}
//             </div>
//           )}

//           {/* Monthly Horoscope */}
//           {currentPeriod === 'monthly' && currentHoroscope?.monthly && (
//             <div className="reading-section">
//               <div className="reading-content">
//                 <h3 className="reading-title">Monthly Overview</h3>
//                 <p className="reading-text">
//                   {formatHoroscopeText(currentHoroscope.monthly.overview || currentHoroscope.monthly.summary)}
//                 </p>
//               </div>
//               {renderKeyDates(currentHoroscope.monthly.key_dates)}
//             </div>
//           )}

//           {/* Yearly Horoscope */}
//           {currentPeriod === 'yearly' && currentHoroscope?.yearly && (
//             <div className="reading-section">
//               {currentHoroscope.yearly.highlights && (
//                 <div className="reading-content">
//                   <h3 className="reading-title">Yearly Highlights</h3>
//                   <p className="reading-text">
//                     {formatHoroscopeText(currentHoroscope.yearly.highlights)}
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Fallback for missing data */}
//           {!currentHoroscope?.[currentPeriod] && (
//             <p className="no-data">No {currentPeriod} horoscope data available for {selectedSign}.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Horoscope;
// import { useState, useEffect } from 'react';


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
// export default Horoscope
// import React, { useState, useEffect } from 'react';

// const Horoscope = ({ selectedSign, onSignSelect }) => {
//   const [horoscopeData, setHoroscopeData] = useState({});
//   const [currentSign, setCurrentSign] = useState(selectedSign || '');
//   const [currentPeriod, setCurrentPeriod] = useState('daily');
//   const [loading, setLoading] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

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
//     { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' },
//   ];

//   // Load horoscope data
//   useEffect(() => {
//     const loadHoroscopeData = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch('/horoscope.json');
//         if (response.ok) {
//           const data = await response.json();
//           setHoroscopeData(data);
//           setDataLoaded(true);
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
//   }, []);

//   // Update current sign when selectedSign changes
//   useEffect(() => {
//     if (selectedSign) {
//       setCurrentSign(selectedSign);
//       setCurrentPeriod('daily');
//     }
//   }, [selectedSign]);

//   const selectZodiac = (signName) => {
//     setCurrentSign(signName);
//     setCurrentPeriod('daily');
//     if (onSignSelect) {
//       onSignSelect(signName);
//     }
//   };

//   return (
//     <div>
//       <h2>Select Your Zodiac Sign</h2>
//       <div className="zodiac-container">
//         {zodiacSigns.map((sign) => (
//           <button key={sign.name} onClick={() => selectZodiac(sign.name)}>
//             {sign.symbol} {sign.name} ({sign.dates})
//           </button>
//         ))}
//       </div>

//       {currentSign && (
//         <div>
//           <h3>{currentSign.toUpperCase()} Horoscope ({currentPeriod})</h3>
//           {loading ? (
//             <p>Loading...</p>
//           ) : (
//             <p>{horoscopeData[currentSign]?.[currentPeriod]?.summary || 'Data unavailable'}</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Horoscope;



// import React, { useState, useEffect } from 'react';
// import './Horoscope.css';

// const Horoscope = ({ selectedSign, onSignSelect }) => {
//   const [horoscopeData, setHoroscopeData] = useState({});
//   const [currentSign, setCurrentSign] = useState(selectedSign || '');
//   const [currentPeriod, setCurrentPeriod] = useState('daily');
//   const [loading, setLoading] = useState(false);
//   const [dataLoaded, setDataLoaded] = useState(false);

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

//   // Load horoscope data from JSON file
//   useEffect(() => {
//     const loadHoroscopeData = async () => {
//       try {
//         setLoading(true);
//         // Try to fetch from the public folder
//         const response = await fetch('/horoscope.json');
//         if (response.ok) {
//           const data = await response.json();
//           setHoroscopeData(data);
//           setDataLoaded(true);
//         } else {
//           console.error('Failed to load horoscope data:', response.status);
//           // Fallback to sample data if JSON fails to load
//           setHoroscopeData(getSampleData());
//           setDataLoaded(true);
//         }
//       } catch (error) {
//         console.error('Error loading horoscope data:', error);
//         // Fallback to sample data if there's an error
//         setHoroscopeData(getSampleData());
//         setDataLoaded(true);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadHoroscopeData();
//   }, []);

//   // Update current sign when selectedSign prop changes
//   useEffect(() => {
//     if (selectedSign) {
//       setCurrentSign(selectedSign);
//       setCurrentPeriod('daily');
//     }
//   }, [selectedSign]);

//   // Sample fallback data
//   const getSampleData = () => ({
//     taurus: {
//       daily: {
//         content: "Today brings stability and grounding energy, dear Taurus. Your practical approach to challenges will serve you well as you navigate through the day's opportunities.",
//         creativity: "Excellent",
//         love: "Good",
//         business: "Fair"
//       },
//       monthly: {
//         overview: "This month focuses on building solid foundations and nurturing relationships. Jupiter's influence brings growth opportunities.",
//         key_dates: ["June 11 - Full Moon brings financial clarity", "June 25 - New Moon for relationship growth"]
//       },
//       yearly: {
//         highlights: "2025 Overview: Some key influences point to a stabilizing period this year, dear Taurus. Focus on building lasting relationships and solid foundations."
//       }
//     },
//     sagittarius: {
//       daily: {
//         content: "Concerns related to communications, learning, daily affairs, and keeping abreast of your studies or personal interests can be stronger on your mind early today, dear Sagittarius.",
//         creativity: "Excellent",
//         love: "Good",
//         business: "Fair"
//       },
//       monthly: {
//         overview: "Adventure and learning opportunities present themselves this month. Your philosophical nature guides you toward new experiences.",
//         key_dates: ["June 15 - Jupiter alignment for travel", "June 28 - Mercury boost for communication"]
//       },
//       yearly: {
//         highlights: "A year of expansion and philosophical growth awaits you, Sagittarius. Travel and higher learning feature prominently in your cosmic journey."
//       }
//     },
//     aries: {
//       daily: {
//         content: "Your fiery energy is particularly strong today, Aries. Channel this passion into productive pursuits and leadership opportunities.",
//         creativity: "High",
//         love: "Excellent",
//         business: "Good"
//       },
//       monthly: {
//         overview: "Leadership opportunities abound this month. Your natural initiative will open doors to new possibilities.",
//         key_dates: ["June 12 - Mars energy peak", "June 20 - Communication breakthrough"]
//       },
//       yearly: {
//         highlights: "This year emphasizes new beginnings and bold ventures. Your pioneering spirit will lead you to exciting territories."
//       }
//     }
//   });

//   // Function to set selected zodiac sign and default to daily horoscope
//   const selectZodiac = (signName) => {
//     setCurrentSign(signName);
//     setCurrentPeriod('daily');
//     if (onSignSelect) {
//       onSignSelect(signName);
//     }
//   };

//   // Find current sign's data
//   const currentSignData = zodiacSigns.find(s => s.name === currentSign);
//   const currentHoroscope = horoscopeData[currentSign];

//   // Function to clean and format horoscope text
//   const formatHoroscopeText = (text) => {
//     if (!text || text === "Not available" || text === "Horoscope section not found." || text === "Failed to fetch horoscope.") {
//       return "Horoscope data temporarily unavailable. Please try again later.";
//     }
    
//     return text.replace(/\n+/g, ' ').replace(/\s+/g, ' ').trim();
//   };

//   // Function to render ratings section for daily horoscope
//   const renderRatings = () => {
//     if (!currentHoroscope?.daily) return null;
    
//     const ratings = {
//       creativity: currentHoroscope.daily.creativity,
//       love: currentHoroscope.daily.love,
//       business: currentHoroscope.daily.business
//     };
    
//     return (
//       <div className="ratings-grid">
//         {Object.entries(ratings).map(([category, rating]) => (
//           <div key={category} className="rating-card">
//             <h4 className="rating-category">{category}:</h4>
//             <p className="rating-value">{rating || 'N/A'}</p>
//           </div>
//         ))}
//       </div>
//     );
//   };

//   // Function to render key dates for monthly horoscope
//   const renderKeyDates = (keyDates) => {
//     if (!keyDates || !Array.isArray(keyDates) || keyDates.length === 0) return null;
    
//     return (
//       <div className="key-dates-section">
//         <h3 className="key-dates-title">Key Dates:</h3>
//         <ul className="key-dates-list">
//           {keyDates.filter(date => date && date.trim()).map((date, index) => (
//             <li key={index} className="key-date-item">
//               <span className="date-icon">✨</span>
//               <span className="date-text">{date.trim()}</span>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   };

//   if (loading) {
//     return (
//       <div className="horoscope-container loading-container">
//         <div className="loading-content">
//           <div className="loading-spinner"></div>
//           <span>Loading cosmic data...</span>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="horoscope-container">
//       <div className="horoscope-content">
        
//         {/* Header */}
//         <div className="horoscope-header">
//           <h1 className="horoscope-title">
//             ✨ Your Cosmic Reading ✨
//           </h1>
//           {!dataLoaded && (
//             <p className="loading-text">Loading fresh cosmic insights...</p>
//           )}
//         </div>

//         {/* Zodiac Selector */}
//         <div className="zodiac-selector-section">
//           <div className="zodiac-selector">
//             <div className="zodiac-grid-compact">
//               {zodiacSigns.map(sign => (
//                 <button
//                   key={sign.name}
//                   onClick={() => selectZodiac(sign.name)}
//                   className={`zodiac-button ${currentSign === sign.name ? 'active' : ''}`}
//                   title={sign.dates}
//                 >
//                   <div className="zodiac-symbol-small">{sign.symbol}</div>
//                   <div className="zodiac-name-small">{sign.name}</div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Horoscope Content */}
//         {currentSign && currentHoroscope ? (
//           <div className="horoscope-display">
            
//             {/* Sign Header */}
//             <div className="sign-header">
//               <div className="sign-symbol-large">{currentSignData.symbol}</div>
//               <h2 className="sign-name">{currentSign}</h2>
//               <p className="sign-dates">{currentSignData.dates}</p>
//             </div>

//             {/* Period Tabs */}
//             <div className="period-tabs">
//               {['daily', 'monthly', 'yearly'].map(period => (
//                 <button
//                   key={period}
//                   onClick={() => setCurrentPeriod(period)}
//                   className={`period-tab ${currentPeriod === period ? 'active' : ''}`}
//                 >
//                   {period}
//                 </button>
//               ))}
//             </div>

//             {/* Horoscope Content */}
//             <div className="horoscope-reading">
//               {/* Daily Horoscope */}
//               {currentPeriod === "daily" && currentHoroscope.daily && (
//                 <div className="reading-section">
//                   <div className="reading-content">
//                     <h3 className="reading-title">Daily Horoscope</h3>
//                     <p className="reading-text">
//                       {formatHoroscopeText(currentHoroscope.daily.content)}
//                     </p>
//                   </div>
//                   {renderRatings()}
//                 </div>
//               )}

//               {/* Monthly Horoscope */}
//               {currentPeriod === "monthly" && currentHoroscope.monthly && (
//                 <div className="reading-section">
//                   <div className="reading-content">
//                     <h3 className="reading-title">Monthly Overview</h3>
//                     <p className="reading-text">
//                       {formatHoroscopeText(currentHoroscope.monthly.overview)}
//                     </p>
//                   </div>
//                   {renderKeyDates(currentHoroscope.monthly.key_dates)}
//                 </div>
//               )}

//               {/* Yearly Horoscope */}
//               {currentPeriod === "yearly" && currentHoroscope.yearly && (
//                 <div className="reading-section">
//                   {currentHoroscope.yearly.highlights && (
//                     <div className="reading-content">
//                       <h3 className="reading-title">Yearly Highlights</h3>
//                       <p className="reading-text">
//                         {formatHoroscopeText(currentHoroscope.yearly.highlights)}
//                       </p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         ) : (
//           <div className="no-selection">
//             <div className="crystal-ball">🔮</div>
//             <p className="no-selection-title">
//               Select your zodiac sign to reveal your cosmic destiny...
//             </p>
//             <p className="no-selection-subtitle">
//               Choose from the zodiac signs above to explore your personalized horoscope
//             </p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Horoscope;















// import { useState, useEffect } from "react";
// import "./Horoscope.css";

// const zodiac_signs = [
//   "aries", "taurus", "gemini", "cancer", "leo", "virgo",
//   "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
// ];

// const Horoscope = ({ sign }) => {
//   const [horoscope, setHoroscope] = useState({
//     daily: {},
//     monthly: {},
//     yearly: {},
//   });
//   const [activeTab, setActiveTab] = useState("daily");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!sign) {
//       setError("No zodiac sign provided");
//       setLoading(false);
//       return;
//     }

//     // Validate sign
//     if (!zodiac_signs.includes(sign.toLowerCase())) {
//       setError("Invalid zodiac sign");
//       setLoading(false);
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     // Add cache-busting parameter to prevent caching issues
//     const timestamp = new Date().getTime();
    
//     fetch(`/horoscope.json?t=${timestamp}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log("Fetched Horoscope Data:", data);
        
//         const signData = data[sign.toLowerCase()];
//         if (!signData) {
//           throw new Error(`No data found for sign: ${sign}`);
//         }

//         const cleanText = (text) => {
//           if (!text) return "Not available";
//           return typeof text === 'string' ? text.trim() : String(text).trim();
//         };

//         setHoroscope({
//           daily: {
//             summary: cleanText(signData.daily?.summary),
//             ratings: signData.daily?.ratings || {},
//           },
//           monthly: {
//             overview: cleanText(signData.monthly?.overview),
//             key_dates: Array.isArray(signData.monthly?.key_dates) 
//               ? signData.monthly.key_dates 
//               : [],
//           },
//           yearly: {
//             highlights: cleanText(signData.yearly?.highlights),
//             forecast: cleanText(signData.yearly?.forecast),
//           },
//         });
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching horoscope:", error);
//         setError(`Failed to load horoscope data: ${error.message}`);
//         setLoading(false);
//       });
//   }, [sign]);

//   if (loading) {
//     return (
//       <div className="horoscope-container">
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Loading your horoscope...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="horoscope-container">
//         <div className="error-container">
//           <h2>Oops! Something went wrong</h2>
//           <p>{error}</p>
//           <button onClick={() => window.location.reload()} className="retry-button">
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="horoscope-container">
//       <h2 className="horoscope-title">
//         {sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "Unknown"} Horoscope
//       </h2>

//       <div className="tab-buttons">
//         <button 
//           className={activeTab === "daily" ? "active" : ""}
//           onClick={() => setActiveTab("daily")}
//         >
//           🌟 Daily
//         </button>
//         <button 
//           className={activeTab === "monthly" ? "active" : ""}
//           onClick={() => setActiveTab("monthly")}
//         >
//           📅 Monthly
//         </button>
//         <button 
//           className={activeTab === "yearly" ? "active" : ""}
//           onClick={() => setActiveTab("yearly")}
//         >
//           📆 Yearly
//         </button>
//       </div>

//       <div className="horoscope-content">
//         {activeTab === "daily" && (
//           <div className="daily-section">
//             <h3>🌟 Daily Horoscope</h3>
//             <p>{horoscope.daily.summary}</p>
//             {horoscope.daily.ratings && Object.keys(horoscope.daily.ratings).length > 0 && (
//               <div className="ratings-section">
//                 <h4>Today's Ratings:</h4>
//                 <div className="ratings-grid">
//                   {Object.entries(horoscope.daily.ratings).map(([category, rating]) => (
//                     <div key={category} className="rating-item">
//                       <span className="rating-category">
//                         {category.charAt(0).toUpperCase() + category.slice(1)}:
//                       </span>
//                       <span className="rating-value">{rating}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "monthly" && (
//           <div className="monthly-section">
//             <h3>📅 Monthly Horoscope</h3>
//             <p>{horoscope.monthly.overview}</p>
//             {horoscope.monthly.key_dates && horoscope.monthly.key_dates.length > 0 && (
//               <div className="key-dates-section">
//                 <h4>Key Dates This Month:</h4>
//                 <ul>
//                   {horoscope.monthly.key_dates.map((date, index) => (
//                     <li key={index}>{date}</li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         )}

//         {activeTab === "yearly" && (
//           <div className="yearly-section">
//             <h3>📆 Yearly Horoscope</h3>
//             <div className="yearly-content">
//               <div className="yearly-item">
//                 <strong>Highlights:</strong>
//                 <p>{horoscope.yearly.highlights}</p>
//               </div>
//               <div className="yearly-item">
//                 <strong>Forecast:</strong>
//                 <p>{horoscope.yearly.forecast}</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Horoscope;
// import { useState, useEffect } from "react";
// // import { Link } from "react-router-dom";
// import "./Horoscope.css"; // Make sure this file contains the responsive styles

// const zodiac_signs = [
//   "aries",
//   "taurus",
//   "gemini",
//   "cancer",
//   "leo",
//   "virgo",
//   "libra",
//   "scorpio",
//   "sagittarius",
//   "capricorn",
//   "aquarius",
//   "pisces",
// ];

// const Horoscope = ({ sign }) => {
//   const [horoscope, setHoroscope] = useState({
//     daily: {},
//     monthly: {},
//     yearly: {},
//   });
//   const [activeTab, setActiveTab] = useState("daily");
// useEffect(() => {
//   if (!sign) return;

// fetch("/horoscope.json")

//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Fetched Horoscope Data:", data);

//       const cleanText = (text) => (text ? text.trim() : "Not available");

//       setHoroscope({
//         daily: {
//           summary: cleanText(data[sign]?.daily?.summary),
//           ratings: data[sign]?.daily?.ratings || {},
//         },
//         monthly: {
//           overview: cleanText(data[sign]?.monthly?.overview),
//           key_dates: data[sign]?.monthly?.key_dates || [],
//         },
//         yearly: {
//           highlights: cleanText(data[sign]?.yearly?.highlights),
//           forecast: cleanText(data[sign]?.yearly?.forecast),
//         },
//       });
//     })
//     .catch((error) => console.error("Error fetching horoscope:", error));
// }, [sign]);



//   return (
//     <div className="horoscope-container">
     
//       <h2 className="horoscope-title">
//         {sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "Unknown"}{" "}
//         Horoscope
//       </h2>

//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab("daily")}>🌟 Daily</button>
//         <button onClick={() => setActiveTab("monthly")}>📅 Monthly</button>
//         <button onClick={() => setActiveTab("yearly")}>📆 Yearly</button>
//       </div>

//       <div className="horoscope-content">
//         {activeTab === "daily" && (
//           <div className="daily-section">
//             <h3>🌟 Daily Horoscope</h3>
//             <p>{horoscope.daily.summary}</p>
//           </div>
//         )}

//         {activeTab === "monthly" && (
//           <div className="monthly-section">
//             <h3>📅 Monthly Horoscope</h3>
//             <p>{horoscope.monthly.overview}</p>
//             {horoscope.monthly.key_dates.length > 0 && (
//               <ul>
//                 {horoscope.monthly.key_dates.map((date, index) => (
//                   <li key={index}>{date}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === "yearly" && (
//           <div className="yearly-section">
//             <h3>📆 Yearly Horoscope</h3>
//             <p>
//               <strong>Highlights:</strong> {horoscope.yearly.highlights}
//             </p>
//             <p>
//               <strong>Forecast:</strong> {horoscope.yearly.forecast}
//             </p>
//           </div>
//         )}
//       </div>

  
      
//     </div>
//   );
// };

// export default Horoscope;


// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import "./Horoscope.css"; // Make sure this file contains the responsive styles

// const zodiac_signs = [
//   "aries",
//   "taurus",
//   "gemini",
//   "cancer",
//   "leo",
//   "virgo",
//   "libra",
//   "scorpio",
//   "sagittarius",
//   "capricorn",
//   "aquarius",
//   "pisces",
// ];

// const Horoscope = ({ sign }) => {
//   const [horoscope, setHoroscope] = useState({
//     daily: {},
//     monthly: {},
//     yearly: {},
//   });
//   const [activeTab, setActiveTab] = useState("daily");
// useEffect(() => {
//   if (!sign) return;

// fetch("horoscopes-new.json")

//     .then((response) => response.json())
//     .then((data) => {
//       console.log("Fetched Horoscope Data:", data);

//       const cleanText = (text) => (text ? text.trim() : "Not available");

//       setHoroscope({
//         daily: {
//           summary: cleanText(data[sign]?.daily?.summary),
//           ratings: data[sign]?.daily?.ratings || {},
//         },
//         monthly: {
//           overview: cleanText(data[sign]?.monthly?.overview),
//           key_dates: data[sign]?.monthly?.key_dates || [],
//         },
//         yearly: {
//           highlights: cleanText(data[sign]?.yearly?.highlights),
//           forecast: cleanText(data[sign]?.yearly?.forecast),
//         },
//       });
//     })
//     .catch((error) => console.error("Error fetching horoscope:", error));
// }, [sign]);



//   return (
//     <div className="horoscope-container">
     
//       <h2 className="horoscope-title">
//         {sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "Unknown"}{" "}
//         Horoscope
//       </h2>

//       <div className="tab-buttons">
//         <button onClick={() => setActiveTab("daily")}>🌟 Daily</button>
//         <button onClick={() => setActiveTab("monthly")}>📅 Monthly</button>
//         <button onClick={() => setActiveTab("yearly")}>📆 Yearly</button>
//       </div>

//       <div className="horoscope-content">
//         {activeTab === "daily" && (
//           <div className="daily-section">
//             <h3>🌟 Daily Horoscope</h3>
//             <p>{horoscope.daily.summary}</p>
//           </div>
//         )}

//         {activeTab === "monthly" && (
//           <div className="monthly-section">
//             <h3>📅 Monthly Horoscope</h3>
//             <p>{horoscope.monthly.overview}</p>
//             {horoscope.monthly.key_dates.length > 0 && (
//               <ul>
//                 {horoscope.monthly.key_dates.map((date, index) => (
//                   <li key={index}>{date}</li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         )}

//         {activeTab === "yearly" && (
//           <div className="yearly-section">
//             <h3>📆 Yearly Horoscope</h3>
//             <p>
//               <strong>Highlights:</strong> {horoscope.yearly.highlights}
//             </p>
//             <p>
//               <strong>Forecast:</strong> {horoscope.yearly.forecast}
//             </p>
//           </div>
//         )}
//       </div>

  
      
//     </div>
//   );
// };

// export default Horoscope;
