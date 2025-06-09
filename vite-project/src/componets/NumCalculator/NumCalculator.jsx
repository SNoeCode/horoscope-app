import React, { useState } from "react";
import numerologyData from "../../data/numdata.json";
import "./NumCalculator.css";

const NumCalculator = () => {
  const [name, setName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [results, setResults] = useState(null);

  const letterValues = {
    a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
    j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
    s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8,
  };

  const vowels = ["a", "e", "i", "o", "u"];

  const reduceToSingleDigit = (num) => {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num
        .toString()
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    return num;
  };

  const calculateSoulUrge = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
    const vowelSum = cleanName
      .split("")
      .filter((letter) => vowels.includes(letter))
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(vowelSum);
  };

  const calculateDestiny = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
    const totalSum = cleanName
      .split("")
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(totalSum);
  };

  const calculatePersonality = (fullName) => {
    const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
    const consonantSum = cleanName
      .split("")
      .filter((letter) => !vowels.includes(letter))
      .reduce((sum, letter) => sum + letterValues[letter], 0);
    return reduceToSingleDigit(consonantSum);
  };

  const calculateLifePath = (birthDate) => {
    const cleanDate = birthDate.replace(/[^0-9]/g, "");
    const digitSum = cleanDate
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    return reduceToSingleDigit(digitSum);
  };

  const handleCalculate = () => {
    if (!name.trim() || !birthday.trim()) {
      alert("Please enter both name and birthday");
      return;
    }

    const soulUrge = calculateSoulUrge(name);
    const destiny = calculateDestiny(name);
    const personality = calculatePersonality(name);
    const lifePath = calculateLifePath(birthday);

    setResults({
      soulUrge,
      destiny,
      personality,
      lifePath,
    });
  };

  const getNumberData = (numberType, number) => {
    const numberData = numerologyData.Numerology[number.toString()];
    return numberData ? numberData[numberType] : null;
  };

  return (
    <div className="numerology-container">
      <div className="glass-card main-card">
        <h2 className="main-title">Numerology Calculator</h2>

        <div className="form-section">
          <div className="input-group">
            <label className="input-label">Full Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full birth name"
              className="form-input"
            />
          </div>

          <div className="input-group">
            <label className="input-label">Birthday:</label>
            <input
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              className="form-input"
            />
          </div>

          <button onClick={handleCalculate} className="calculate-button">
            Calculate My Numbers
          </button>
        </div>

        {results && (
          <div className="results-container">
            <h3 className="results-title">Your Numerology Numbers</h3>

            <div className="results-grid">
              <div className="result-item">
                <div className="result-info">
                  <span className="result-label">Life Path Number:</span>
                  <span className="result-value">{results.lifePath}</span>
                </div>
                <p className="content-text">
                  {getNumberData("lifepaths", results.lifePath)?.description}
                </p>
              </div>

              <div className="result-item">
                <div className="result-info">
                  <span className="result-label">Soul Urge Number:</span>
                  <span className="result-value">{results.soulUrge}</span>
                </div>
                <p className="content-text">
                  {getNumberData("Soul Number", results.soulUrge)}
                </p>
              </div>

              <div className="result-item">
                <div className="result-info">
                  <span className="result-label">Destiny Number:</span>
                  <span className="result-value">{results.destiny}</span>
                </div>
                <p className="content-text">
                  {getNumberData("Destiny Number", results.destiny)?.Expression}
                </p>
              </div>

              <div className="result-item">
                <div className="result-info">
                  <span className="result-label">Personality Number:</span>
                  <span className="result-value">{results.personality}</span>
                </div>
                <p className="content-text">
                  {getNumberData("Personality Number", results.personality)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NumCalculator;






























// import React, { useState, useEffect } from "react";
// import numerologyData from "../../data/numerlogy.json";
// import "./NumCalculator.css";
// import { useNavigate } from "react-router-dom";

// const NumCalculator = () => {
//   const [name, setName] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [results, setResults] = useState(null);
//   const [showLifePath, setShowLifePath] = useState(false);
//   const [pathData, setPathData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const letterValues = {
//     a: 1,
//     b: 2,
//     c: 3,
//     d: 4,
//     e: 5,
//     f: 6,
//     g: 7,
//     h: 8,
//     i: 9,
//     j: 1,
//     k: 2,
//     l: 3,
//     m: 4,
//     n: 5,
//     o: 6,
//     p: 7,
//     q: 8,
//     r: 9,
//     s: 1,
//     t: 2,
//     u: 3,
//     v: 4,
//     w: 5,
//     x: 6,
//     y: 7,
//     z: 8,
//   };

//   const vowels = ["a", "e", "i", "o", "u"];

//   // Reduce number to single digit or master number
//   const reduceToSingleDigit = (num) => {
//     while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
//       num = num
//         .toString()
//         .split("")
//         .reduce((sum, digit) => sum + parseInt(digit), 0);
//     }
//     return num;
//   };

//   // Calculate numerology numbers
//   const calculateSoulUrge = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
//     const vowelSum = cleanName
//       .split("")
//       .filter((letter) => vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(vowelSum);
//   };

//   const calculateDestiny = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
//     const totalSum = cleanName
//       .split("")
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(totalSum);
//   };

//   const calculatePersonality = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, "");
//     const consonantSum = cleanName
//       .split("")
//       .filter((letter) => !vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(consonantSum);
//   };

//   const calculateLifePath = (birthDate) => {
//     const cleanDate = birthDate.replace(/[^0-9]/g, "");
//     const digitSum = cleanDate
//       .split("")
//       .reduce((sum, digit) => sum + parseInt(digit), 0);
//     return reduceToSingleDigit(digitSum);
//   };

//   const handleCalculate = () => {
//     if (!name.trim() || !birthday.trim()) {
//       alert("Please enter both name and birthday");
//       return;
//     }

//     const soulUrge = calculateSoulUrge(name);
//     const destiny = calculateDestiny(name);
//     const personality = calculatePersonality(name);
//     const lifePath = calculateLifePath(birthday);

//     setResults({ soulUrge, destiny, personality, lifePath });
//   };

//   const handleViewLifePath = () => {
//     if (results?.lifePath) {
//       setLoading(true);
//       const lifePathNumber = results.lifePath.toString();
//       const isMasterNumber = ["11", "22", "33"].includes(lifePathNumber);
//       const data = isMasterNumber
//         ? numerologyData.life_paths.master_numbers[lifePathNumber]
//         : numerologyData.life_paths[lifePathNumber];

//       setPathData(data);
//       setLoading(false);
//       setShowLifePath(true);
//       navigate(`/lifepath/${results.lifePath}`);
//     }
//   };

//   const handleCloseLifePath = () => {
//     setShowLifePath(false);
//     setPathData(null);
//   };

//   if (showLifePath && pathData) {
//     return (
//       <div className="lifepath-container">
//         <div className="lifepath-content">
//           <div className="lifepath-header">
//             <div className="lifepath-number">{results.lifePath}</div>
//             <div className="lifepath-title-section">
//               <h2 className="lifepath-title">{pathData.name}</h2>
//               <button className="close-btn" onClick={handleCloseLifePath}>
//                 ×
//               </button>
//             </div>
//           </div>

//           <div className="lifepath-description">
//             <h3 className="section-title">🌟 Your Life Path</h3>
//             <p className="description-text">{pathData.description}</p>
//           </div>

//           {pathData.Strengths && (
//             <div className="lifepath-section">
//               <h3 className="section-title">✨ Your Strengths</h3>
//               <div className="strengths-grid">
//                 {pathData.Strengths.map((strength, index) => (
//                   <div key={index} className="strength-card">
//                     <span className="strength-icon">⭐</span>
//                     <span className="strength-text">{strength}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {pathData.Challenges && (
//             <div className="lifepath-section">
//               <h3 className="section-title">🌙 Areas for Growth</h3>
//               <div className="challenges-list">
//                 {pathData.Challenges.map((challenge, index) => (
//                   <div key={index} className="challenge-item">
//                     <span className="challenge-icon">🌱</span>
//                     <span className="challenge-text">{challenge}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto" }}>
//       <h2>Numerology Calculator</h2>

//       <div style={{ marginBottom: "15px" }}>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full birth name"
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               borderRadius: "4px",
//             }}
//           />
//         </label>
//       </div>

//       <div style={{ marginBottom: "15px" }}>
//         <label>
//           Birthday:
//           <input
//             type="date"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "8px",
//               marginTop: "5px",
//               borderRadius: "4px",
//             }}
//           />
//         </label>
//       </div>

//       <button
//         onClick={handleCalculate}
//         style={{
//           backgroundColor: "#4CAF50",
//           color: "white",
//           padding: "10px 20px",
//           borderRadius: "4px",
//           cursor: "pointer",
//           fontSize: "16px",
//           width: "100%",
//         }}
//       >
//         Calculate Numbers
//       </button>

//       {results && (
//         <div
//           style={{
//             marginTop: "20px",
//             padding: "15px",
//             backgroundColor: "navy",
//             borderRadius: "8px",
//             color: "white",
//           }}
//         >
//           <h3>Your Numerology Numbers:</h3>
//           <p>
//             <strong>Life Path Number:</strong> {results.lifePath}
//           </p>
//           <p>
//             <strong>Soul Urge Number:</strong> {results.soulUrge}
//           </p>
//           <p>
//             <strong>Destiny Number:</strong> {results.destiny}
//           </p>
//           <p>
//             <strong>Personality Number:</strong> {results.personality}
//           </p>
//           <button
//             onClick={handleViewLifePath}
//             className="view-details-button"
//             style={{
//               marginTop: "10px",
//               backgroundColor: "#FFD700",
//               padding: "8px",
//               borderRadius: "4px",
//               cursor: "pointer",
//             }}
//           >
//             View Life Path Details
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NumCalculator;

// import React, { useState, useEffect } from 'react';
// import LifePath from '../LifePath/LifePath';
// import numerologyData from '../../data/numerlogy.json';

// const NumCalculator = () => {
//   const [name, setName] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [results, setResults] = useState(null);
//   const [showLifePath, setShowLifePath] = useState(false);

//   // Letter to number mapping
//   const letterValues = {
//     a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
//     j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
//     s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
//   };

//   const vowels = ['a', 'e', 'i', 'o', 'u'];

//   // Reduce number to single digit or master number
//   const reduceToSingleDigit = (num) => {
//     while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
//       num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
//     }
//     return num;
//   };

//   // Calculate numerology numbers
//   const calculateSoulUrge = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const vowelSum = cleanName.split('').filter(letter => vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(vowelSum);
//   };

//   const calculateDestiny = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const totalSum = cleanName.split('').reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(totalSum);
//   };

//   const calculatePersonality = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const consonantSum = cleanName.split('').filter(letter => !vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(consonantSum);
//   };

//   const calculateLifePath = (birthDate) => {
//     const cleanDate = birthDate.replace(/[^0-9]/g, '');
//     const digitSum = cleanDate.split('').reduce((sum, digit) => sum + parseInt(digit), 0);
//     return reduceToSingleDigit(digitSum);
//   };

//   const handleCalculate = () => {
//     if (!name.trim() || !birthday.trim()) {
//       alert('Please enter both name and birthday');
//       return;
//     }

//     const soulUrge = calculateSoulUrge(name);
//     const destiny = calculateDestiny(name);
//     const personality = calculatePersonality(name);
//     const lifePath = calculateLifePath(birthday);

//     setResults({ soulUrge, destiny, personality, lifePath });
//   };

//   const handleViewLifePath = () => {
//     setShowLifePath(true);
//   };

//   const handleCloseLifePath = () => {
//     setShowLifePath(false);
//   };

//   if (showLifePath && results?.lifePath) {
//     return <LifePath lifePathNumber={results.lifePath} onClose={handleCloseLifePath} />;
//   }

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
//       <h2>Numerology Calculator</h2>

//       <div style={{ marginBottom: '15px' }}>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full birth name"
//             style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
//           />
//         </label>
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label>
//           Birthday:
//           <input
//             type="date"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             style={{ width: '100%', padding: '8px', marginTop: '5px', borderRadius: '4px' }}
//           />
//         </label>
//       </div>

//       <button onClick={handleCalculate} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', width: '100%' }}>
//         Calculate Numbers
//       </button>

//       {results && (
//         <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'navy', borderRadius: '8px', color: 'white' }}>
//           <h3>Your Numerology Numbers:</h3>
//           <p><strong>Life Path Number:</strong> {results.lifePath}</p>
//           <p><strong>Soul Urge Number:</strong> {results.soulUrge}</p>
//           <p><strong>Destiny Number:</strong> {results.destiny}</p>
//           <p><strong>Personality Number:</strong> {results.personality}</p>
//           <button onClick={handleViewLifePath} style={{ marginTop: '10px', backgroundColor: '#FFD700', padding: '8px', borderRadius: '4px', cursor: 'pointer' }}>
//             View Life Path Details
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NumCalculator;

// import React, { useState,useEffect } from 'react';
// import './NumCalculator.css'
// // import soulNumbers from '../../data/SoulNum.json';
// // import personalityNumbers from '../../data/PersonalityNum.json';
// // import destinyNumbers from '../../data/DestinyNum.json';
// import LifePath from '../LifePath/LifePath';
// const NumCalculator = () => {
//   const [name, setName] = useState('');
//   const [birthday, setBirthday] = useState('');
//   const [results, setResults] = useState(null);

//   // Letter to number mapping: a=1, b=2, c=3, d=4, e=5, f=6, g=7, h=8, i=9, j=1, k=2, l=3, m=4, n=5, o=6, p=7, q=8, r=9, s=1, t=2, u=3, v=4, w=5, x=6, y=7, z=8
//   const letterValues = {
//     a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9,
//     j: 1, k: 2, l: 3, m: 4, n: 5, o: 6, p: 7, q: 8, r: 9,
//     s: 1, t: 2, u: 3, v: 4, w: 5, x: 6, y: 7, z: 8
//   };

//   const vowels = ['a', 'e', 'i', 'o', 'u'];
// useEffect(() => {
//   console.log("Updated results:", results);
// }, [results]);

//   // Reduce number to single digit or master number (11, 22, 33)
//   const reduceToSingleDigit = (num) => {
//     while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
//       num = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
//     }
//     return num;
//   };

//   // Calculate Soul Urge Number (vowels only)
//   const calculateSoulUrge = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const vowelSum = cleanName
//       .split('')
//       .filter(letter => vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(vowelSum);
//   };

//   // Calculate Destiny Number (all letters)
//   const calculateDestiny = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const totalSum = cleanName
//       .split('')
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(totalSum);
//   };

//   // Calculate Personality Number (consonants only)
//   const calculatePersonality = (fullName) => {
//     const cleanName = fullName.toLowerCase().replace(/[^a-z]/g, '');
//     const consonantSum = cleanName
//       .split('')
//       .filter(letter => !vowels.includes(letter))
//       .reduce((sum, letter) => sum + letterValues[letter], 0);
//     return reduceToSingleDigit(consonantSum);
//   };

//   // Calculate Life Path Number from birthday
//   const calculateLifePath = (birthDate) => {
//     const cleanDate = birthDate.replace(/[^0-9]/g, '');
//     const digitSum = cleanDate
//       .split('')
//       .reduce((sum, digit) => sum + parseInt(digit), 0);
//     return reduceToSingleDigit(digitSum);
//   };

//   const handleCalculate = () => {
//     console.log("Button clicked");

//     if (!name.trim() || !birthday.trim()) {
//       alert('Please enter both name and birthday');
//       return;
//     }

//   const soulUrge = name.trim() ? calculateSoulUrge(name) : null;
//   const destiny = name.trim() ? calculateDestiny(name) : null;
//   const personality = name.trim() ? calculatePersonality(name) : null;
//   const lifePath = birthday ? calculateLifePath(birthday) : null;
//   console.log("Soul Urge:", calculateSoulUrge(name));
// console.log("Destiny:", calculateDestiny(name));
// console.log("Personality:", calculatePersonality(name));
// console.log("Life Path:", calculateLifePath(birthday));
//   setResults({
//       soulUrge,
//       destiny,
//       personality,
//       lifePath
//     });
//   };
//   const mergeNumerologyData = () => {
//   const mergedData = {};

//   [soulNumbers, personalityNumbers, destinyNumbers].forEach(dataSet => {
//     Object.keys(dataSet).forEach(number => {
//       if (!mergedData[number]) mergedData[number] = {};
//       Object.assign(mergedData[number], dataSet[number]);
//     });
//   });

//   return mergedData;
// };

//   return (
//     <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
//       <h2>Numerology Calculator</h2>

//       <div style={{ marginBottom: '15px' }}>
//         <label>
//           Full Name:
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Enter your full birth name"
//             style={{
//               width: '100%',
//               padding: '8px',
//               marginTop: '5px',
//               border: '1px solid #ccc',
//               borderRadius: '4px'
//             }}
//           />
//         </label>
//       </div>

//       <div style={{ marginBottom: '15px' }}>
//         <label>
//           Birthday:
//           <input
//             type="date"
//             value={birthday}
//             onChange={(e) => setBirthday(e.target.value)}
//             style={{
//               width: '100%',
//               padding: '8px',
//               marginTop: '5px',
//               border: '1px solid #ccc',
//               borderRadius: '4px'
//             }}
//           />
//         </label>
//       </div>

//       <button
//         onClick={handleCalculate}
//         style={{
//           backgroundColor: '#4CAF50',
//           color: 'white',
//           padding: '10px 20px',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer',
//           fontSize: '16px',
//           width: '100%'
//         }}
//       >
//         Calculate Numbers
//       </button>

//       {results && (
//         <div style={{ marginTop: '20px', padding: '15px', backgroundColor: 'navy', borderRadius: '8px' }}>
//     <h3>Your Numerology Numbers:</h3>
//     <p><strong>Life Path Number:</strong> {results.lifePath}</p>
//     <p><strong>Soul Urge Number:</strong> {results.soulUrge}</p>
//     <p><strong>Destiny Number:</strong> {results.destiny}</p>
//     <p><strong>Personality Number:</strong> {results.personality}</p>
//   </div>

//       )}
//     </div>
//   );
// };

// export default NumCalculator;
