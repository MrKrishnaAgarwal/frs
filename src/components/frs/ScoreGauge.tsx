import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  band: string;
  bandDescription: string;
}

const getBandInfo = (score: number) => {
  if (score >= 750) {
    return { band: "FUTURE-READY", color: "hsl(142, 71%, 45%)" }; // Green
  } else if (score >= 500) {
    return { band: "READY", color: "hsl(84, 60%, 50%)" }; // Light green
  } else if (score >= 250) {
    return { band: "EMERGING", color: "hsl(45, 94%, 53%)" }; // Yellow/Orange
  } else {
    return { band: "DEVELOPING", color: "hsl(0, 72%, 50%)" }; // Red
  }
};

const getScoreColor = (score: number) => {
  if (score >= 750) return "hsl(142, 71%, 45%)"; // Green
  if (score >= 600) return "hsl(84, 60%, 50%)"; // Light green
  if (score >= 450) return "hsl(45, 94%, 53%)"; // Yellow
  if (score >= 300) return "hsl(30, 90%, 50%)"; // Orange
  return "hsl(0, 72%, 50%)"; // Red
};

const ScoreGauge = ({ score, maxScore, bandDescription }: ScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const [animatedOffset, setAnimatedOffset] = useState(471);
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 75;
  const targetOffset = circumference - (percentage / 100) * circumference * 0.75;
  const bandInfo = getBandInfo(score);
  const scoreColor = getScoreColor(score);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    const offsetIncrement = (471 - targetOffset) / steps;
    let current = 0;
    let currentOffset = 471;
    
    const timer = setInterval(() => {
      current += increment;
      currentOffset -= offsetIncrement;
      
      if (current >= score) {
        setAnimatedScore(score);
        setAnimatedOffset(targetOffset);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
        setAnimatedOffset(currentOffset);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score, targetOffset]);

  // Marker positions - calculated for a 180-degree arc
  const markers = [
    { value: 0, angle: 180 },
    { value: 250, angle: 225 },
    { value: 500, angle: 270 },
    { value: 750, angle: 315 },
    { value: 1000, angle: 360 },
  ];

  return (
    <div className="relative flex flex-col items-center py-6">
      {/* Score Gauge SVG */}
      <div className="relative">
        <svg
          width="280"
          height="180"
          viewBox="0 0 280 180"
          className="overflow-visible"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="scoreGradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 72%, 50%)" />
              <stop offset="25%" stopColor="hsl(30, 90%, 50%)" />
              <stop offset="50%" stopColor="hsl(45, 94%, 53%)" />
              <stop offset="75%" stopColor="hsl(84, 60%, 50%)" />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background arc - centered at (140, 150) with radius 90 */}
          <path
            d="M 50 150 A 90 90 0 0 1 230 150"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="14"
            strokeLinecap="round"
          />
          
          {/* Score arc with gradient */}
          <path
            d="M 50 150 A 90 90 0 0 1 230 150"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="14"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.5}
            strokeDashoffset={circumference * 0.5 - (percentage / 100) * circumference * 0.5}
            filter="url(#glow)"
            className="transition-all duration-100"
          />

          {/* Score markers - positioned outside the arc */}
          {markers.map((marker) => {
            const radians = (marker.angle * Math.PI) / 180;
            const radius = 115; // Outside the arc
            const x = 140 + radius * Math.cos(radians);
            const y = 150 + radius * Math.sin(radians);
            
            return (
              <text
                key={marker.value}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[11px] font-medium"
              >
                {marker.value}
              </text>
            );
          })}
        </svg>

        {/* Score display - centered in the arc */}
        <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ paddingTop: '60px' }}>
          <div
            className="text-5xl md:text-6xl font-bold tabular-nums transition-colors duration-500"
            style={{ color: scoreColor }}
          >
            {animatedScore}
          </div>
          <div className="text-base text-muted-foreground mt-2">/ {maxScore}</div>
        </div>
      </div>

      {/* Band display */}
      <div className="mt-8 text-center">
        <div 
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full"
          style={{ 
            backgroundColor: bandInfo.color,
          }}
        >
          <span 
            className="text-base font-bold text-white"
          >
            {bandInfo.band}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-3 max-w-[220px] leading-relaxed">
          {bandDescription}
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
