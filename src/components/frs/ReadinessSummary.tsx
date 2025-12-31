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

  // Generate comprehensive summary text
  const getSummaryText = () => {
    const band = getScoreBand();
    const percentile = getPercentile();
    const strengths = getStrengths();
    const growthAreas = getGrowthAreas();

    // Build strengths sentence
    const strengthsText = strengths.length > 0 
      ? `${studentName} demonstrates ${strengths.join(" and ")}`
      : `${studentName} shows promising foundations`;

    // Build growth areas sentence
    const growthText = growthAreas.length > 0
      ? `Focus areas include ${growthAreas.join(" and ")}.`
      : "";

    if (band === "Future-Ready") {
      return `${strengthsText}, with consistent academic performance reflected in the ${percentile}th percentile standing. The trajectory shows steady improvement across all four pillars — Academics (${readinessData.conceptual.score}/400), Skills (${readinessData.applied.score}/300), Growth (${readinessData.selfDirected.score}/150), and Exposure (101/150). ${growthText} With structured exam preparation and continued project-based learning, ${studentName} is well-positioned for future academic and career pathways, with clear strengths in theoretical understanding and practical application.`;
    }
    
    if (band === "Ready") {
      return `${strengthsText}, positioning in the ${percentile}th percentile. The readiness profile indicates balanced development across conceptual and applied dimensions. ${growthText} With targeted support in competitive preparation and fostering self-directed habits, ${studentName} is on track to achieve stronger future readiness outcomes.`;
    }

    return `${studentName} shows promising foundations across readiness dimensions at the ${percentile}th percentile. The trajectory indicates positive momentum with opportunities for growth across all pillars. ${growthText} With focused guidance and consistent effort, ${studentName} can strengthen overall future readiness positioning.`;
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
