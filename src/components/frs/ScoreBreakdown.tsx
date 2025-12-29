import { BookOpen, Wrench, TrendingUp, Sprout } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ScoreCategory {
  name: string;
  icon: React.ElementType;
  score: number;
  maxScore: number;
  subcategories: { name: string; score: number; maxScore: number }[];
}

const ScoreBreakdown = () => {
  const categories: ScoreCategory[] = [
    {
      name: "Academic Foundation",
      icon: BookOpen,
      score: 318,
      maxScore: 400,
      subcategories: [
        { name: "Class 10 Board", score: 94, maxScore: 100 },
        { name: "Class 12 Board (current)", score: 190, maxScore: 250 },
        { name: "Entrance Exams (CUET)", score: 24, maxScore: 50 },
        { name: "Olympiads / Competitive Exams", score: 10, maxScore: 20 },
      ],
    },
    {
      name: "Skills & Competencies",
      icon: Wrench,
      score: 224,
      maxScore: 300,
      subcategories: [
        { name: "Core Subject Skills", score: 90, maxScore: 120 },
        { name: "Communication & Soft Skills", score: 64, maxScore: 80 },
        { name: "Technical / Digital Skills", score: 46, maxScore: 60 },
        { name: "Applied Problem Solving", score: 24, maxScore: 40 },
      ],
    },
    {
      name: "Growth & Effort",
      icon: TrendingUp,
      score: 115,
      maxScore: 150,
      subcategories: [
        { name: "Improvement Trajectory", score: 62, maxScore: 80 },
        { name: "Consistency & Attendance", score: 34, maxScore: 40 },
        { name: "Self-Initiated Learning", score: 19, maxScore: 30 },
      ],
    },
    {
      name: "Exposure & Enrichment",
      icon: Sprout,
      score: 101,
      maxScore: 150,
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
        <span className="w-1.5 h-6 bg-primary rounded-full" />
        Score Breakdown
      </h3>

      <div className="grid gap-4">
        {categories.map((category) => {
          const percentage = (category.score / category.maxScore) * 100;
          const Icon = category.icon;

          return (
            <div
              key={category.name}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-semibold text-foreground">{category.name}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-primary">{category.score}</span>
                  <span className="text-muted-foreground text-sm"> / {category.maxScore}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={percentage} className="h-2 mb-4" />

              {/* Subcategories */}
              <div className="space-y-2">
                {category.subcategories.map((sub) => (
                  <div key={sub.name} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{sub.name}</span>
                    <span className="text-foreground font-medium">
                      {sub.score} / {sub.maxScore}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBreakdown;
