import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./componets/Navbar/Navbar";
import Home from "./componets/Home/Home";
import Horoscope from "./componets/Horoscope/Horoscope";
import Learn from "./componets/Learn/Learn";
import NumCalculator from "./componets/NumCalculator/NumCalculator";
import GetSign from "./componets/GetSign/GetSign";
import Footer from "./componets/Footer/Footer";
import LifePath from "./componets/LifePath/LifePath";
import Chart from "./componets/Chart/Chart";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/horoscope" element={<GetSign />} />
          <Route path="/horoscope/:sign" element={<HoroscopeWrapper />} />

          <Route path="/learn" element={<Learn />} />
          <Route path="/chart" element={<Chart />} />

          <Route path="/numerology" element={<NumCalculator />} />
          <Route
            path="/numerology/results/:results"
            element={<NumerologyResultsWrapper />}
          />

          <Route
            path="/lifepath/:lifePathNumber"
            element={<LifePathWrapper />}
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

const HoroscopeWrapper = () => {
  const { sign } = useParams();
  return <Horoscope selectedSign={sign} />;
};

const LifePathWrapper = () => {
  const { lifePathNumber } = useParams();
  return <LifePath lifePathNumber={lifePathNumber} />;
};

const NumerologyResultsWrapper = () => {
  const { results } = useParams();
  const parsedResults = JSON.parse(decodeURIComponent(results));
  return <NumCalculator results={parsedResults} />;
};

export default App;
