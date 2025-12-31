import { FileText, Sparkles } from "lucide-react";

interface ReadinessSummaryProps {
  studentName?: string;
  score?: number;
}

const ReadinessSummary = ({ studentName = "Arjun", score = 758 }: ReadinessSummaryProps) => {
  // Generate dynamic summary based on score
  const getScoreBand = () => {
    if (score >= 800) return "Highly Future-Ready";
    if (score >= 650) return "Future-Ready";
    if (score >= 450) return "Progressing";
    return "Emerging";
  };

  const getSummaryText = () => {
    const band = getScoreBand();
    
    if (band === "Highly Future-Ready" || band === "Future-Ready") {
      return `${studentName} demonstrates strong conceptual and applied readiness, with consistent academic performance and growing skill development. Their trajectory shows steady improvement across all four pillars. While competitive readiness is developing, structured exam strategies can bridge this gap. Self-directed learning shows promise but would benefit from periodic nudges. Overall, ${studentName} is well-positioned for future academic and career pathways, with clear strengths in theoretical understanding and practical application.`;
    }
    
    return `${studentName} shows promising foundations across readiness dimensions, with particular strength in applied learning. The trajectory indicates positive momentum, especially in academics and skills development. Focus areas include building exam-specific strategies and fostering more self-directed learning habits. With targeted support and structured guidance, ${studentName} is on track to achieve stronger future readiness outcomes.`;
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
