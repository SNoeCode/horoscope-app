import * as Astronomy from 'astronomy-engine';

const ZODIAC_SIGNS = [
  { name: 'Aries', symbol: '\u2648', ruler: 'Mars' },
  { name: 'Taurus', symbol: '\u2649', ruler: 'Venus' },
  { name: 'Gemini', symbol: '\u264A', ruler: 'Mercury' },
  { name: 'Cancer', symbol: '\u264B', ruler: 'Moon' },
  { name: 'Leo', symbol: '\u264C', ruler: 'Sun' },
  { name: 'Virgo', symbol: '\u264D', ruler: 'Mercury' },
  { name: 'Libra', symbol: '\u264E', ruler: 'Venus' },
  { name: 'Scorpio', symbol: '\u264F', ruler: 'Pluto' },
  { name: 'Sagittarius', symbol: '\u2650', ruler: 'Jupiter' },
  { name: 'Capricorn', symbol: '\u2651', ruler: 'Saturn' },
  { name: 'Aquarius', symbol: '\u2652', ruler: 'Uranus' },
  { name: 'Pisces', symbol: '\u2653', ruler: 'Neptune' },
];

const PLANET_SYMBOLS = {
  Sun: '\u2609',
  Moon: '\u263D',
  Mercury: '\u263F',
  Venus: '\u2640',
  Mars: '\u2642',
  Jupiter: '\u2643',
  Saturn: '\u2644',
  Uranus: '\u2645',
  Neptune: '\u2646',
  Pluto: '\u2647',
};

const HOUSE_ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export function longitudeToZodiac(longitude) {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const degreeInSign = normalized % 30;
  const degrees = Math.floor(degreeInSign);
  const minutes = Math.floor((degreeInSign - degrees) * 60);
  return {
    sign: ZODIAC_SIGNS[signIndex],
    signIndex,
    degrees,
    minutes,
    totalLongitude: normalized,
    display: `${degrees}\u00B0${minutes.toString().padStart(2, '0')}'`,
  };
}

function getEclipticLongitude(body, astroTime) {
  const vec = Astronomy.GeoVector(body, astroTime, true);
  const ecl = Astronomy.Ecliptic(vec);
  return ((ecl.elon % 360) + 360) % 360;
}

function getMoonLongitude(astroTime) {
  const moon = Astronomy.EclipticGeoMoon(astroTime);
  return ((moon.lon % 360) + 360) % 360;
}

export function calculateAscendant(date, lat, lng) {
  const jd = Astronomy.MakeTime(date);
  const gmst = Astronomy.SiderealTime(jd);
  const lst = ((gmst + lng / 15) % 24 + 24) % 24;
  const lstDeg = lst * 15;
  const obliquity = 23.4393;
  const oblRad = obliquity * Math.PI / 180;
  const latRad = lat * Math.PI / 180;
  const lstRad = lstDeg * Math.PI / 180;

  const y = -Math.cos(lstRad);
  const x = Math.sin(oblRad) * Math.tan(latRad) + Math.cos(oblRad) * Math.sin(lstRad);
  let asc = Math.atan2(y, x) * 180 / Math.PI;
  asc = ((asc % 360) + 360) % 360;
  return asc;
}

export function calculateMidheaven(date, lng) {
  const jd = Astronomy.MakeTime(date);
  const gmst = Astronomy.SiderealTime(jd);
  const lst = ((gmst + lng / 15) % 24 + 24) % 24;
  const lstDeg = lst * 15;
  const obliquity = 23.4393;
  const oblRad = obliquity * Math.PI / 180;
  const lstRad = lstDeg * Math.PI / 180;

  let mc = Math.atan2(Math.sin(lstRad), Math.cos(lstRad) * Math.cos(oblRad)) * 180 / Math.PI;
  mc = ((mc % 360) + 360) % 360;
  return mc;
}

export function calculateHouses(ascLongitude) {
  const ascSignIndex = Math.floor(((ascLongitude % 360) + 360) % 360 / 30);
  const houses = [];
  for (let i = 0; i < 12; i++) {
    const signIndex = (ascSignIndex + i) % 12;
    houses.push({
      number: i + 1,
      roman: HOUSE_ROMAN[i],
      sign: ZODIAC_SIGNS[signIndex],
      cuspDegree: signIndex * 30,
      ruler: ZODIAC_SIGNS[signIndex].ruler,
    });
  }
  return houses;
}

export function getHouseForPlanet(planetLongitude, houses) {
  const normalized = ((planetLongitude % 360) + 360) % 360;
  const planetSignIndex = Math.floor(normalized / 30);

  for (let i = 0; i < 12; i++) {
    const houseSignIndex = ZODIAC_SIGNS.indexOf(houses[i].sign);
    if (houseSignIndex === planetSignIndex) {
      return houses[i];
    }
  }
  return houses[0];
}

export function calculateNatalChart(birthDate, birthTime, lat, lng) {
  const [hours, minutes] = birthTime.split(':').map(Number);

  // Convert local birth time to UTC using longitude-based timezone estimate
  // Each 15° of longitude = 1 hour offset from UTC
  const tzOffsetHours = Math.round(lng / 15);

  // Build UTC date: birth time is local to the birth location
  const [year, month, day] = birthDate.split('-').map(Number);
  const dateObj = new Date(Date.UTC(year, month - 1, day, hours - tzOffsetHours, minutes, 0));

  const planets = [
    { name: 'Sun', body: 'Sun' },
    { name: 'Moon', body: 'Moon' },
    { name: 'Mercury', body: 'Mercury' },
    { name: 'Venus', body: 'Venus' },
    { name: 'Mars', body: 'Mars' },
    { name: 'Jupiter', body: 'Jupiter' },
    { name: 'Saturn', body: 'Saturn' },
    { name: 'Uranus', body: 'Uranus' },
    { name: 'Neptune', body: 'Neptune' },
    { name: 'Pluto', body: 'Pluto' },
  ];

  const astroTime = Astronomy.MakeTime(dateObj);

  const ascLongitude = calculateAscendant(dateObj, lat, lng);
  const mcLongitude = calculateMidheaven(dateObj, lng);
  const houses = calculateHouses(ascLongitude);

  const planetPositions = planets.map((planet) => {
    let longitude;
    if (planet.body === 'Moon') {
      longitude = getMoonLongitude(astroTime);
    } else {
      longitude = getEclipticLongitude(planet.body, astroTime);
    }

    const zodiac = longitudeToZodiac(longitude);
    const house = getHouseForPlanet(longitude, houses);

    return {
      name: planet.name,
      symbol: PLANET_SYMBOLS[planet.name],
      longitude,
      zodiac,
      house,
    };
  });

  const ascendant = {
    longitude: ascLongitude,
    zodiac: longitudeToZodiac(ascLongitude),
    label: 'Ascendant',
    symbol: 'Asc',
  };

  const midheaven = {
    longitude: mcLongitude,
    zodiac: longitudeToZodiac(mcLongitude),
    label: 'Midheaven',
    symbol: 'MC',
  };

  return {
    planets: planetPositions,
    ascendant,
    midheaven,
    houses,
    birthInfo: {
      date: birthDate,
      time: birthTime,
      lat,
      lng,
    },
  };
}

export { ZODIAC_SIGNS, PLANET_SYMBOLS, HOUSE_ROMAN };
