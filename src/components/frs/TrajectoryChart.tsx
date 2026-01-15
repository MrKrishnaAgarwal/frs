import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "recharts";
import { TrendingUp, Award, Users, Briefcase, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";

const TrajectoryChart = () => {
  const { t } = useTranslation();
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [showMilestones, setShowMilestones] = useState(false);

  const data = [
    { date: "Jan 2024", score: 635 },
    { date: "Jul 2024", score: 690 },
    { date: "Jan 2025", score: 728 },
    { date: "Jan 2026", score: 758 },
  ];

  const milestones = [
    {
      icon: Award,
      title: t("trajectory.skillCertificationAdded"),
      description: t("trajectory.competencyValidation"),
      date: "Mar 2024",
    },
    {
      icon: Users,
      title: t("trajectory.mentorshipSessionCompleted"),
      description: t("trajectory.guidedGrowth"),
      date: "Sep 2024",
    },
    {
      icon: Briefcase,
      title: t("trajectory.appliedProjectSubmitted"),
      description: t("trajectory.appliedLearningEvidence"),
      date: "Nov 2025",
    },
  ];

  useEffect(() => {
    if (!isVisible) return;
    
    // Animate points counter
    const duration = 1500;
    const steps = 40;
    const increment = 123 / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= 123) {
        setAnimatedPoints(123);
        clearInterval(timer);
      } else {
        setAnimatedPoints(Math.floor(current));
      }
    }, duration / steps);

    // Show milestones after a delay
    const milestoneTimer = setTimeout(() => {
      setShowMilestones(true);
    }, 500);

    return () => {
      clearInterval(timer);
      clearTimeout(milestoneTimer);
    };
  }, [isVisible]);

  return (
    <div ref={ref} className="bg-card border border-border rounded-lg p-6 overflow-hidden">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary animate-pulse" />
        {t("trajectory.title")}
        <Sparkles className="w-4 h-4 text-primary/50 ml-auto animate-bounce" />
      </h3>

      {/* Chart */}
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="hsl(30, 90%, 50%)" />
                <stop offset="50%" stopColor="hsl(45, 94%, 53%)" />
                <stop offset="100%" stopColor="hsl(142, 71%, 45%)" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="date"
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              fontSize={12}
              tickLine={false}
              domain={[600, 800]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                color: "hsl(var(--foreground))",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)"
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="url(#lineGradient)"
              strokeWidth={3}
              fill="url(#scoreGradient)"
              animationDuration={2000}
              animationBegin={0}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 3,
                r: 6,
                stroke: "hsl(var(--background))",
              }}
              activeDot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 3,
                r: 10,
                stroke: "hsl(var(--background))",
                className: "animate-pulse"
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Growth indicator */}
      <div className={cn(
        "flex items-center justify-center gap-3 mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg",
        "transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}>
        <TrendingUp className="w-5 h-5 text-primary animate-bounce" />
        <span className="text-foreground">
          <strong className="text-primary text-xl tabular-nums">+{animatedPoints} {t("trajectory.pointsImprovement")}</strong>
          <span className="ml-2">{t("trajectory.over2Years")}</span>
        </span>
      </div>

      {/* Milestones */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          {t("trajectory.keyMilestones")}
        </h4>
        <div className="space-y-3">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-3 p-3 bg-secondary/30 rounded-lg",
                  "transition-all duration-500 hover:bg-secondary/50 hover:scale-[1.01]",
                  "transform cursor-default",
                  showMilestones ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                  <p className="text-xs text-muted-foreground">{milestone.description}</p>
                </div>
                <span className="text-xs text-muted-foreground bg-background/50 px-2 py-1 rounded">
                  {milestone.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrajectoryChart;