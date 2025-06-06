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






