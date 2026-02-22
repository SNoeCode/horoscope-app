import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Horoscope.css";

const Horoscope = ({ selectedSign }) => {
  const navigate = useNavigate();
  const [horoscopeData, setHoroscopeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activePeriod, setActivePeriod] = useState("daily");

  useEffect(() => {
    const loadHoroscopeData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}horoscope.json`);
        if (res.ok) {
          const data = await res.json();
          setHoroscopeData(data);
        }
      } catch (error) {
        console.error("Error loading horoscope data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadHoroscopeData();
  }, []);

  if (!selectedSign) {
    return null;
  }

  const handleBack = () => navigate("/");

  if (loading) {
    return (
      <div className="horoscope-container">
        <div className="horoscope-content">
          <div className="loading-container">
            <div className="loading-content">
              <div className="loading-spinner"></div>
              <span className="loading-text">
                Loading your cosmic insights...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Find the horoscope for the selected sign
  const signKey = selectedSign.toLowerCase();
  const signData = horoscopeData?.[signKey] || {};
  const dailyHoroscope = signData.daily || null;
  const monthlyHoroscope = signData.monthly || null;
  const yearlyHoroscope = signData.yearly || null;

  // Zodiac symbols mapping
  const zodiacSymbols = {
    aries: "♈",
    taurus: "♉",
    gemini: "♊",
    cancer: "♋",
    leo: "♌",
    virgo: "♍",
    libra: "♎",
    scorpio: "♏",
    sagittarius: "♐",
    capricorn: "♑",
    aquarius: "♒",
    pisces: "♓",
  };
  const zodiacDates = {
    aries: "March 21 - April 19",
    taurus: "April 20 - May 20",
    gemini: "May 21 - June 20",
    cancer: "June 21 - July 22",
    leo: "July 23 - August 22",
    virgo: "August 23 - September 22",
    libra: "September 23 - October 22",
    scorpio: "October 23 - November 21",
    sagittarius: "November 22 - December 21",
    capricorn: "December 22 - January 19",
    aquarius: "January 20 - February 18",
    pisces: "February 19 - March 20",
  };

  return (
    <div className="horoscope-container">
      <div className="horoscope-content">
          <button className="back-button" onClick={handleBack}>
            &larr; Back to Signs
          </button>
          <div className="horoscope-display">
            {/* Sign Header */}
            <div className="sign-header">
              <div className="sign-symbol-large">
                {zodiacSymbols[selectedSign.toLowerCase()] || "✨"}
              </div>
              <h2 className="sign-name">{selectedSign}</h2>
              <p className="sign-dates">
                {zodiacDates[selectedSign.toLowerCase()]}
              </p>
            </div>

            {/* Period Tabs */}
            <div className="period-tabs">
              <button
                className={`period-tab ${activePeriod === "daily" ? "active" : ""}`}
                onClick={() => setActivePeriod("daily")}
              >
                Daily
              </button>
              <button
                className={`period-tab ${activePeriod === "monthly" ? "active" : ""}`}
                onClick={() => setActivePeriod("monthly")}
              >
                Monthly
              </button>
              <button
                className={`period-tab ${activePeriod === "yearly" ? "active" : ""}`}
                onClick={() => setActivePeriod("yearly")}
              >
                Yearly
              </button>
            </div>

            {/* Daily Horoscope */}
            {activePeriod === "daily" && dailyHoroscope && (
              <div className="reading-section">
                <div className="reading-content">
                  {dailyHoroscope.date && (
                    <p className="horoscope-date">{dailyHoroscope.date}</p>
                  )}
                  <h3 className="reading-title">Today's Horoscope</h3>
                  <p className="reading-text">{dailyHoroscope.summary}</p>
                </div>

                {dailyHoroscope.ratings && (
                  <div className="ratings-grid">
                    {Object.entries(dailyHoroscope.ratings)
                      .filter(([, value]) => value)
                      .map(([category, value]) => (
                        <div key={category} className="rating-card">
                          <div className="rating-category">{category}</div>
                          <div className="rating-value">{value}</div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Monthly Horoscope */}
            {activePeriod === "monthly" && monthlyHoroscope && (
              <div className="reading-section">
                <div className="reading-content">
                  {monthlyHoroscope.period && (
                    <p className="horoscope-date">{monthlyHoroscope.period}</p>
                  )}
                  <h3 className="reading-title">Monthly Forecast</h3>
                  <p className="reading-text">{monthlyHoroscope.summary}</p>
                </div>
              </div>
            )}

            {/* Yearly Horoscope */}
            {activePeriod === "yearly" && yearlyHoroscope && (
              <div className="reading-section">
                <div className="reading-content">
                  {yearlyHoroscope.year && (
                    <p className="horoscope-date">
                      {yearlyHoroscope.year} Forecast
                    </p>
                  )}
                  <h3 className="reading-title">Yearly Overview</h3>

                  {yearlyHoroscope.overview && (
                    <div style={{ marginBottom: "1.5rem" }}>
                      <h4
                        style={{
                          color: "#fbbf24",
                          fontSize: "1.1rem",
                          marginBottom: "0.75rem",
                        }}
                      >
                        Overview
                      </h4>
                      <p className="reading-text">{yearlyHoroscope.overview}</p>
                    </div>
                  )}

                  <p className="reading-text">{yearlyHoroscope.summary}</p>
                </div>
              </div>
            )}

            {/* No data messages */}
            {activePeriod === "daily" && !dailyHoroscope && (
              <p
                className="no-data"
                style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}
              >
                No daily horoscope available for {selectedSign}.
              </p>
            )}

            {activePeriod === "monthly" && !monthlyHoroscope && (
              <p
                className="no-data"
                style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}
              >
                No monthly horoscope available for {selectedSign}.
              </p>
            )}

            {activePeriod === "yearly" && !yearlyHoroscope && (
              <p
                className="no-data"
                style={{ textAlign: "center", color: "rgba(255,255,255,0.7)" }}
              >
                No yearly horoscope available for {selectedSign}.
              </p>
            )}
          </div>
      </div>
    </div>
  );
};

export default Horoscope;
