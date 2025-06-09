import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NumHub.css';

const NumHub = () => {
  const navigate = useNavigate();

  const numerologyTypes = [
    {
      title: 'Life Path Number',
      description: 'Discover your core life purpose and the path you\'re meant to walk',
      icon: '🛤️',
      path: '/numcalculator',
      color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      title: 'Destiny Number',
      description: 'Uncover your life\'s mission and what you\'re destined to achieve',
      icon: '🌟',
      path: '/destiny',
      color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      title: 'Personality Number',
      description: 'Learn how others perceive you and your outer personality',
      icon: '🎭',
      path: '/personality',
      color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      title: 'Soul Number',
      description: 'Connect with your inner desires and spiritual motivations',
      icon: '💫',
      path: '/soul',
      color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    }
  ];

  return (
    <div className="numerology-hub">
      <div className="hub-header">
        <h1 className="hub-title">Numerology Calculator Hub</h1>
        <p className="hub-subtitle">
          Discover the hidden meanings behind numbers and unlock the secrets of your personality, 
          destiny, and life path through the ancient wisdom of numerology.
        </p>
      </div>

      <div className="numerology-grid">
        {numerologyTypes.map((type, index) => (
          <div 
            key={index} 
            className="numerology-card"
            style={{ background: type.color }}
            onClick={() => navigate(type.path)}
          >
            <div className="card-icon">{type.icon}</div>
            <h3 className="card-title">{type.title}</h3>
            <p className="card-description">{type.description}</p>
            <button className="card-button">
              Calculate Now →
            </button>
          </div>
        ))}
      </div>

      <div className="hub-info">
        <h2>What is Numerology?</h2>
        <p>
          Numerology is the study of numbers and their mystical relationship to life events. 
          Each number carries unique vibrations and meanings that can provide insights into 
          your personality, relationships, and life purpose.
        </p>
      </div>
    </div>
  );
};

export default NumHub;