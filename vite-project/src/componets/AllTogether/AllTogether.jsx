import React, { useState } from 'react';

const AllTogether = () => {
  const [birthday, setBirthday] = useState({ day: '', month: '', year: '' });
  const [selectedSign, setSelectedSign] = useState(null);


  const zodiacSigns = [
    { name: 'Aries', dates: [3, 21, 4, 19], symbol: '♈' },
    { name: 'Taurus', dates: [4, 20, 5, 20], symbol: '♉' },
    { name: 'Gemini', dates: [5, 21, 6, 20], symbol: '♊' },
    { name: 'Cancer', dates: [6, 21, 7, 22], symbol: '♋' },
    { name: 'Leo', dates: [7, 23, 8, 22], symbol: '♌' },
    { name: 'Virgo', dates: [8, 23, 9, 22], symbol: '♍' },
    { name: 'Libra', dates: [9, 23, 10, 22], symbol: '♎' },
    { name: 'Scorpio', dates: [10, 23, 11, 21], symbol: '♏' },
    { name: 'Sagittarius', dates: [11, 22, 12, 21], symbol: '♐' },
    { name: 'Capricorn', dates: [12, 22, 1, 19], symbol: '♑' },
    { name: 'Aquarius', dates: [1, 20, 2, 18], symbol: '♒' },
    { name: 'Pisces', dates: [2, 19, 3, 20], symbol: '♓' }
  ];

  const styles = {
    astrologyApp: {
      fontFamily: 'Arial, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      padding: '20px'
    },
    appHeader: {
      textAlign: 'center',
      color: 'white',
      marginBottom: '30px',
      padding: '40px 20px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
    },
    appTitle: {
      fontSize: '3rem',
      marginBottom: '10px',
      textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
      background: 'linear-gradient(45deg, #ffd700, #ffb347)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    appSubtitle: {
      fontSize: '1.2rem',
      opacity: '0.9'
    },
    birthdaySection: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '30px',
      marginBottom: '30px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)'
    },
    birthdayTitle: {
      color: '#2c3e50',
      textAlign: 'center',
      marginBottom: '20px',
      fontSize: '1.8rem'
    },
    birthdayInputs: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      flexWrap: 'wrap',
      marginBottom: '20px'
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    inputLabel: {
      fontWeight: 'bold',
      marginBottom: '8px',
      color: '#2c3e50',
      fontSize: '1.1rem'
    },
    inputField: {
      padding: '12px',
      border: '2px solid #ddd',
      borderRadius: '10px',
      fontSize: '16px',
      width: '80px',
      textAlign: 'center',
      transition: 'all 0.3s ease'
    },
    matchedSign: {
      textAlign: 'center',
      padding: '20px',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      borderRadius: '15px',
      color: 'white',
      marginTop: '20px'
    },
    matchedText: {
      fontSize: '1.2rem',
      marginBottom: '15px'
    },
    viewDetailsBtn: {
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      border: '2px solid white',
      padding: '10px 20px',
      borderRadius: '25px',
      cursor: 'pointer',
      fontSize: '1rem',
      transition: 'all 0.3s ease'
    },
    zodiacGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '20px',
      marginBottom: '30px'
    },
    zodiacCard: {
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '25px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
      border: '2px solid transparent'
    },
    zodiacCardMatched: {
      border: '3px solid #ffd700',
      background: 'linear-gradient(45deg, #ffd700, #ffb347)',
      color: 'white',
      animation: 'pulse 2s infinite'
    },
    zodiacSymbol: {
      fontSize: '3rem',
      marginBottom: '15px',
      display: 'block'
    },
    zodiacName: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      margin: 0
    },
    signDetails: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      position: 'relative'
    },
    detailsHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '30px',
      paddingBottom: '20px',
      borderBottom: '3px solid #667eea'
    },
    detailsTitle: {
      color: '#2c3e50',
      fontSize: '2.5rem',
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0
    },
    closeBtn: {
      background: '#e74c3c',
      color: 'white',
      border: 'none',
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      fontSize: '1.5rem',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    detailSection: {
      marginBottom: '30px',
      padding: '20px',
      background: 'rgba(102, 126, 234, 0.05)',
      borderRadius: '15px',
      borderLeft: '5px solid #667eea'
    },
    sectionTitle: {
      color: '#2c3e50',
      fontSize: '1.5rem',
      marginBottom: '15px',
      display: 'flex',
      alignItems: 'center'
    },
    sectionSubtitle: {
      color: '#34495e',
      fontSize: '1.2rem',
      marginBottom: '10px',
      marginTop: '15px'
    },
    sectionText: {
      lineHeight: '1.6',
      color: '#2c3e50',
      marginBottom: '10px'
    },
    traitsGrid: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px'
    },
    traitTag: {
      background: 'linear-gradient(45deg, #667eea, #764ba2)',
      color: 'white',
      padding: '8px 15px',
      borderRadius: '20px',
      fontSize: '0.9rem',
      fontWeight: 'bold',
      display: 'inline-block'
    },
    careerList: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '15px'
    },
    careerTag: {
      background: '#27ae60',
      color: 'white',
      padding: '6px 12px',
      borderRadius: '15px',
      fontSize: '0.85rem',
      display: 'inline-block'
    },
    healthGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      margin: '20px 0'
    },
    list: {
      listStyle: 'none',
      paddingLeft: '0'
    },
    listItem: {
      padding: '8px 0',
      color: '#2c3e50',
      position: 'relative',
      paddingLeft: '25px'
    },
    basicSignInfo: {
      textAlign: 'center',
      padding: '40px',
      color: '#7f8c8d'
    },
    basicInfoText: {
      fontSize: '1.2rem',
      marginBottom: '15px'
    }
  };

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
        if ((monthNum === startMonth && dayNum >= startDay) || 
            (monthNum === endMonth && dayNum <= endDay)) {
          return sign.name;
        }
      }
    }
    return null;
  };

  const handleBirthdayChange = (field, value) => {
    setBirthday(prev => ({ ...prev, [field]: value }));
  };

 const handleSignClick = (signName) => {
  const signKey = signName.toLowerCase();
  const signData = zodiacData[signKey];
  
  if (signData) {
    setSelectedSign(signData);
  } else {
    setSelectedSign({ sign: signName, symbol: zodiacSigns.find(s => s.name === signName)?.symbol });
  }
};

  const matchedSign = getZodiacSign(birthday.day, birthday.month);

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
          
        {selectedSign && selectedSign.personality ? (
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

export default AllTogether