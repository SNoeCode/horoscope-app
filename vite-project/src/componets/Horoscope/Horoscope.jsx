import { useState, useEffect } from "react";
import "./Horoscope.css";

const zodiac_signs = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"
];

const Horoscope = ({ sign }) => {
  const [horoscope, setHoroscope] = useState({
    daily: {},
    monthly: {},
    yearly: {},
  });
  const [activeTab, setActiveTab] = useState("daily");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sign) {
      setError("No zodiac sign provided");
      setLoading(false);
      return;
    }

    // Validate sign
    if (!zodiac_signs.includes(sign.toLowerCase())) {
      setError("Invalid zodiac sign");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Add cache-busting parameter to prevent caching issues
    const timestamp = new Date().getTime();
    
    fetch(`/horoscope.json?t=${timestamp}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Fetched Horoscope Data:", data);
        
        const signData = data[sign.toLowerCase()];
        if (!signData) {
          throw new Error(`No data found for sign: ${sign}`);
        }

        const cleanText = (text) => {
          if (!text) return "Not available";
          return typeof text === 'string' ? text.trim() : String(text).trim();
        };

        setHoroscope({
          daily: {
            summary: cleanText(signData.daily?.summary),
            ratings: signData.daily?.ratings || {},
          },
          monthly: {
            overview: cleanText(signData.monthly?.overview),
            key_dates: Array.isArray(signData.monthly?.key_dates) 
              ? signData.monthly.key_dates 
              : [],
          },
          yearly: {
            highlights: cleanText(signData.yearly?.highlights),
            forecast: cleanText(signData.yearly?.forecast),
          },
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching horoscope:", error);
        setError(`Failed to load horoscope data: ${error.message}`);
        setLoading(false);
      });
  }, [sign]);

  if (loading) {
    return (
      <div className="horoscope-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your horoscope...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="horoscope-container">
        <div className="error-container">
          <h2>Oops! Something went wrong</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="horoscope-container">
      <h2 className="horoscope-title">
        {sign ? sign.charAt(0).toUpperCase() + sign.slice(1) : "Unknown"} Horoscope
      </h2>

      <div className="tab-buttons">
        <button 
          className={activeTab === "daily" ? "active" : ""}
          onClick={() => setActiveTab("daily")}
        >
          🌟 Daily
        </button>
        <button 
          className={activeTab === "monthly" ? "active" : ""}
          onClick={() => setActiveTab("monthly")}
        >
          📅 Monthly
        </button>
        <button 
          className={activeTab === "yearly" ? "active" : ""}
          onClick={() => setActiveTab("yearly")}
        >
          📆 Yearly
        </button>
      </div>

      <div className="horoscope-content">
        {activeTab === "daily" && (
          <div className="daily-section">
            <h3>🌟 Daily Horoscope</h3>
            <p>{horoscope.daily.summary}</p>
            {horoscope.daily.ratings && Object.keys(horoscope.daily.ratings).length > 0 && (
              <div className="ratings-section">
                <h4>Today's Ratings:</h4>
                <div className="ratings-grid">
                  {Object.entries(horoscope.daily.ratings).map(([category, rating]) => (
                    <div key={category} className="rating-item">
                      <span className="rating-category">
                        {category.charAt(0).toUpperCase() + category.slice(1)}:
                      </span>
                      <span className="rating-value">{rating}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "monthly" && (
          <div className="monthly-section">
            <h3>📅 Monthly Horoscope</h3>
            <p>{horoscope.monthly.overview}</p>
            {horoscope.monthly.key_dates && horoscope.monthly.key_dates.length > 0 && (
              <div className="key-dates-section">
                <h4>Key Dates This Month:</h4>
                <ul>
                  {horoscope.monthly.key_dates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === "yearly" && (
          <div className="yearly-section">
            <h3>📆 Yearly Horoscope</h3>
            <div className="yearly-content">
              <div className="yearly-item">
                <strong>Highlights:</strong>
                <p>{horoscope.yearly.highlights}</p>
              </div>
              <div className="yearly-item">
                <strong>Forecast:</strong>
                <p>{horoscope.yearly.forecast}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Horoscope;
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
