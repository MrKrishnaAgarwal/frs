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

  return (
    <div className="relative flex flex-col items-center py-4">
      {/* Score Gauge SVG */}
      <div className="relative">
        <svg
          width="240"
          height="160"
          viewBox="0 0 240 160"
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
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d="M 30 140 A 75 75 0 1 1 210 140"
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth="12"
            strokeLinecap="round"
          />
          
          {/* Score arc with gradient */}
          <path
            d="M 30 140 A 75 75 0 1 1 210 140"
            fill="none"
            stroke="url(#scoreGradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference * 0.75}
            strokeDashoffset={animatedOffset}
            filter="url(#glow)"
            className="transition-all duration-100"
          />

          {/* Score markers */}
          {[0, 250, 500, 750, 1000].map((marker, index) => {
            const angle = 180 + (index * 180 / 4);
            const radians = (angle * Math.PI) / 180;
            const x = 120 + 95 * Math.cos(radians);
            const y = 140 + 95 * Math.sin(radians);
            return (
              <text
                key={marker}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-muted-foreground text-[10px] font-medium"
              >
                {marker}
              </text>
            );
          })}
        </svg>

        {/* Score display - centered in gauge */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-4">
          <div 
            className="text-5xl md:text-6xl font-bold tabular-nums transition-colors duration-500"
            style={{ color: scoreColor }}
          >
            {animatedScore}
          </div>
          <div className="text-sm text-muted-foreground mt-1">/ {maxScore}</div>
        </div>
      </div>

      {/* Band display */}
      <div className="mt-6 text-center">
        <div 
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full border animate-pulse"
          style={{ 
            backgroundColor: `${bandInfo.color}20`,
            borderColor: `${bandInfo.color}50`,
          }}
        >
          <span 
            className="text-base font-bold"
            style={{ color: bandInfo.color }}
          >
            {bandInfo.band}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-3 max-w-[200px] leading-relaxed">
          {bandDescription}
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
