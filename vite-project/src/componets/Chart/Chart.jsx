import React, { useState, useMemo } from "react";
import { calculateNatalChart } from "./chartCalculations";
import { planetInSign, planetInHouse, houseDescriptions } from "./chartInterpretations";
import ChartWheel from "./ChartWheel";
import cities from "../../data/cities";
import "./Chart.css";

const Chart = () => {
  const [birthDate, setBirthDate] = useState("");
  const [birthTime, setBirthTime] = useState("12:00");
  const [citySearch, setCitySearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [chartData, setChartData] = useState(null);
  const [expandedPlanet, setExpandedPlanet] = useState(null);
  const [error, setError] = useState("");

  const filteredCities = useMemo(() => {
    if (!citySearch || citySearch.length < 2) return [];
    const search = citySearch.toLowerCase();
    return cities
      .filter((c) => c.name.toLowerCase().includes(search))
      .slice(0, 8);
  }, [citySearch]);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setCitySearch(`${city.name}, ${city.country}`);
    setShowDropdown(false);
  };

  const handleGenerate = () => {
    setError("");
    if (!birthDate) {
      setError("Please select your birth date.");
      return;
    }
    if (!selectedCity) {
      setError("Please select a birth city from the dropdown.");
      return;
    }

    try {
      const chart = calculateNatalChart(
        birthDate,
        birthTime,
        selectedCity.lat,
        selectedCity.lng
      );
      setChartData(chart);
      setExpandedPlanet(null);
    } catch (err) {
      setError("Error calculating chart. Please check your inputs.");
      console.error(err);
    }
  };

  const togglePlanet = (name) => {
    setExpandedPlanet(expandedPlanet === name ? null : name);
  };

  return (
    <div className="chart-page">
      <div className="chart-header">
        <h1 className="chart-title">Natal Birth Chart</h1>
        <p className="chart-subtitle">
          Enter your birth details to calculate your complete natal chart with
          planet positions, houses, and interpretations.
        </p>
      </div>

      <div className="chart-form-card">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date of Birth</label>
            <input
              type="date"
              className="form-input"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Time of Birth</label>
            <input
              type="time"
              className="form-input"
              value={birthTime}
              onChange={(e) => setBirthTime(e.target.value)}
            />
          </div>
          <div className="form-group city-group">
            <label className="form-label">Birth City</label>
            <input
              type="text"
              className="form-input"
              placeholder="Start typing a city..."
              value={citySearch}
              onChange={(e) => {
                setCitySearch(e.target.value);
                setSelectedCity(null);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
            />
            {showDropdown && filteredCities.length > 0 && (
              <div className="city-dropdown">
                {filteredCities.map((city, i) => (
                  <div
                    key={i}
                    className="city-option"
                    onMouseDown={() => handleCitySelect(city)}
                  >
                    {city.name}, {city.country}
                    <span className="city-coords">
                      {city.lat.toFixed(2)}, {city.lng.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {error && <p className="form-error">{error}</p>}

        <button className="generate-btn" onClick={handleGenerate}>
          Generate Chart
        </button>
      </div>

      {chartData && (
        <div className="chart-results">
          <div className="results-header">
            <h2 className="results-title">Your Natal Chart</h2>
            <p className="results-info">
              {(() => {
                const [y, m, d] = chartData.birthInfo.date.split("-");
                return new Date(y, m - 1, d).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              })()}{" "}
              at {chartData.birthInfo.time} &mdash; {citySearch}
            </p>
          </div>

          {/* Ascendant & MC */}
          <div className="key-points">
            <div className="key-point-card">
              <span className="key-label">Ascendant</span>
              <span className="key-sign">
                {chartData.ascendant.zodiac.sign.symbol}{" "}
                {chartData.ascendant.zodiac.sign.name}
              </span>
              <span className="key-degree">
                {chartData.ascendant.zodiac.display}
              </span>
            </div>
            <div className="key-point-card">
              <span className="key-label">Midheaven (MC)</span>
              <span className="key-sign">
                {chartData.midheaven.zodiac.sign.symbol}{" "}
                {chartData.midheaven.zodiac.sign.name}
              </span>
              <span className="key-degree">
                {chartData.midheaven.zodiac.display}
              </span>
            </div>
            <div className="key-point-card">
              <span className="key-label">Sun Sign</span>
              <span className="key-sign">
                {chartData.planets[0].zodiac.sign.symbol}{" "}
                {chartData.planets[0].zodiac.sign.name}
              </span>
              <span className="key-degree">
                {chartData.planets[0].zodiac.display}
              </span>
            </div>
            <div className="key-point-card">
              <span className="key-label">Moon Sign</span>
              <span className="key-sign">
                {chartData.planets[1].zodiac.sign.symbol}{" "}
                {chartData.planets[1].zodiac.sign.name}
              </span>
              <span className="key-degree">
                {chartData.planets[1].zodiac.display}
              </span>
            </div>
          </div>

          {/* Chart Wheel */}
          <div className="table-card">
            <h3 className="table-title">Chart Wheel</h3>
            <p className="table-info">Tropical Zodiac &bull; Whole Sign Houses</p>
            <ChartWheel chartData={chartData} />
          </div>

          {/* Planet Positions Table */}
          <div className="table-card">
            <h3 className="table-title">Planet Positions</h3>
            <p className="table-info">Zodiac: Tropical</p>
            <div className="table-wrapper">
              <table className="chart-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>Planet</th>
                    <th>Sign</th>
                    <th>Degree</th>
                    <th>House</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.planets.map((planet) => (
                    <tr
                      key={planet.name}
                      className="planet-row"
                      onClick={() => togglePlanet(planet.name)}
                    >
                      <td className="planet-symbol">{planet.symbol}</td>
                      <td className="planet-name">{planet.name}</td>
                      <td className="planet-sign">
                        {planet.zodiac.sign.symbol} {planet.zodiac.sign.name}
                      </td>
                      <td className="planet-degree">
                        {planet.zodiac.display}
                      </td>
                      <td className="planet-house">{planet.house.roman}</td>
                    </tr>
                  ))}
                  <tr className="planet-row asc-row">
                    <td className="planet-symbol">Asc</td>
                    <td className="planet-name">Ascendant</td>
                    <td className="planet-sign">
                      {chartData.ascendant.zodiac.sign.symbol}{" "}
                      {chartData.ascendant.zodiac.sign.name}
                    </td>
                    <td className="planet-degree">
                      {chartData.ascendant.zodiac.display}
                    </td>
                    <td className="planet-house">I</td>
                  </tr>
                  <tr className="planet-row mc-row">
                    <td className="planet-symbol">MC</td>
                    <td className="planet-name">Midheaven</td>
                    <td className="planet-sign">
                      {chartData.midheaven.zodiac.sign.symbol}{" "}
                      {chartData.midheaven.zodiac.sign.name}
                    </td>
                    <td className="planet-degree">
                      {chartData.midheaven.zodiac.display}
                    </td>
                    <td className="planet-house">X</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Houses Table */}
          <div className="table-card">
            <h3 className="table-title">Houses & Rulers</h3>
            <p className="table-info">Whole Sign House System</p>
            <div className="table-wrapper">
              <table className="chart-table">
                <thead>
                  <tr>
                    <th>House</th>
                    <th>Sign</th>
                    <th>Ruler</th>
                    <th>Governs</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.houses.map((house) => (
                    <tr key={house.number}>
                      <td className="house-number">{house.roman}</td>
                      <td className="house-sign">
                        {house.sign.symbol} {house.sign.name}
                      </td>
                      <td className="house-ruler">{house.ruler}</td>
                      <td className="house-desc">
                        {houseDescriptions[house.number]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Aspects Table */}
          <div className="table-card">
            <h3 className="table-title">Aspects</h3>
            <p className="table-info">Major aspects between planets</p>
            <div className="table-wrapper">
              <table className="chart-table">
                <thead>
                  <tr>
                    <th>Planet</th>
                    <th>Aspect</th>
                    <th>Planet</th>
                    <th>Orb</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const ASPECT_DEFS = [
                      { name: "Conjunction", symbol: "\u260C", angle: 0, orb: 8, className: "aspect-conjunction" },
                      { name: "Sextile", symbol: "\u26B9", angle: 60, orb: 6, className: "aspect-sextile" },
                      { name: "Square", symbol: "\u25A1", angle: 90, orb: 8, className: "aspect-square" },
                      { name: "Trine", symbol: "\u25B3", angle: 120, orb: 8, className: "aspect-trine" },
                      { name: "Opposition", symbol: "\u260D", angle: 180, orb: 8, className: "aspect-opposition" },
                    ];
                    const aspects = [];
                    const planets = chartData.planets;
                    for (let i = 0; i < planets.length; i++) {
                      for (let j = i + 1; j < planets.length; j++) {
                        let diff = Math.abs(planets[i].longitude - planets[j].longitude) % 360;
                        if (diff > 180) diff = 360 - diff;
                        for (const asp of ASPECT_DEFS) {
                          const orbDiff = Math.abs(diff - asp.angle);
                          if (orbDiff <= asp.orb) {
                            aspects.push({
                              p1: planets[i],
                              p2: planets[j],
                              aspect: asp,
                              orbDiff: orbDiff,
                            });
                            break;
                          }
                        }
                      }
                    }
                    return aspects.map((a, idx) => (
                      <tr key={idx}>
                        <td>
                          <span className="planet-symbol">{a.p1.symbol}</span> {a.p1.name}
                        </td>
                        <td className={a.aspect.className}>
                          {a.aspect.symbol} {a.aspect.name}
                        </td>
                        <td>
                          <span className="planet-symbol">{a.p2.symbol}</span> {a.p2.name}
                        </td>
                        <td className="planet-degree">
                          {a.orbDiff.toFixed(1)}&deg;
                        </td>
                      </tr>
                    ));
                  })()}
                </tbody>
              </table>
            </div>
          </div>

          {/* Interpretations */}
          <div className="interpretations-section">
            <h3 className="table-title">Chart Interpretations</h3>
            <p className="table-info">
              Click on any placement to read its meaning
            </p>
            <div className="interpretation-cards">
              {chartData.planets.map((planet) => {
                const signText =
                  planetInSign[planet.name]?.[planet.zodiac.sign.name] || "";
                const houseText =
                  planetInHouse[planet.name]?.[planet.house.number] || "";
                const isExpanded = expandedPlanet === planet.name;

                return (
                  <div
                    key={planet.name}
                    className={`interp-card ${isExpanded ? "expanded" : ""}`}
                    onClick={() => togglePlanet(planet.name)}
                  >
                    <div className="interp-header">
                      <span className="interp-symbol">{planet.symbol}</span>
                      <span className="interp-title">
                        {planet.name} in {planet.zodiac.sign.name}
                      </span>
                      <span className="interp-detail">
                        House {planet.house.roman} &bull;{" "}
                        {planet.zodiac.display}
                      </span>
                      <span className="interp-arrow">
                        {isExpanded ? "\u25B2" : "\u25BC"}
                      </span>
                    </div>
                    {isExpanded && (
                      <div className="interp-body">
                        {signText && (
                          <div className="interp-section">
                            <h4>
                              {planet.name} in {planet.zodiac.sign.name}
                            </h4>
                            <p>{signText}</p>
                          </div>
                        )}
                        {houseText && (
                          <div className="interp-section">
                            <h4>
                              {planet.name} in House {planet.house.roman}
                            </h4>
                            <p>{houseText}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chart;
