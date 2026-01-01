import { BookOpen, Wrench, TrendingUp, Sprout } from "lucide-react";
import { useEffect, useState, cloneElement } from "react";
import { useTranslation } from "react-i18next";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

interface ScoreCategory {
  name: string;
  icon: React.ElementType;
  score: number;
  maxScore: number;
  color: string;
  subcategories: { name: string; score: number; maxScore: number }[];
}

const AnimatedProgress = ({ 
  value, 
  delay = 0,
  color = "hsl(var(--primary))"
}: { 
  value: number; 
  delay?: number;
  color?: string;
}) => {
  const [animatedValue, setAnimatedValue] = useState(0);
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      const duration = 1000;
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setAnimatedValue(value);
          clearInterval(timer);
        } else {
          setAnimatedValue(current);
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isVisible, value, delay]);

  return (
    <div ref={ref} className="h-2 bg-secondary rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-300 ease-out"
        style={{ 
          width: `${animatedValue}%`,
          backgroundColor: color,
          boxShadow: `0 0 10px ${color}50`
        }}
      />
    </div>
  );
};

const getScoreColor = (percentage: number) => {
  if (percentage >= 80) return "hsl(142, 71%, 45%)"; // Green
  if (percentage >= 65) return "hsl(84, 60%, 50%)"; // Light green
  if (percentage >= 50) return "hsl(45, 94%, 53%)"; // Yellow
  if (percentage >= 35) return "hsl(30, 90%, 50%)"; // Orange
  return "hsl(0, 72%, 50%)"; // Red
};

interface ColoredIconProps {
  icon: React.ElementType;
  color: string;
}

const ColoredIcon = ({ icon: Icon, color }: ColoredIconProps) => {
  // Convert HSL to RGB for more reliable mobile rendering
  const hslToRgb = (hslColor: string) => {
    const match = hslColor.match(/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/);
    if (!match) return color;

    const h = parseInt(match[1]) / 360;
    const s = parseInt(match[2]) / 100;
    const l = parseInt(match[3]) / 100;

    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }

    const toHex = (x: number) => {
      const hex = Math.round(x * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `rgb(${Math.round(r * 255)}, ${Math.round(g * 255)}, ${Math.round(b * 255)})`;
  };

  const rgbColor = hslToRgb(color);

  return (
    <Icon
      className="w-5 h-5"
      style={{
        color: rgbColor,
        WebkitTextFillColor: rgbColor,
      }}
    />
  );
};

const ScoreBreakdown = () => {
  const { t } = useTranslation();

  const categories: ScoreCategory[] = [
    {
      name: t("scoreBreakdown.academicFoundation"),
      icon: BookOpen,
      score: 318,
      maxScore: 400,
      color: "hsl(142, 71%, 45%)",
      subcategories: [
        { name: "Class 10 Board", score: 94, maxScore: 100 },
        { name: "Class 12 Board (current)", score: 190, maxScore: 250 },
        { name: "Entrance Exams (CUET)", score: 24, maxScore: 50 },
        { name: "Olympiads / Competitive Exams", score: 10, maxScore: 20 },
      ],
    },
    {
      name: t("scoreBreakdown.skillsCompetencies"),
      icon: Wrench,
      score: 224,
      maxScore: 300,
      color: "hsl(84, 60%, 50%)",
      subcategories: [
        { name: "Core Subject Skills", score: 90, maxScore: 120 },
        { name: "Communication & Soft Skills", score: 64, maxScore: 80 },
        { name: "Technical / Digital Skills", score: 46, maxScore: 60 },
        { name: "Applied Problem Solving", score: 24, maxScore: 40 },
      ],
    },
    {
      name: t("scoreBreakdown.trajectoryMomentum"),
      icon: TrendingUp,
      score: 115,
      maxScore: 150,
      color: "hsl(45, 94%, 53%)",
      subcategories: [
        { name: "Improvement Trajectory", score: 62, maxScore: 80 },
        { name: "Consistency & Attendance", score: 34, maxScore: 40 },
        { name: "Self-Initiated Learning", score: 19, maxScore: 30 },
      ],
    },
    {
      name: t("scoreBreakdown.exposureEnrichment", "Exposure & Enrichment"),
      icon: Sprout,
      score: 101,
      maxScore: 150,
      color: "hsl(30, 90%, 50%)",
      subcategories: [
        { name: "Extracurriculars", score: 36, maxScore: 50 },
        { name: "Community / Volunteering", score: 25, maxScore: 50 },
        { name: "Projects / Internships", score: 40, maxScore: 50 },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="w-1.5 h-6 bg-primary rounded-full animate-pulse" />
        {t("scoreBreakdown.title")}
      </h3>

      <div className="grid gap-4">
        {categories.map((category, categoryIndex) => {
          const percentage = (category.score / category.maxScore) * 100;
          const Icon = category.icon;
          const color = getScoreColor(percentage);

          return (
            <div
              key={category.name}
              className={cn(
                "bg-card border border-border rounded-lg p-5 transition-all duration-300",
                "hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5",
                "transform hover:-translate-y-0.5"
              )}
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center transition-transform duration-300 hover:scale-110 flex-shrink-0"
                    style={{ backgroundColor: `${color}20` }}
                  >
                    <Icon
                      className="w-5 h-5"
                      style={{
                        color,
                        filter: `drop-shadow(0 0 0 ${color})`
                      }}
                    />
                  </div>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </div>
                <div className="text-right">
                  <span 
                    className="text-2xl font-bold tabular-nums"
                    style={{ color }}
                  >
                    {category.score}
                  </span>
                  <span className="text-muted-foreground text-sm"> / {category.maxScore}</span>
                </div>
              </div>

              {/* Animated Progress Bar */}
              <AnimatedProgress 
                value={percentage} 
                delay={categoryIndex * 150}
                color={color}
              />

              {/* Subcategories */}
              <div className="space-y-2 mt-4">
                {category.subcategories.map((sub, subIndex) => {
                  const subPercentage = (sub.score / sub.maxScore) * 100;
                  const subColor = getScoreColor(subPercentage);
                  
                  return (
                    <div 
                      key={sub.name} 
                      className="flex items-center justify-between text-sm group"
                    >
                      <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                        {sub.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full transition-all duration-500"
                            style={{ 
                              width: `${subPercentage}%`,
                              backgroundColor: subColor
                            }}
                          />
                        </div>
                        <span 
                          className="font-medium tabular-nums min-w-[60px] text-right"
                          style={{ color: subColor }}
                        >
                          {sub.score} / {sub.maxScore}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
