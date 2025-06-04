import React, { useState } from "react";
// Make sure to import or define zodiacSigns, piscesData, styles somewhere above this component

const GetSign = () => {
  const [birthday, setBirthday] = useState({ day: "", month: "", year: "" });
  const [selectedSign, setSelectedSign] = useState(null);

  const getZodiacSign = (day, month) => {
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);

    if (!dayNum || !monthNum) return null;

    for (let sign of zodiacSigns) {
      const [startMonth, startDay, endMonth, endDay] = sign.dates;

      if (startMonth === endMonth) {
        if (monthNum === startMonth && dayNum >= startDay && dayNum <= endDay) {
          return sign.name;
        }
      } else {
        if (
          (monthNum === startMonth && dayNum >= startDay) ||
          (monthNum === endMonth && dayNum <= endDay)
        ) {
          return sign.name;
        }
      }
    }
    return null;
  };

  const handleBirthdayChange = (field, value) => {
    setBirthday((prev) => ({ ...prev, [field]: value }));
  };

  const handleSignClick = (signName) => {
    if (signName === "Pisces") {
      setSelectedSign(piscesData);
    } else {
      setSelectedSign({
        sign: signName,
        symbol: zodiacSigns.find((s) => s.name === signName)?.symbol,
      });
    }
  };

  const matchedSign = getZodiacSign(birthday.day, birthday.month);

  return (
    <div style={styles.astrologyApp}>
      <header style={styles.appHeader}>
        <h1 style={styles.appTitle}>✨ Astrology Signs Explorer ✨</h1>
        <p style={styles.appSubtitle}>
          Discover your zodiac sign and personality traits
        </p>
      </header>

      <div style={styles.birthdaySection}>
        <h2 style={styles.birthdayTitle}>Enter Your Birthday</h2>
        <div style={styles.birthdayInputs}>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Day</label>
            <input
              style={styles.inputField}
              type="number"
              min="1"
              max="31"
              value={birthday.day}
              onChange={(e) => handleBirthdayChange("day", e.target.value)}
              placeholder="DD"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Month</label>
            <input
              style={styles.inputField}
              type="number"
              min="1"
              max="12"
              value={birthday.month}
              onChange={(e) => handleBirthdayChange("month", e.target.value)}
              placeholder="MM"
            />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.inputLabel}>Year</label>
            <input
              style={styles.inputField}
              type="number"
              min="1900"
              max="2025"
              value={birthday.year}
              onChange={(e) => handleBirthdayChange("year", e.target.value)}
              placeholder="YYYY"
            />
          </div>
        </div>
        {matchedSign && (
          <div style={styles.matchedSign}>
            <p style={styles.matchedText}>
              Your zodiac sign is: <strong>{matchedSign}</strong>
            </p>
            <button
              style={styles.viewDetailsBtn}
              onClick={() => handleSignClick(matchedSign)}
              onMouseOver={(e) => {
                e.target.style.background = "white";
                e.target.style.color = "#667eea";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "rgba(255, 255, 255, 0.2)";
                e.target.style.color = "white";
              }}
            >
              View Details
            </button>
          </div>
        )}
      </div>

      <div style={styles.zodiacGrid}>
        {zodiacSigns.map((sign) => (
          <div
            key={sign.name}
            style={{
              ...styles.zodiacCard,
              ...(matchedSign === sign.name ? styles.zodiacCardMatched : {}),
            }}
            onClick={() => handleSignClick(sign.name)}
            onMouseOver={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = "translateY(-10px) scale(1.05)";
                e.target.style.background =
                  "linear-gradient(45deg, #667eea, #764ba2)";
                e.target.style.color = "white";
              }
            }}
            onMouseOut={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.background = "rgba(255, 255, 255, 0.95)";
                e.target.style.color = "#000";
              }
            }}
          >
            <div style={styles.zodiacSymbol}>{sign.symbol}</div>
            <h3 style={styles.zodiacName}>{sign.name}</h3>
          </div>
        ))}
      </div>

      {selectedSign && (
        <div style={styles.signDetails}>
          <div style={styles.detailsHeader}>
            <h2 style={styles.detailsTitle}>
              {selectedSign.symbol} {selectedSign.sign}
            </h2>
            <button
              style={styles.closeBtn}
              onClick={() => setSelectedSign(null)}
              onMouseOver={(e) => {
                e.target.style.background = "#c0392b";
                e.target.style.transform = "scale(1.1)";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#e74c3c";
                e.target.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
          </div>

          {selectedSign.sign === "Pisces" ? (
            <div>
              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Basic Info</h3>
                <p style={styles.sectionText}>
                  <strong>Element:</strong> {selectedSign.element}
                </p>
                <p style={styles.sectionText}>
                  <strong>Quality:</strong> {selectedSign.quality}
                </p>
                <p style={styles.sectionText}>
                  <strong>Ruling Planet:</strong> {selectedSign.rulingPlanet}
                </p>
                <p style={styles.sectionText}>
                  <strong>Dates:</strong> {selectedSign.dates}
                </p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Personality Overview</h3>
                <p style={styles.sectionText}>
                  {selectedSign.personality.overview}
                </p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Core Traits</h3>
                <div style={styles.traitsGrid}>
                  {selectedSign.personality.coreTraits.map((trait, index) => (
                    <span key={index} style={styles.traitTag}>
                      {trait}
                    </span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Strengths</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.strengths.map((strength, index) => (
                    <li
                      key={index}
                      style={{
                        ...styles.listItem,
                        "::before": { content: "🌟" },
                      }}
                    >
                      🌟 {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Challenges</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.weaknesses.map(
                    (weakness, index) => (
                      <li
                        key={index}
                        style={{
                          ...styles.listItem,
                          "::before": { content: "🌟" },
                        }}
                      >
                        🌟 {weakness}
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Career Paths</h3>
                <p style={styles.sectionText}>
                  <strong>Work Style:</strong> {selectedSign.careers.workStyle}
                </p>
                <div style={styles.careerList}>
                  {selectedSign.careers.idealOccupations.map(
                    (career, index) => (
                      <span key={index} style={styles.careerTag}>
                        {career}
                      </span>
                    )
                  )}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Relationships</h3>
                <p style={styles.sectionText}>
                  <strong>Love Style:</strong>{" "}
                  {selectedSign.relationships.loveStyle}
                </p>
                <p style={styles.sectionText}>
                  <strong>Best Matches:</strong>{" "}
                  {selectedSign.relationships.bestMatches.join(", ")}
                </p>
                <p style={styles.sectionText}>
                  <strong>Challenging Matches:</strong>{" "}
                  {selectedSign.relationships.challenging.join(", ")}
                </p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Health & Wellness</h3>
                <div style={styles.healthGrid}>
                  <div>
                    <h4 style={styles.sectionSubtitle}>Strengths</h4>
                    <ul style={styles.list}>
                      {selectedSign.health.strengths.map((strength, index) => (
                        <li key={index} style={styles.listItem}>
                          🌟 {strength}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 style={styles.sectionSubtitle}>Vulnerabilities</h4>
                    <ul style={styles.list}>
                      {selectedSign.health.vulnerabilities.map(
                        (vulnerability, index) => (
                          <li key={index} style={styles.listItem}>
                            🌟 {vulnerability}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
                <div>
                  <h4 style={styles.sectionSubtitle}>Recommendations</h4>
                  <ul style={styles.list}>
                    {selectedSign.health.recommendations.map((rec, index) => (
                      <li key={index} style={styles.listItem}>
                        🌟 {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div style={styles.basicSignInfo}>
              <p style={styles.basicInfoText}>
                Detailed information available for Pisces only.
              </p>
              <p style={styles.basicInfoText}>
                Click on Pisces to see full personality profile!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GetSign;