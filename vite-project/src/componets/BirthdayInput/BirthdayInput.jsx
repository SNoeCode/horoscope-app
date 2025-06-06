import React from 'react';
import '../astrology.css';

const BirthdayInput = ({ birthday, onBirthdayChange, matchedSign, onSignClick }) => {
  const handleBirthdayChange = (field, value) => {
    onBirthdayChange(field, value);
  };

  return (
    <div className="birthday-section">
      <h2 className="birthday-title">Enter Your Birthday</h2>
      <div className="birthday-inputs">
        <div className="input-group">
          <label className="input-label">Day</label>
          <input
            className="input-field"
            type="number"
            min="1"
            max="31"
            value={birthday.day}
            onChange={(e) => handleBirthdayChange('day', e.target.value)}
            placeholder="DD"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Month</label>
          <input
            className="input-field"
            type="number"
            min="1"
            max="12"
            value={birthday.month}
            onChange={(e) => handleBirthdayChange('month', e.target.value)}
            placeholder="MM"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Year</label>
          <input
            className="input-field"
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
        <div className="matched-sign">
          <p className="matched-text">Your zodiac sign is: <strong>{matchedSign}</strong></p>
          <button 
            className="view-details-btn"
            onClick={() => onSignClick(matchedSign)}
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default BirthdayInput;