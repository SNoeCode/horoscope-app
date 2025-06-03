// import {
//   BrowserRouter as Router,
//   Route,
//   Routes,
//   BrowserRouter,
// } from "react-router-dom";
// import Home from "./componets/Home/Home";
// import Horoscope from "./componets/Horoscope/Horoscope";
// import Navbar from "./componets/Navbar/Navbar";
// import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';

function App() {
  // State to store horoscope data, selected zodiac sign, and period
  const [horoscopeData, setHoroscopeData] = useState({});
  const [currentSign, setCurrentSign] = useState('');
  const [currentPeriod, setCurrentPeriod] = useState('daily');
  const [loading, setLoading] = useState(true);

  // List of zodiac signs with symbols and dates
  const zodiacSigns = [
    { name: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
    { name: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
    { name: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
    { name: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
    { name: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
    { name: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
    { name: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
    { name: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
    { name: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
    { name: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
    { name: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
    { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
  ];

  // Load horoscope data when the component mounts
  useEffect(() => {
    loadHoroscopeData();
  }, []);

  // Fetch horoscope JSON from public directory
  const loadHoroscopeData = async () => {
    try {
      const response = await fetch('/horoscope.json');

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      
      console.log("Fetched horoscope data:", data); // Debugging log
      
      setHoroscopeData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading horoscope data:', error);
      setLoading(false);
    }
  };

  // Function to set selected zodiac sign and default to daily horoscope
  const selectZodiac = (signName) => {
    setCurrentSign(signName);
    setCurrentPeriod('daily');
  };

  // Find current sign's data
  const currentSignData = zodiacSigns.find(s => s.name === currentSign);
  const currentHoroscope = horoscopeData[currentSign];

  // Show loading screen until data is ready
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading cosmic data...</div>
      </div>
    );
  }

  // return (
  //   <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 relative overflow-hidden">
  //     {/* Header */}
  //     <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
  //       <div className="text-center mb-12">
  //         <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
  //           ✨ Cosmic Horoscope ✨
  //         </h1>
  //         <p className="text-xl text-purple-200 italic font-serif">
  //           Discover Your Celestial Destiny
  //         </p>
  //       </div>

  //       {/* Zodiac Selector */}
  //       <div className="flex flex-wrap justify-center gap-3 mb-12 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
  //         {zodiacSigns.map(sign => (
  //           <button
  //             key={sign.name}
  //             onClick={() => selectZodiac(sign.name)}
  //             className={`px-4 py-3 rounded-2xl transition-all duration-300 border-2 font-medium ${
  //               currentSign === sign.name
  //                 ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
  //                 : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-yellow-400/50 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30'
  //             } backdrop-blur-sm`}
  //             title={sign.dates}
  //           >
  //             <span className="text-lg mr-2">{sign.symbol}</span>
  //             <span className="capitalize">{sign.name}</span>
  //           </button>
  //         ))}
  //       </div>

  //       {/* Horoscope Content */}
  //       {currentSign && currentHoroscope ? (
  //         <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
  //           <div className="text-center mb-8">
  //             <div className="text-8xl mb-4 filter drop-shadow-lg">{currentSignData.symbol}</div>
  //             <h2 className="text-4xl font-bold text-yellow-300 capitalize mb-2">{currentSign}</h2>
  //             <p className="text-purple-200 text-lg font-serif">{currentSignData.dates}</p>
  //           </div>

  //           {/* Horoscope Summary */}
  //           <div className="text-purple-100 text-lg leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
  //             {currentHoroscope[currentPeriod]?.summary || "No horoscope data available"}
  //           </div>
  //         </div>
  //       ) : (
  //         <div className="text-center py-20">
  //           <div className="text-2xl text-purple-200 mb-4">🔮</div>
  //           <p className="text-xl text-purple-200">Select your zodiac sign to reveal your cosmic destiny...</p>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 relative overflow-hidden">
      {/* Header */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
            ✨ Cosmic Horoscope ✨
          </h1>
          <p className="text-xl text-purple-200 italic font-serif">
            Discover Your Celestial Destiny
          </p>
        </div>

        {/* Zodiac Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
          {zodiacSigns.map(sign => (
            <button
              key={sign.name}
              onClick={() => selectZodiac(sign.name)}
              className={`px-4 py-3 rounded-2xl transition-all duration-300 border-2 font-medium ${
                currentSign === sign.name
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
                  : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-yellow-400/50 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30'
              } backdrop-blur-sm`}
              title={sign.dates}
            >
              <span className="text-lg mr-2">{sign.symbol}</span>
              <span className="capitalize">{sign.name}</span>
            </button>
          ))}
        </div>

        {/* Horoscope Content */}
        {currentSign && currentHoroscope ? (
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
            <div className="text-center mb-8">
              <div className="text-8xl mb-4 filter drop-shadow-lg">{currentSignData.symbol}</div>
              <h2 className="text-4xl font-bold text-yellow-300 capitalize mb-2">{currentSign}</h2>
              <p className="text-purple-200 text-lg font-serif">{currentSignData.dates}</p>
            </div>

            {/* Period Tabs */}
            <div className="flex justify-center gap-4 mb-8">
              {['daily', 'monthly', 'yearly'].map(period => (
                <button
                  key={period}
                  onClick={() => setCurrentPeriod(period)}
                  className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold capitalize ${
                    currentPeriod === period
                      ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/50'
                      : 'bg-white/10 text-purple-200 hover:bg-white/20 border border-white/20'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>

            {/* Horoscope Details */}
            <div className="text-purple-100 text-lg leading-relaxed bg-white/5 p-6 rounded-2xl border border-white/10">
              {currentHoroscope[currentPeriod]?.summary || "No horoscope data available"}
            </div>

            {/* Monthly & Yearly Specific Data */}
            {currentPeriod === "monthly" && currentHoroscope.monthly && (
              <>
                <h3 className="text-2xl text-yellow-300 mt-6">Key Dates:</h3>
                <ul className="list-disc pl-6">
                  {currentHoroscope.monthly.key_dates.map((date, index) => (
                    <li key={index}>{date}</li>
                  ))}
                </ul>
              </>
            )}

            {currentPeriod === "yearly" && currentHoroscope.yearly && (
              <>
                <h3 className="text-2xl text-yellow-300 mt-6">Yearly Highlights:</h3>
                <p>{currentHoroscope.yearly.highlights}</p>
                <p>{currentHoroscope.yearly.forecast}</p>
              </>
            )}
          </div>
        ) : (
          <p className="text-purple-200 text-center py-20">🔮 Select your zodiac sign to reveal your cosmic destiny...</p>
        )}
      </div>
    </div>

  );
}

export default App;
// function App() {
//   // State to store horoscope data, selected zodiac sign, and period
//   const [horoscopeData, setHoroscopeData] = useState({});
//   const [currentSign, setCurrentSign] = useState('');
//   const [currentPeriod, setCurrentPeriod] = useState('daily');
//   const [loading, setLoading] = useState(true);

//   // List of zodiac signs with symbols and dates
//   const zodiacSigns = [
//     { name: 'aries', symbol: '♈', dates: 'Mar 21 - Apr 19' },
//     { name: 'taurus', symbol: '♉', dates: 'Apr 20 - May 20' },
//     { name: 'gemini', symbol: '♊', dates: 'May 21 - Jun 20' },
//     { name: 'cancer', symbol: '♋', dates: 'Jun 21 - Jul 22' },
//     { name: 'leo', symbol: '♌', dates: 'Jul 23 - Aug 22' },
//     { name: 'virgo', symbol: '♍', dates: 'Aug 23 - Sep 22' },
//     { name: 'libra', symbol: '♎', dates: 'Sep 23 - Oct 22' },
//     { name: 'scorpio', symbol: '♏', dates: 'Oct 23 - Nov 21' },
//     { name: 'sagittarius', symbol: '♐', dates: 'Nov 22 - Dec 21' },
//     { name: 'capricorn', symbol: '♑', dates: 'Dec 22 - Jan 19' },
//     { name: 'aquarius', symbol: '♒', dates: 'Jan 20 - Feb 18' },
//     { name: 'pisces', symbol: '♓', dates: 'Feb 19 - Mar 20' }
//   ];

//   // Effect hook to load horoscope data on mount
//   useEffect(() => {
//     loadHoroscopeData();
//   }, []);

//   // Corrected function to load horoscope data
//   const loadHoroscopeData = async () => {
//     try {
//       // Fetch horoscope JSON file (update path if necessary)
//       const response = await fetch('/horoscope.json');
//       const data = await response.json();

//       // Initialize sampleData to store formatted data
//       const sampleData = {};

//       // Populate sampleData with structured horoscope info
//       zodiacSigns.forEach(sign => {
//         sampleData[sign.name] = {
//           daily: {
//             summary: `Your cosmic energy today as ${sign.name} brings unique opportunities.`,
//             ratings: {
//               creativity: "Creative energy flows strongly today.",
//               love: "Emotional connections deepen significantly.",
//               business: "Professional opportunities present themselves clearly."
//             }
//           },
//           monthly: {
//             overview: `This month brings significant developments for ${sign.name}.`,
//             key_dates: [
//               `Early month: New opportunities arise for ${sign.name}`,
//               `Mid-month: Important decisions require attention`,
//               `Late month: Results of efforts become visible`,
//               `Month end: Reflection and planning for the next phase`
//             ]
//           },
//           yearly: {
//             highlights: `2024 is a transformative year for ${sign.name}.`,
//             forecast: "Steady progress leads to major achievements by year's end."
//           }
//         };
//       });

//       // Update state with fetched data
//       setHoroscopeData(sampleData);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error loading horoscope data:', error);
//       setLoading(false);
//     }
//   };

//   // Function to set selected zodiac sign and default to daily horoscope
//   const selectZodiac = (signName) => {
//     setCurrentSign(signName);
//     setCurrentPeriod('daily');
//   };

//   // Find the current sign's data from the zodiac list
//   const currentSignData = zodiacSigns.find(s => s.name === currentSign);
//   const currentHoroscope = horoscopeData[currentSign];

//   // Show loading screen until data is ready
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 flex items-center justify-center">
//         <div className="text-white text-xl animate-pulse">Loading cosmic data...</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-blue-900 relative overflow-hidden">
//       {/* Background animation */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute inset-0 bg-stars animate-twinkle"></div>
//       </div>

//       <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-yellow-200 to-yellow-100 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
//             ✨ Cosmic Horoscope ✨
//           </h1>
//           <p className="text-xl text-purple-200 italic font-serif">
//             Discover Your Celestial Destiny
//           </p>
//         </div>

//         {/* Zodiac Selector */}
//         <div className="flex flex-wrap justify-center gap-3 mb-12 p-6 bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl">
//           {zodiacSigns.map(sign => (
//             <button
//               key={sign.name}
//               onClick={() => selectZodiac(sign.name)}
//               className={`px-4 py-3 rounded-2xl transition-all duration-300 border-2 font-medium ${
//                 currentSign === sign.name
//                   ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-purple-900 border-yellow-400 shadow-lg shadow-yellow-400/50 scale-105'
//                   : 'bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-yellow-400/50 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/30'
//               } backdrop-blur-sm`}
//               title={sign.dates}
//             >
//               <span className="text-lg mr-2">{sign.symbol}</span>
//               <span className="capitalize">{sign.name}</span>
//             </button>
//           ))}
//         </div>

//         {/* Horoscope Content */}
//         {currentSign && currentHoroscope ? (
//           <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20 shadow-2xl">
//             <div className="text-center mb-8">
//               <div className="text-8xl mb-4 filter drop-shadow-lg">{currentSignData.symbol}</div>
//               <h2 className="text-4xl font-bold text-yellow-300 capitalize mb-2">{currentSign}</h2>
//               <p className="text-purple-200 text-lg font-serif">{currentSignData.dates}</p>
//             </div>

//             {/* Period Tabs */}
//             <div className="flex justify-center gap-4 mb-8">
//               {['daily', 'monthly', 'yearly'].map(period => (
//                 <button
//                   key={period}
//                   onClick={() => setCurrentPeriod(period)}
//                   className={`px-6 py-3 rounded-xl transition-all duration-300 font-semibold capitalize ${
//                     currentPeriod === period
//                       ? 'bg-gradient-to-r from-blue-500 to-blue-400 text-white shadow-lg shadow-blue-500/50'
//                       : 'bg-white/10 text-purple-200 hover:bg-white/20 border border-white/20'
//                   }`}
//                 >
//                   {period}
//                 </button>
//               ))}
//             </div>
//           </div>
//         ) : (
//           <div className="text-center py-20">
//             <div className="text-2xl text-purple-200 mb-4">🔮</div>
//             <p className="text-xl text-purple-200">Select your zodiac sign to reveal your cosmic destiny...</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default App;
//     <BrowserRouter>
//     <Navbar/>
// <Horoscope/>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {[
//           "aries",
//           "taurus",
//           "gemini",
//           "cancer",
//           "leo",
//           "virgo",
//           "libra",
//           "scorpio",
//           "sagittarius",
//           "capricorn",
//           "aquarius",
//           "pisces",
//         ].map((sign) => (
//           <Route
//             key={sign}
//             path={`/${sign}`}
//             element={<Horoscope sign={sign} />}
//           />
//         ))}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;