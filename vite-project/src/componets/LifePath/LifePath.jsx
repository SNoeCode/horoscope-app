// filepath: c:\Users\snoep_a5dedf8\Desktop\SHANNACHRISTINE\snoep\Shanna Noe\Desktop\dev\horoscope-app\vite-project\src\componets\LifePath\LifePath.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LifePath.css';
import numerologyData from '../../data/numerlogy.json';

const LifePath = ({ lifePathNumber }) => {
  const [pathData, setPathData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (lifePathNumber) {
      const isMasterNumber = ['11', '22', '33'].includes(lifePathNumber);
      const data = isMasterNumber
        ? numerologyData.life_paths.master_numbers[lifePathNumber]
        : numerologyData.life_paths[lifePathNumber];

      setPathData(data);
      setLoading(false);
    }
  }, [lifePathNumber]);

  if (loading) {
    return (
      <div className="lifepath-container">
        <div className="loading-spinner">
          <div className="cosmic-loader">✨</div>
          <p>Consulting the cosmic energies...</p>
        </div>
      </div>
    );
  }

  if (!pathData) {
    return (
      <div className="lifepath-container">
        <div className="no-data">
          <h3>🔮 Cosmic Data Not Found</h3>
          <p>The universe hasn't revealed information for Life Path {lifePathNumber} yet...</p>
          <button onClick={() => navigate('/numerology')} className="back-btn">
            Back to Calculator
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="lifepath-container">
      <div className="lifepath-content">
        <div className="lifepath-header">
          <div className="lifepath-number">{lifePathNumber}</div>
          <div className="lifepath-title-section">
            <h2 className="lifepath-title">{pathData.name}</h2>
            <button className="close-btn" onClick={() => navigate('/numerology')}>
              ×
            </button>
          </div>
        </div>

        <div className="lifepath-description">
          <h3 className="section-title">🌟 Your Life Path</h3>
          <p className="description-text">{pathData.description}</p>
        </div>

        {pathData.Strengths && (
          <div className="lifepath-section">
            <h3 className="section-title">✨ Your Strengths</h3>
            <div className="strengths-grid">
              {pathData.Strengths.map((strength, index) => (
                <div key={index} className="strength-card">
                  <span className="strength-icon">⭐</span>
                  <span className="strength-text">{strength}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {pathData.Challenges && (
          <div className="lifepath-section">
            <h3 className="section-title">🌙 Areas for Growth</h3>
            <div className="challenges-list">
              {pathData.Challenges.map((challenge, index) => (
                <div key={index} className="challenge-item">
                  <span className="challenge-icon">🌱</span>
                  <span className="challenge-text">{challenge}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LifePath;





// import React, { useState, useEffect } from 'react';
// import './LifePath.css';
// import numerologyData from '../../data/numerlogy.json';

// const LifePath = ({ lifePathNumber, onClose }) => {
//   const [pathData, setPathData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (lifePathNumber) {
//       // Fetch data for the specific life path number
//       const data = numerologyData.life_paths[lifePathNumber.toString()];
//       if (data) {
//         setPathData(data);
//       }
//       setLoading(false);
//     }
//   }, [lifePathNumber]);

//   if (loading) {
//     return (
//       <div className="lifepath-container">
//         <div className="loading-spinner">
//           <div className="cosmic-loader">✨</div>
//           <p>Consulting the cosmic energies...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!pathData) {
//     return (
//       <div className="lifepath-container">
//         <div className="no-data">
//           <h3>🔮 Cosmic Data Not Found</h3>
//           <p>The universe hasn't revealed information for Life Path {lifePathNumber} yet...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="lifepath-container">
//       <div className="lifepath-content">
//         <div className="lifepath-header">
//           <div className="lifepath-number">{lifePathNumber}</div>
//           <div className="lifepath-title-section">
//             <h2 className="lifepath-title">{pathData.name}</h2>
//             <button className="close-btn" onClick={onClose}>×</button>
//           </div>
//         </div>

//         <div className="lifepath-description">
//           <h3 className="section-title">🌟 Your Life Path</h3>
//           <p className="description-text">{pathData.description}</p>
//         </div>

//         <div className="lifepath-section">
//           <h3 className="section-title">✨ Your Strengths</h3>
//           <div className="strengths-grid">
//             {pathData.Strengths && pathData.Strengths.map((strength, index) => (
//               <div key={index} className="strength-card">
//                 <span className="strength-icon">⭐</span>
//                 <span className="strength-text">{strength}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {pathData.weaknesses && (
//           <div className="lifepath-section">
//             <h3 className="section-title">🌙 Areas for Growth</h3>
//             <div className="challenges-list">
//               {pathData.weaknesses.map((weakness, index) => (
//                 <div key={index} className="challenge-item">
//                   <span className="challenge-icon">🌱</span>
//                   <span className="challenge-text">{weakness}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {pathData.career_paths && (
//           <div className="lifepath-section">
//             <h3 className="section-title">💼 Career Paths</h3>
//             <div className="career-tags">
//               {pathData.career_paths.map((career, index) => (
//                 <span key={index} className="career-tag">
//                   {career}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         {pathData.love_compatibility && (
//           <div className="lifepath-section">
//             <h3 className="section-title">💕 Love Compatibility</h3>
//             <div className="compatibility-info">
//               <div className="compatibility-section">
//                 <h4>Best Matches:</h4>
//                 <div className="compatibility-numbers">
//                   {pathData.love_compatibility.best_matches && 
//                    pathData.love_compatibility.best_matches.map((match, index) => (
//                     <span key={index} className="compatibility-number good">
//                       {match}
//                     </span>
//                   ))}
//                 </div>
//               </div>
              
//               <div className="compatibility-section">
//                 <h4>Challenging Matches:</h4>
//                 <div className="compatibility-numbers">
//                   {pathData.love_compatibility.challenging && 
//                    pathData.love_compatibility.challenging.map((match, index) => (
//                     <span key={index} className="compatibility-number challenging">
//                       {match}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         {pathData.life_lessons && (
//           <div className="lifepath-section">
//             <h3 className="section-title">📚 Life Lessons</h3>
//             <ul className="lessons-list">
//               {pathData.life_lessons.map((lesson, index) => (
//                 <li key={index} className="lesson-item">
//                   <span className="lesson-icon">🎯</span>
//                   {lesson}
//                 </li>
//               ))}
//             </ul>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default LifePath;