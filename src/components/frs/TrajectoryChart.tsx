import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceDot } from "recharts";
import { TrendingUp, Award, Users, Briefcase } from "lucide-react";

const TrajectoryChart = () => {
  const data = [
    { date: "Jan 2024", score: 635 },
    { date: "Jul 2024", score: 690 },
    { date: "Jan 2025", score: 728 },
    { date: "Jan 2026", score: 758 },
  ];

  const milestones = [
    {
      icon: Award,
      title: "Skill certification added",
      description: "Competency validation",
      date: "Mar 2024",
    },
    {
      icon: Users,
      title: "Mentorship session completed",
      description: "Guided growth",
      date: "Sep 2024",
    },
    {
      icon: Briefcase,
      title: "Applied project submitted",
      description: "Applied learning evidence",
      date: "Nov 2025",
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        FRS Trajectory
      </h3>

      {/* Chart */}
      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
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
              }}
              labelStyle={{ color: "hsl(var(--muted-foreground))" }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="hsl(var(--primary))"
              strokeWidth={3}
              dot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                r: 6,
              }}
              activeDot={{
                fill: "hsl(var(--primary))",
                strokeWidth: 2,
                r: 8,
              }}
            />
            {data.map((entry, index) => (
              <ReferenceDot
                key={index}
                x={entry.date}
                y={entry.score}
                r={4}
                fill="hsl(var(--primary))"
                stroke="hsl(var(--background))"
                strokeWidth={2}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Growth indicator */}
      <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-primary/5 border border-primary/20 rounded-lg">
        <TrendingUp className="w-5 h-5 text-primary" />
        <span className="text-foreground">
          <strong className="text-primary">+123 points</strong> improvement over 2 years
        </span>
      </div>

      {/* Milestones */}
      <div>
        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
          Key Milestones
        </h4>
        <div className="space-y-3">
          {milestones.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-secondary/30 rounded-lg"
              >
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{milestone.title}</p>
                  <p className="text-xs text-muted-foreground">{milestone.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{milestone.date}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrajectoryChart;
