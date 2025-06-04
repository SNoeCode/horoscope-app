import React, { useState } from 'react';

// Zodiac signs data
const zodiacSigns = [
  { name: 'Aries', symbol: '♈', dates: [3, 21, 4, 19] },
  { name: 'Taurus', symbol: '♉', dates: [4, 20, 5, 20] },
  { name: 'Gemini', symbol: '♊', dates: [5, 21, 6, 20] },
  { name: 'Cancer', symbol: '♋', dates: [6, 21, 7, 22] },
  { name: 'Leo', symbol: '♌', dates: [7, 23, 8, 22] },
  { name: 'Virgo', symbol: '♍', dates: [8, 23, 9, 22] },
  { name: 'Libra', symbol: '♎', dates: [9, 23, 10, 22] },
  { name: 'Scorpio', symbol: '♏', dates: [10, 23, 11, 21] },
  { name: 'Sagittarius', symbol: '♐', dates: [11, 22, 12, 21] },
  { name: 'Capricorn', symbol: '♑', dates: [12, 22, 1, 19] },
  { name: 'Aquarius', symbol: '♒', dates: [1, 20, 2, 18] },
  { name: 'Pisces', symbol: '♓', dates: [2, 19, 3, 20] },
];

// Styles object (minimal for demo, expand as needed)
const styles = {
  astrologyApp: { fontFamily: 'sans-serif', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', minHeight: '100vh', padding: 24, color: '#222' },
  appHeader: { textAlign: 'center', marginBottom: 32 },
  appTitle: { fontSize: 36, color: 'white', margin: 0 },
  appSubtitle: { fontSize: 18, color: 'white', margin: 0 },
  birthdaySection: { background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 24, margin: '0 auto 32px', maxWidth: 500, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' },
  birthdayTitle: { fontSize: 24, marginBottom: 16 },
  birthdayInputs: { display: 'flex', gap: 16, marginBottom: 16 },
  inputGroup: { display: 'flex', flexDirection: 'column', alignItems: 'flex-start' },
  inputLabel: { fontWeight: 'bold', marginBottom: 4 },
  inputField: { padding: 8, borderRadius: 8, border: '1px solid #ccc', width: 80 },
  matchedSign: { marginTop: 16, textAlign: 'center' },
  matchedText: { fontSize: 18, marginBottom: 8 },
  viewDetailsBtn: { padding: '8px 16px', borderRadius: 8, border: 'none', background: 'rgba(255,255,255,0.2)', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: 16, transition: 'all 0.2s' },
  zodiacGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 24, margin: '32px 0' },
  zodiacCard: { background: 'rgba(255,255,255,0.95)', borderRadius: 16, padding: 16, textAlign: 'center', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' },
  zodiacCardMatched: { background: 'linear-gradient(45deg, #667eea, #764ba2)', color: 'white', transform: 'scale(1.05)' },
  zodiacSymbol: { fontSize: 36, marginBottom: 8 },
  zodiacName: { fontSize: 20, margin: 0 },
  signDetails: { background: 'rgba(255,255,255,0.98)', borderRadius: 16, padding: 32, maxWidth: 600, margin: '32px auto', boxShadow: '0 2px 16px rgba(0,0,0,0.12)' },
  detailsHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  detailsTitle: { fontSize: 28, margin: 0 },
  closeBtn: { background: '#e74c3c', color: 'white', border: 'none', borderRadius: '50%', width: 36, height: 36, fontSize: 24, cursor: 'pointer', transition: 'all 0.2s' },
  detailSection: { marginBottom: 24 },
  sectionTitle: { fontSize: 20, marginBottom: 8 },
  sectionText: { fontSize: 16, marginBottom: 4 },
  traitsGrid: { display: 'flex', gap: 8, flexWrap: 'wrap' },
  traitTag: { background: '#667eea', color: 'white', borderRadius: 8, padding: '4px 12px', fontSize: 14 },
  list: { paddingLeft: 20, margin: 0 },
  listItem: { fontSize: 16, marginBottom: 4 },
  careerList: { display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 },
  careerTag: { background: '#764ba2', color: 'white', borderRadius: 8, padding: '4px 12px', fontSize: 14 },
  healthGrid: { display: 'flex', gap: 32, marginBottom: 16 },
  sectionSubtitle: { fontSize: 16, fontWeight: 'bold', marginBottom: 4 },
  basicSignInfo: { textAlign: 'center', padding: 24 },
  basicInfoText: { fontSize: 16, color: '#555' },
};

const Sign = (day, month) => {
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
}

const Signs = () => {
  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });
  const [selectedSign, setSelectedSign] = useState(null);

  const handleBirthdayChange = (field, value) => {
    setBirthday(prev => ({ ...prev, [field]: value }));
  };

  const handleSignClick = (signName) => {
    if (signName === 'Pisces') {
      setSelectedSign(piscesData);
    } else {
      setSelectedSign({ sign: signName, symbol: zodiacSigns.find(s => s.name === signName)?.symbol });
    }
  };

  const matchedSign = Signs(birthday.day, birthday.month);
  return (
    <div style={styles.astrologyApp}>
      <header style={styles.appHeader}>
        <h1 style={styles.appTitle}>✨ Astrology Signs Explorer ✨</h1>
        <p style={styles.appSubtitle}>Discover your zodiac sign and personality traits</p>
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
              onChange={(e) => handleBirthdayChange('day', e.target.value)}
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
              onChange={(e) => handleBirthdayChange('month', e.target.value)}
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
              onChange={(e) => handleBirthdayChange('year', e.target.value)}
              placeholder="YYYY"
            />
          </div>
        </div>
        {matchedSign && (
          <div style={styles.matchedSign}>
            <p style={styles.matchedText}>Your zodiac sign is: <strong>{matchedSign}</strong></p>
            <button 
              style={styles.viewDetailsBtn}
              onClick={() => handleSignClick(matchedSign)}
              onMouseOver={(e) => {
                e.target.style.background = 'white';
                e.target.style.color = '#667eea';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                e.target.style.color = 'white';
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
              ...(matchedSign === sign.name ? styles.zodiacCardMatched : {})
            }}
            onClick={() => handleSignClick(sign.name)}
            onMouseOver={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = 'translateY(-10px) scale(1.05)';
                e.target.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
                e.target.style.color = 'white';
              }
            }}
            onMouseOut={(e) => {
              if (matchedSign !== sign.name) {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.95)';
                e.target.style.color = '#000';
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
            <h2 style={styles.detailsTitle}>{selectedSign.symbol} {selectedSign.sign}</h2>
            <button 
              style={styles.closeBtn}
              onClick={() => setSelectedSign(null)}
              onMouseOver={(e) => {
                e.target.style.background = '#c0392b';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = '#e74c3c';
                e.target.style.transform = 'scale(1)';
              }}
            >
              ×
            </button>
          </div>
          
          {selectedSign.sign === 'Pisces' ? (
            <div>
              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Basic Info</h3>
                <p style={styles.sectionText}><strong>Element:</strong> {selectedSign.element}</p>
                <p style={styles.sectionText}><strong>Quality:</strong> {selectedSign.quality}</p>
                <p style={styles.sectionText}><strong>Ruling Planet:</strong> {selectedSign.rulingPlanet}</p>
                <p style={styles.sectionText}><strong>Dates:</strong> {selectedSign.dates}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Personality Overview</h3>
                <p style={styles.sectionText}>{selectedSign.personality.overview}</p>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Core Traits</h3>
                <div style={styles.traitsGrid}>
                  {selectedSign.personality.coreTraits.map((trait, index) => (
                    <span key={index} style={styles.traitTag}>{trait}</span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Strengths</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.strengths.map((strength, index) => (
                    <li key={index} style={{...styles.listItem, '::before': {content: '🌟'}}}> 
                      🌟 {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Challenges</h3>
                <ul style={styles.list}>
                  {selectedSign.personality.weaknesses.map((weakness, index) => (
                    <li key={index} style={{...styles.listItem, '::before': {content: '🌟'}}}>
                      🌟 {weakness}
                    </li>
                  ))}
                </ul>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Career Paths</h3>
                <p style={styles.sectionText}><strong>Work Style:</strong> {selectedSign.careers.workStyle}</p>
                <div style={styles.careerList}>
                  {selectedSign.careers.idealOccupations.map((career, index) => (
                    <span key={index} style={styles.careerTag}>{career}</span>
                  ))}
                </div>
              </div>

              <div style={styles.detailSection}>
                <h3 style={styles.sectionTitle}>✨ Relationships</h3>
                <p style={styles.sectionText}><strong>Love Style:</strong> {selectedSign.relationships.loveStyle}</p>
                <p style={styles.sectionText}><strong>Best Matches:</strong> {selectedSign.relationships.bestMatches.join(', ')}</p>
                <p style={styles.sectionText}><strong>Challenging Matches:</strong> {selectedSign.relationships.challenging.join(', ')}</p>
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
                      {selectedSign.health.vulnerabilities.map((vulnerability, index) => (
                        <li key={index} style={styles.listItem}>
                          🌟 {vulnerability}
                        </li>
                      ))}
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
              <p style={styles.basicInfoText}>Detailed information available for Pisces only.</p>
              <p style={styles.basicInfoText}>Click on Pisces to see full personality profile!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

 

export default Signs;