// import { useState, useEffect } from 'react';
import Navbar from './componets/Navbar/Navbar';
import Home from './componets/Home/Home';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Horoscope from './componets/Horoscope/Horoscope';
import { BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import AllTogether from './componets/AllTogether/AllTogether';
import Learn from './componets/Learn/Learn';
import NumCalculator from './componets/NumCalculator/NumCalculator'

function App() {
 
    return (
      <>
    <BrowserRouter>
      
      <Navbar/>
      <Routes>

      <Route path="/" element={<Home />} />

        {/* Route for Horoscope component */}
        <Route path="/horoscope/:sign" element={<Horoscope />} />
        <Route path="/horoscope" element={<AllTogether />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/numerlogy" element={<NumCalculator />} />


      {/* <Horoscope/> */}
      </Routes>
     </BrowserRouter>
      </>
  );
}

export default App;
