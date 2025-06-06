// import React from 'react';
// import '../zodiac.css';

// const ZodiacDisplay = ({ zodiacSigns, matchedSign, onSignClick, selectedSign, onCloseDetails }) => {
 
//    const zodiacSigns = [
//     { name: 'Aries', dates: [3, 21, 4, 19], symbol: '♈' },
//     { name: 'Taurus', dates: [4, 20, 5, 20], symbol: '♉' },
//     { name: 'Gemini', dates: [5, 21, 6, 20], symbol: '♊' },
//     { name: 'Cancer', dates: [6, 21, 7, 22], symbol: '♋' },
//     { name: 'Leo', dates: [7, 23, 8, 22], symbol: '♌' },
//     { name: 'Virgo', dates: [8, 23, 9, 22], symbol: '♍' },
//     { name: 'Libra', dates: [9, 23, 10, 22], symbol: '♎' },
//     { name: 'Scorpio', dates: [10, 23, 11, 21], symbol: '♏' },
//     { name: 'Sagittarius', dates: [11, 22, 12, 21], symbol: '♐' },
//     { name: 'Capricorn', dates: [12, 22, 1, 19], symbol: '♑' },
//     { name: 'Aquarius', dates: [1, 20, 2, 18], symbol: '♒' },
//     { name: 'Pisces', dates: [2, 19, 3, 20], symbol: '♓' }
//   ];

//   const getZodiacSign = (day, month) => {
//     const dayNum = parseInt(day);
//     const monthNum = parseInt(month);
    
//     if (!dayNum || !monthNum) return null;

//     for (let sign of zodiacSigns) {
//       const [startMonth, startDay, endMonth, endDay] = sign.dates;
      
//       if (startMonth === endMonth) {
//         if (monthNum === startMonth && dayNum >= startDay && dayNum <= endDay) {
//           return sign.name;
//         }
//       } else {
//         if ((monthNum === startMonth && dayNum >= startDay) || 
//             (monthNum === endMonth && dayNum <= endDay)) {
//           return sign.name;
//         }
//       }
//     }
//     return null;
//   };

//   const handleBirthdayChange = (field, value) => {
//     setBirthday(prev => ({ ...prev, [field]: value }));
//   };

//   const handleSignClick = (signName) => {
//     const signKey = signName.toLowerCase();
//     const signData = zodiacData[signKey];
    
//     if (signData) {
//       setSelectedSign(signData);
//     } else {
//       setSelectedSign({ 
//         sign: signName, 
//         symbol: zodiacSigns.find(s => s.name === signName)?.symbol 
//       });
//     }
//   };

//   const handleCloseDetails = () => {
//     setSelectedSign(null);
//   };

// //    const matchedSign = getZodiacSign(birthday.day, birthday.month);

 
//     return (
//     <>
//       <div className="zodiac-grid">
//         {zodiacSigns.map((sign) => (
//           <div
//             key={sign.name}
//             className={`zodiac-card ${matchedSign === sign.name ? 'zodiac-card-matched' : ''}`}
//             onClick={() => onSignClick(sign.name)}
//           >
//             <div className="zodiac-symbol">{sign.symbol}</div>
//             <h3 className="zodiac-name">{sign.name}</h3>
//           </div>
//         ))}
//       </div>

//       {selectedSign && (
//         <div className="sign-details">
//           <div className="details-header">
//             <h2 className="details-title">{selectedSign.symbol} {selectedSign.sign}</h2>
//             <button 
//               className="close-btn"
//               onClick={onCloseDetails}
//             >
//               ×
//             </button>
//           </div>
          
//           {selectedSign && selectedSign.personality ? (
//             <div>
//               <div className="detail-section">
//                 <h3 className="section-title">✨ Basic Info</h3>
//                 <p className="section-text"><strong>Element:</strong> {selectedSign.element}</p>
//                 <p className="section-text"><strong>Quality:</strong> {selectedSign.quality}</p>
//                 <p className="section-text"><strong>Ruling Planet:</strong> {selectedSign.rulingPlanet}</p>
//                 <p className="section-text"><strong>Dates:</strong> {selectedSign.dates}</p>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Personality Overview</h3>
//                 <p className="section-text">{selectedSign.personality.overview}</p>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Core Traits</h3>
//                 <div className="traits-grid">
//                   {selectedSign.personality.coreTraits.map((trait, index) => (
//                     <span key={index} className="trait-tag">{trait}</span>
//                   ))}
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Strengths</h3>
//                 <ul className="list">
//                   {selectedSign.personality.strengths.map((strength, index) => (
//                     <li key={index} className="list-item"> 
//                       🌟 {strength}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Challenges</h3>
//                 <ul className="list">
//                   {selectedSign.personality.weaknesses.map((weakness, index) => (
//                     <li key={index} className="list-item">
//                       🌟 {weakness}
//                     </li>
//                   ))}
//                 </ul>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Career Paths</h3>
//                 <p className="section-text"><strong>Work Style:</strong> {selectedSign.careers.workStyle}</p>
//                 <div className="career-list">
//                   {selectedSign.careers.idealOccupations.map((career, index) => (
//                     <span key={index} className="career-tag">{career}</span>
//                   ))}
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Relationships</h3>
//                 <p className="section-text"><strong>Love Style:</strong> {selectedSign.relationships.loveStyle}</p>
//                 <p className="section-text"><strong>Best Matches:</strong> {selectedSign.relationships.bestMatches.join(', ')}</p>
//                 <p className="section-text"><strong>Challenging Matches:</strong> {selectedSign.relationships.challenging.join(', ')}</p>
//               </div>

//               <div className="detail-section">
//                 <h3 className="section-title">✨ Health & Wellness</h3>
//                 <div className="health-grid">
//                   <div>
//                     <h4 className="section-subtitle">Strengths</h4>
//                     <ul className="list">
//                       {selectedSign.health.strengths.map((strength, index) => (
//                         <li key={index} className="list-item">
//                           🌟 {strength}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                   <div>
//                     <h4 className="section-subtitle">Vulnerabilities</h4>
//                     <ul className="list">
//                       {selectedSign.health.vulnerabilities.map((vulnerability, index) => (
//                         <li key={index} className="list-item">
//                           🌟 {vulnerability}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="section-subtitle">Recommendations</h4>
//                   <ul className="list">
//                     {selectedSign.health.recommendations.map((rec, index) => (
//                       <li key={index} className="list-item">
//                         🌟 {rec}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <div className="basic-sign-info">
//               <p className="basic-info-text">Detailed information available for Pisces only.</p>
//               <p className="basic-info-text">Click on Pisces to see full personality profile!</p>
//             </div>
//           )}
//         </div>
//       )}
//     </>
//   );
// };

// export default ZodiacDisplay;