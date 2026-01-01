import { FileText, Sparkles } from "lucide-react";

interface ReadinessData {
  conceptual: { level: string; score: number };
  applied: { level: string; score: number };
  competitive: { level: string; score: number };
  selfDirected: { level: string; score: number };
}

interface ReadinessSummaryProps {
  studentName?: string;
  score?: number;
  readinessData?: ReadinessData;
}

const ReadinessSummary = ({ 
  studentName = "Krishna", 
  score = 758,
  readinessData = {
    conceptual: { level: "Strong", score: 318 },
    applied: { level: "Strong", score: 224 },
    competitive: { level: "Developing", score: 101 },
    selfDirected: { level: "Moderate", score: 115 }
  }
}: ReadinessSummaryProps) => {
  
  // Generate dynamic band based on score
  const getScoreBand = () => {
    if (score >= 750) return "Future-Ready";
    if (score >= 500) return "Ready";
    if (score >= 250) return "Emerging";
    return "Developing";
  };

  // Calculate percentile approximation
  const getPercentile = () => {
    return Math.round((score / 1000) * 100);
  };

  // Generate strengths based on readiness data
  const getStrengths = () => {
    const strengths: string[] = [];
    if (readinessData.conceptual.level === "Strong") {
      strengths.push("solid foundational understanding across core subjects");
    }
    if (readinessData.applied.level === "Strong") {
      strengths.push("demonstrated ability to apply knowledge in practical contexts");
    }
    if (readinessData.selfDirected.level === "Moderate" || readinessData.selfDirected.level === "Strong") {
      strengths.push("emerging autonomy in learning");
    }
    return strengths;
  };

  // Generate areas for growth based on readiness data
  const getGrowthAreas = () => {
    const areas: string[] = [];
    if (readinessData.competitive.level === "Developing" || readinessData.competitive.level === "Emerging") {
      areas.push("competitive exam strategies");
    }
    if (readinessData.selfDirected.level === "Moderate" || readinessData.selfDirected.level === "Developing") {
      areas.push("deeper self-driven exploration");
    }
    return areas;
  };

  // Static summary text
  const getSummaryText = () => {
    return "Krishna shows strong academic foundations with steady improvement across academics, skills, growth, and exposure, placing him in the 76th percentile. With focused exam preparation and continued project-based learning, he is well positioned for future academic and career pathways.";
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6 text-primary" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <h2 className="text-xl font-bold text-foreground">
              FRS Readiness Summary
            </h2>
            <div className="flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
              <FileText className="w-3 h-3 text-primary" />
              <span className="text-xs text-primary font-medium">Auto-generated</span>
            </div>
          </div>
          
          <div className="relative">
            {/* Decorative quote marks */}
            <span className="absolute -top-2 -left-2 text-4xl text-primary/20 font-playfair">"</span>
            <p className="text-muted-foreground leading-relaxed pl-4 pr-6 py-2 border-l-2 border-primary/30 italic">
              {getSummaryText()}
            </p>
            <span className="absolute -bottom-4 right-0 text-4xl text-primary/20 font-playfair">"</span>
          </div>

          <div className="mt-6 pt-4 border-t border-border">
            <p className="text-xs text-muted-foreground flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
              This summary is synthesized from all FRS dimensions and is intended as a guidance narrative, not a definitive assessment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadinessSummary;
