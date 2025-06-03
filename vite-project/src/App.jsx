import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Home from "./componets/Home/Home";
import Horoscope from "./componets/Horoscope/Horoscope";
import Navbar from "./componets/Navbar/Navbar";

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {[
          "aries",
          "taurus",
          "gemini",
          "cancer",
          "leo",
          "virgo",
          "libra",
          "scorpio",
          "sagittarius",
          "capricorn",
          "aquarius",
          "pisces",
        ].map((sign) => (
          <Route
            key={sign}
            path={`/${sign}`}
            element={<Horoscope sign={sign} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;