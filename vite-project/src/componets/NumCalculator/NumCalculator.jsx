import React, { useState,useEffect } from 'react';
import './NumCalculator.css'
import soulNumbers from '../../data/SoulNum.json';
import personalityNumbers from '../../data/PersonalityNum.json';
import destinyNumbers from '../../data/DestinyNum.json';

const NumCalculator = () => {
  const [name, setName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [results, setResults] = useState(null);

  // Letter to number mapping: a=1, b=2, c=3, d=4, e=5, f=6, g=7, h=8, i=9, j=1, k=2, l=3, m=4, n=5, o=6, p=7, q=8, r=9, s=1, t=2, u=3, v=4, w=5, x=6, y=7, z=8
  const letterValues = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
  };


  const vowels = ['a', 'e', 'i', 'o', 'u'];
useEffect(() => {
  console.log("Updated results:", results);
}, [results]);

  // Reduce number to single digit or master number (11, 22, 33)
  const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  // Calculate Soul Urge Number (vowels only)
  const calculateSoulUrge = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    const vowelSum = cleanName
      .split('')
      .filter(letter => vowels.includes(letter))
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(vowelSum);
  };

  // Calculate Destiny Number (all letters)
  const calculateDestiny = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    const totalSum = cleanName
      .split('')
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(totalSum);
  };

  // Calculate Personality Number (consonants only)
  const calculatePersonality = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
    const consonantSum = cleanName
      .split('')
      .filter(letter => !vowels.includes(letter))
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(consonantSum);
  };

  // Calculate Life Path Number from birthday
  const calculateLifePath = (birthDate) => {
    const cleanDate = birthDate.replace(/[^0-9]/g, '');
    const digitSum = cleanDate
      .split('')
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    return reduceToSingleDigit(digitSum);
  };

  const handleCalculate = () => {
    console.log("Button clicked");


    if (!name.trim() || !birthday.trim()) {
      alert('Please enter both name and birthday');
      return;
    }

  const soulUrge = name.trim() ? calculateSoulUrge(name) : null;
  const destiny = name.trim() ? calculateDestiny(name) : null;
  const personality = name.trim() ? calculatePersonality(name) : null;
  const lifePath = birthday ? calculateLifePath(birthday) : null;
  console.log("Soul Urge:", calculateSoulUrge(name));
console.log("Destiny:", calculateDestiny(name));
console.log("Personality:", calculatePersonality(name));
console.log("Life Path:", calculateLifePath(birthday));  
  setResults({
      soulUrge,
      destiny,
      personality,
      lifePath
    });
  };
  const mergeNumerologyData = () => {
  const mergedData = {};

  [soulNumbers, personalityNumbers, destinyNumbers].forEach(dataSet => {
    Object.keys(dataSet).forEach(number => {
      if (!mergedData[number]) mergedData[number] = {};
      Object.assign(mergedData[number], dataSet[number]);
    });
  });

  return mergedData;
};



  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Numerology Calculator</h2>
      
      <div style={{ marginBottom: '15px' }}>
        <label>
          Full Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full birth name"
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label>
          Birthday:
          <input
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
            style={{ 
              width: '100%', 
              padding: '8px', 
              marginTop: '5px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </label>
      </div>

      <button 
        onClick={handleCalculate}
        style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          width: '100%'
        }}
      >
        Calculate Numbers
      </button>

      {results && (
        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'navy', borderRadius: '8px' }}>
    <h3>Your Numerology Numbers:</h3>
    <p><strong>Life Path Number:</strong> {results.lifePath}</p>
    <p><strong>Soul Urge Number:</strong> {results.soulUrge}</p>
    <p><strong>Destiny Number:</strong> {results.destiny}</p>
    <p><strong>Personality Number:</strong> {results.personality}</p>
  </div>


        
      )}
    </div>
  );
};

export default NumCalculator;