import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  band: string;
  bandDescription: string;
}

const getBandInfo = (score: number) => {
  if (score >= 750) {
    return { band: "FUTURE-READY", color: "hsl(142, 71%, 45%)" };
  } else if (score >= 500) {
    return { band: "READY", color: "hsl(84, 60%, 50%)" };
  } else if (score >= 250) {
    return { band: "EMERGING", color: "hsl(45, 94%, 53%)" };
  } else {
    return { band: "DEVELOPING", color: "hsl(0, 72%, 50%)" };
  }
};

const getScoreColor = (score: number) => {
  if (score >= 750) return "hsl(142, 71%, 45%)";
  if (score >= 600) return "hsl(84, 60%, 50%)";
  if (score >= 450) return "hsl(45, 94%, 53%)";
  if (score >= 300) return "hsl(30, 90%, 50%)";
  return "hsl(0, 72%, 50%)";
};

const ScoreGauge = ({ score, maxScore, bandDescription }: ScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  const bandInfo = getBandInfo(score);
  const scoreColor = getScoreColor(score);

  // Arc parameters
  const radius = 80;
  const strokeWidth = 14;
  const centerX = 150;
  const centerY = 120;
  
  // Calculate arc length (180 degrees = half circle)
  const arcLength = Math.PI * radius;
  const filledLength = (percentage / 100) * arcLength;

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = score / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= score) {
        setAnimatedScore(score);
        clearInterval(timer);
      } else {
        setAnimatedScore(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [score]);

  return (
    <div className="relative flex flex-col items-center">
      {/* Score Gauge SVG */}
      <div className="relative w-[300px] h-[200px]">
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          className="overflow-visible"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(0, 72%, 50%)" />
              <stop offset="25%" stopColor="hsl(30, 90%, 50%)" />
              <stop offset="50%" stopColor="hsl(45, 94%, 53%)" />
              <stop offset="75%" stopColor="hsl(84, 60%, 50%)" />
              <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
            </linearGradient>
            <filter id="glowEffect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            fill="none"
            stroke="hsl(var(--secondary))"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
          
          {/* Filled arc with gradient */}
          <path
            d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
            fill="none"
            stroke="url(#gaugeGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={arcLength}
            strokeDashoffset={arcLength - filledLength}
            filter="url(#glowEffect)"
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>

        {/* Score markers - positioned below the gauge */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-between px-2 text-[11px] text-muted-foreground font-medium">
          <span>0</span>
          <span>250</span>
          <span>500</span>
          <span>750</span>
          <span>1000</span>
        </div>

        {/* Score display - centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pb-6">
          <div 
            className="text-6xl md:text-7xl font-bold tabular-nums transition-colors duration-500"
            style={{ color: scoreColor }}
          >
            {animatedScore}
          </div>
          <div className="text-lg text-muted-foreground">/ {maxScore}</div>
        </div>
      </div>

      {/* Band display */}
      <div className="mt-4 text-center">
        <div 
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border"
          style={{ 
            backgroundColor: `${bandInfo.color}20`,
            borderColor: `${bandInfo.color}50`,
          }}
        >
          <span 
            className="text-lg font-bold"
            style={{ color: bandInfo.color }}
          >
            {bandInfo.band}
          </span>
        </div>
        <p className="text-sm text-muted-foreground mt-4 max-w-[250px] leading-relaxed">
          {bandDescription}
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
