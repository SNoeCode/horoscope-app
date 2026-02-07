import { useState, useEffect } from 'react';

const Horoscope = ({ selectedSign }) => {
  const [horoscopeData, setHoroscopeData] = useState({});
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

  if (!selectedSign) return null;

  const currentHoroscope = horoscopeData[selectedSign];

  return (
    <div className="horoscope-container">
      <h3>{selectedSign.toUpperCase()} Horoscope</h3>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="horoscope-reading">
          {currentHoroscope?.daily ? (
            <div className="reading-section">
              <div className="reading-content">
                {currentHoroscope.daily.date && (
                  <p className="horoscope-date">{currentHoroscope.daily.date}</p>
                )}
                <h3 className="reading-title">Daily Horoscope</h3>
                <p className="reading-text">
                  {currentHoroscope.daily.content || currentHoroscope.daily.summary || "No content available"}
                </p>
              </div>

              {currentHoroscope.daily.ratings && (
                <div className="ratings-grid">
                  {Object.entries(currentHoroscope.daily.ratings)
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
          ) : (
            <p className="no-data">
              No horoscope data available for {selectedSign}.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Horoscope;
