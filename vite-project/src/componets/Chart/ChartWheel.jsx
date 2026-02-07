import React from "react";

const SIZE = 600;
const CX = SIZE / 2;
const CY = SIZE / 2;
const NAME_R = 280;
const OUTER_R = 255;
const ZODIAC_R = 225;
const INNER_R = 195;
const PLANET_R = 165;
const HOUSE_R = 100;
const ASPECT_R = INNER_R - 8;

const ZODIAC_GLYPHS = [
  "\u2648", "\u2649", "\u264A", "\u264B", "\u264C", "\u264D",
  "\u264E", "\u264F", "\u2650", "\u2651", "\u2652", "\u2653",
];

const ZODIAC_NAMES = [
  "ARIES", "TAURUS", "GEMINI", "CANCER", "LEO", "VIRGO",
  "LIBRA", "SCORPIO", "SAGITTARIUS", "CAPRICORN", "AQUARIUS", "PISCES",
];

// Aspect definitions - tighter orbs for cleaner display
const ASPECTS = [
  { name: "Conjunction", angle: 0, orb: 8, color: "#fbbf24", dash: "" },
  { name: "Sextile", angle: 60, orb: 4, color: "#60a5fa", dash: "6,4" },
  { name: "Square", angle: 90, orb: 6, color: "#ef4444", dash: "" },
  { name: "Trine", angle: 120, orb: 6, color: "#4ade80", dash: "" },
  { name: "Opposition", angle: 180, orb: 6, color: "#c084fc", dash: "" },
];

function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = degToRad(angleDeg);
  return {
    x: cx + r * Math.cos(rad),
    y: cy - r * Math.sin(rad),
  };
}

function angleDiff(a, b) {
  let d = Math.abs(a - b) % 360;
  if (d > 180) d = 360 - d;
  return d;
}

function calculateAspects(planets) {
  const aspects = [];
  for (let i = 0; i < planets.length; i++) {
    for (let j = i + 1; j < planets.length; j++) {
      const diff = angleDiff(planets[i].longitude, planets[j].longitude);
      for (const aspect of ASPECTS) {
        const orbDiff = Math.abs(diff - aspect.angle);
        if (orbDiff <= aspect.orb) {
          aspects.push({
            planet1: planets[i],
            planet2: planets[j],
            aspect: aspect,
            exactness: orbDiff,
          });
          break;
        }
      }
    }
  }
  return aspects;
}

// Create arc path for curved text
function describeArc(cx, cy, r, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  // SVG arc goes clockwise when sweep=1, but our angles go counter-clockwise
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 0 ${end.x} ${end.y}`;
}

const ChartWheel = ({ chartData }) => {
  if (!chartData) return null;

  const ascLon = chartData.ascendant.longitude;

  // Convert ecliptic longitude to chart angle (Ascendant = left/180deg)
  function lonToAngle(lon) {
    return (((ascLon - lon + 180) % 360) + 360) % 360;
  }

  const textColor = "var(--text-primary, #fff)";
  const dimTextColor = "var(--text-secondary, rgba(255,255,255,0.5))";
  const lineColor = "var(--card-border, rgba(255,255,255,0.3))";
  const accent = "var(--accent, #fbbf24)";
  const bgColor = "var(--card-bg, rgba(255,255,255,0.05))";

  // ── Zodiac sign segments with names ──
  const zodiacSegments = [];
  for (let i = 0; i < 12; i++) {
    const signStartLon = i * 30;
    const startAngle = lonToAngle(signStartLon);
    const endAngle = lonToAngle(signStartLon + 30);

    // Divider line from zodiac ring to outer
    const p1 = polarToCartesian(CX, CY, ZODIAC_R, startAngle);
    const p2 = polarToCartesian(CX, CY, OUTER_R, startAngle);
    zodiacSegments.push(
      <line key={`zs-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
        stroke={lineColor} strokeWidth="0.5" />
    );

    // Sign glyph in zodiac band
    const midAngle = lonToAngle(signStartLon + 15);
    const gp = polarToCartesian(CX, CY, (ZODIAC_R + OUTER_R) / 2, midAngle);
    zodiacSegments.push(
      <text key={`zg-${i}`} x={gp.x} y={gp.y}
        textAnchor="middle" dominantBaseline="central"
        fill={textColor} fontSize="14" fontFamily="serif">
        {ZODIAC_GLYPHS[i]}
      </text>
    );

    // Sign name outside the wheel
    const namePos = polarToCartesian(CX, CY, NAME_R, midAngle);
    // Rotate text to follow the circle
    let rotation = -midAngle;
    // Flip text that would be upside down
    if (midAngle > 90 && midAngle < 270) {
      rotation = -midAngle + 180;
    }
    zodiacSegments.push(
      <text key={`zn-${i}`} x={namePos.x} y={namePos.y}
        textAnchor="middle" dominantBaseline="central"
        fill={dimTextColor} fontSize="9" fontFamily="sans-serif"
        fontWeight="600" letterSpacing="1.5"
        transform={`rotate(${rotation}, ${namePos.x}, ${namePos.y})`}>
        {ZODIAC_NAMES[i]}
      </text>
    );
  }

  // ── House lines and numbers ──
  const houseElements = [];
  for (let i = 0; i < 12; i++) {
    const house = chartData.houses[i];
    const angle = lonToAngle(house.cuspDegree);
    const isAxis = i === 0 || i === 3 || i === 6 || i === 9;

    const r1 = isAxis ? HOUSE_R - 10 : HOUSE_R;
    const r2 = isAxis ? OUTER_R + 8 : INNER_R;
    const p1 = polarToCartesian(CX, CY, r1, angle);
    const p2 = polarToCartesian(CX, CY, r2, angle);

    houseElements.push(
      <line key={`hl-${i}`} x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
        stroke={isAxis ? accent : lineColor}
        strokeWidth={isAxis ? "2" : "0.8"} />
    );

    // House number
    const nextAngle = lonToAngle(chartData.houses[(i + 1) % 12].cuspDegree);
    let mid = (angle + nextAngle) / 2;
    if (Math.abs(angle - nextAngle) > 180) {
      mid = ((angle + nextAngle + 360) / 2) % 360;
    }
    const np = polarToCartesian(CX, CY, (HOUSE_R + INNER_R) / 2, mid);
    houseElements.push(
      <text key={`hn-${i}`} x={np.x} y={np.y}
        textAnchor="middle" dominantBaseline="central"
        fill={textColor} fontSize="11" opacity="0.5"
        fontFamily="serif" fontStyle="italic">
        {house.roman}
      </text>
    );
  }

  // ── Axis labels ──
  const axisLabels = [];
  const axisData = [
    { label: "ASC", lon: ascLon },
    { label: "DSC", lon: (ascLon + 180) % 360 },
    { label: "MC", lon: chartData.midheaven.longitude },
    { label: "IC", lon: (chartData.midheaven.longitude + 180) % 360 },
  ];
  axisData.forEach(({ label, lon }) => {
    const pos = polarToCartesian(CX, CY, OUTER_R + 18, lonToAngle(lon));
    axisLabels.push(
      <text key={`ax-${label}`} x={pos.x} y={pos.y}
        textAnchor="middle" dominantBaseline="central"
        fill={accent} fontSize="11" fontWeight="bold" fontFamily="sans-serif">
        {label}
      </text>
    );
  });

  // ── Planet placement with collision avoidance ──
  const planetsWithAngles = chartData.planets.map((p) => ({
    ...p,
    chartAngle: lonToAngle(p.longitude),
    displayAngle: lonToAngle(p.longitude),
  }));
  planetsWithAngles.sort((a, b) => a.chartAngle - b.chartAngle);

  // Multi-pass nudge
  const MIN_GAP = 14;
  for (let pass = 0; pass < 5; pass++) {
    for (let i = 0; i < planetsWithAngles.length; i++) {
      for (let j = i + 1; j < planetsWithAngles.length; j++) {
        let diff = Math.abs(planetsWithAngles[i].displayAngle - planetsWithAngles[j].displayAngle);
        if (diff > 180) diff = 360 - diff;
        if (diff < MIN_GAP) {
          const nudge = (MIN_GAP - diff) / 2;
          planetsWithAngles[i].displayAngle = ((planetsWithAngles[i].displayAngle - nudge) % 360 + 360) % 360;
          planetsWithAngles[j].displayAngle = (planetsWithAngles[j].displayAngle + nudge) % 360;
        }
      }
    }
  }

  const planetElements = [];
  planetsWithAngles.forEach((planet) => {
    // Tick mark at exact position on inner ring
    const tickIn = polarToCartesian(CX, CY, INNER_R - 2, planet.chartAngle);
    const tickOut = polarToCartesian(CX, CY, INNER_R + 5, planet.chartAngle);
    planetElements.push(
      <line key={`pt-${planet.name}`}
        x1={tickIn.x} y1={tickIn.y} x2={tickOut.x} y2={tickOut.y}
        stroke={accent} strokeWidth="1.5" />
    );

    // Connecting line from tick to planet glyph (if nudged)
    const diff = Math.abs(planet.chartAngle - planet.displayAngle);
    if (diff > 2 && diff < 358) {
      const lineStart = polarToCartesian(CX, CY, INNER_R + 5, planet.chartAngle);
      const lineEnd = polarToCartesian(CX, CY, PLANET_R + 10, planet.displayAngle);
      planetElements.push(
        <line key={`pc-${planet.name}`}
          x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y}
          stroke={lineColor} strokeWidth="0.5" />
      );
    }

    // Planet glyph
    const pos = polarToCartesian(CX, CY, PLANET_R, planet.displayAngle);
    planetElements.push(
      <text key={`ps-${planet.name}`} x={pos.x} y={pos.y}
        textAnchor="middle" dominantBaseline="central"
        fill={textColor} fontSize="16" fontWeight="bold" fontFamily="serif">
        {planet.symbol}
      </text>
    );

    // Degree label
    const lp = polarToCartesian(CX, CY, PLANET_R - 18, planet.displayAngle);
    planetElements.push(
      <text key={`pd-${planet.name}`} x={lp.x} y={lp.y}
        textAnchor="middle" dominantBaseline="central"
        fill={textColor} fontSize="7" opacity="0.6" fontFamily="monospace">
        {planet.zodiac.display}
      </text>
    );
  });

  // ── Aspect lines in the center ──
  const aspects = calculateAspects(chartData.planets);
  const aspectLines = [];

  // Sort so squares and oppositions draw on top (last)
  const sortedAspects = [...aspects].sort((a, b) => {
    const priority = { Sextile: 0, Trine: 1, Conjunction: 2, Opposition: 3, Square: 4 };
    return (priority[a.aspect.name] || 0) - (priority[b.aspect.name] || 0);
  });

  sortedAspects.forEach((a, idx) => {
    // Skip conjunctions in the wheel (they'd just be a dot)
    if (a.aspect.angle === 0) return;

    const angle1 = lonToAngle(a.planet1.longitude);
    const angle2 = lonToAngle(a.planet2.longitude);
    const p1 = polarToCartesian(CX, CY, ASPECT_R, angle1);
    const p2 = polarToCartesian(CX, CY, ASPECT_R, angle2);

    const isHardAspect = a.aspect.name === "Square" || a.aspect.name === "Opposition";
    const opacity = isHardAspect ? 0.9 : Math.max(0.5, 1 - a.exactness / a.aspect.orb);
    const width = isHardAspect ? 2.5 : (a.exactness < 2 ? 1.5 : 1);

    const lineProps = {
      key: `asp-${idx}`,
      x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
      stroke: a.aspect.color,
      strokeWidth: width,
      opacity: opacity,
    };
    if (a.aspect.dash) {
      lineProps.strokeDasharray = a.aspect.dash;
    }

    aspectLines.push(<line {...lineProps} />);
  });

  // ── Aspect legend ──
  const legendY = SIZE - 10;
  const legendItems = [
    { name: "Square", color: "#ef4444", dash: "" },
    { name: "Opposition", color: "#c084fc", dash: "" },
    { name: "Trine", color: "#4ade80", dash: "" },
    { name: "Sextile", color: "#60a5fa", dash: "6,4" },
    { name: "Conjunction", color: "#fbbf24", dash: "" },
  ];

  return (
    <div className="chart-wheel-container">
      <svg
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        width="100%"
        style={{ maxWidth: "600px", margin: "0 auto", display: "block" }}
      >
        {/* Background circle */}
        <circle cx={CX} cy={CY} r={OUTER_R} fill={bgColor} stroke={lineColor} strokeWidth="1.5" />
        <circle cx={CX} cy={CY} r={ZODIAC_R} fill="none" stroke={lineColor} strokeWidth="1" />
        <circle cx={CX} cy={CY} r={INNER_R} fill="none" stroke={lineColor} strokeWidth="1" />
        <circle cx={CX} cy={CY} r={HOUSE_R} fill="none" stroke={lineColor} strokeWidth="0.5" />

        {/* Zodiac */}
        {zodiacSegments}

        {/* Houses */}
        {houseElements}

        {/* Aspect lines */}
        {aspectLines}

        {/* Axis labels */}
        {axisLabels}

        {/* Planets */}
        {planetElements}

        {/* Legend */}
        {legendItems.map((item, i) => {
          const lx = 40 + i * 112;
          const lineProps = {
            x1: lx, y1: legendY, x2: lx + 20, y2: legendY,
            stroke: item.color, strokeWidth: "2.5",
          };
          if (item.dash) {
            lineProps.strokeDasharray = item.dash;
          }
          return (
            <g key={`leg-${i}`}>
              <line {...lineProps} />
              <text x={lx + 24} y={legendY} fill={textColor}
                fontSize="9" dominantBaseline="central" opacity="0.7"
                fontFamily="sans-serif">
                {item.name}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default ChartWheel;
