import { useEffect, useState } from "react";

interface ScoreGaugeProps {
  score: number;
  maxScore: number;
  band: string;
  bandDescription: string;
}

const ScoreGauge = ({ score, maxScore, band, bandDescription }: ScoreGaugeProps) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = (score / maxScore) * 100;
  const circumference = 2 * Math.PI * 120;
  const strokeDashoffset = circumference - (percentage / 100) * circumference * 0.75;

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
      <svg
        width="280"
        height="220"
        viewBox="0 0 280 220"
        className="transform -rotate-[0deg]"
      >
        {/* Background arc */}
        <path
          d="M 40 180 A 120 120 0 1 1 240 180"
          fill="none"
          stroke="hsl(var(--secondary))"
          strokeWidth="16"
          strokeLinecap="round"
        />
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(0, 72%, 50%)" />
            <stop offset="30%" stopColor="hsl(30, 90%, 50%)" />
            <stop offset="60%" stopColor="hsl(45, 94%, 53%)" />
            <stop offset="100%" stopColor="hsl(120, 60%, 45%)" />
          </linearGradient>
        </defs>

        {/* Score arc */}
        <path
          d="M 40 180 A 120 120 0 1 1 240 180"
          fill="none"
          stroke="url(#scoreGradient)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75}`}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{
            filter: "drop-shadow(0 0 8px hsl(var(--primary) / 0.5))"
          }}
        />

        {/* Score markers */}
        {[0, 250, 500, 750, 1000].map((marker, index) => {
          const angle = -180 + (index * 270 / 4);
          const radians = (angle * Math.PI) / 180;
          const x = 140 + 145 * Math.cos(radians);
          const y = 140 + 145 * Math.sin(radians);
          return (
            <text
              key={marker}
              x={x}
              y={y + 40}
              textAnchor="middle"
              className="fill-muted-foreground text-xs font-medium"
            >
              {marker}
            </text>
          );
        })}
      </svg>

      {/* Score display */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4 text-center">
        <div className="text-7xl md:text-8xl font-bold text-primary tabular-nums">
          {animatedScore}
        </div>
        <div className="text-xl text-muted-foreground mt-1">/ {maxScore}</div>
      </div>

      {/* Band display */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/10 border border-primary/30 rounded-full">
          <span className="text-lg font-bold text-primary">{band}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 max-w-xs">
          {bandDescription}
        </p>
      </div>
    </div>
  );
};

export default ScoreGauge;
