import { Lightbulb, CheckCircle, AlertCircle, ArrowRight, Sparkles } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { cn } from "@/lib/utils";

const ActionableInsights = () => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>();

  const workingWell = [
    "Strong conceptual grounding in core subjects",
    "Consistent upward improvement trend",
    "High engagement in applied projects",
  ];

  const needsSupport = [
    "Advanced communication confidence",
    "Competitive exam strategy",
    "Career pathway clarity",
  ];

  const recommendedActions = [
    "Add one industry-linked applied project",
    "Enroll in structured mentorship cycle",
    "Activate advanced mock-test mode",
  ];

  return (
    <div 
      ref={ref}
      className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-lg p-6 md:p-8 relative overflow-hidden"
    >
      {/* Animated background glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2 relative z-10">
        <Lightbulb className="w-6 h-6 text-primary animate-pulse" />
        Actionable Insights
        <Sparkles className="w-4 h-4 text-primary/50 ml-2" />
      </h3>

      <div className="grid md:grid-cols-3 gap-6 relative z-10">
        {/* What's Working Well */}
        <div className={cn(
          "bg-background/50 border border-border rounded-lg p-5 transition-all duration-500",
          "hover:border-green-500/30 hover:shadow-lg hover:shadow-green-500/10",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )} style={{ transitionDelay: "0ms" }}>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            What's Working Well
          </h4>
          <ul className="space-y-3">
            {workingWell.map((item, index) => (
              <li 
                key={index} 
                className={cn(
                  "flex items-start gap-2 text-sm text-muted-foreground transition-all duration-300",
                  "hover:text-foreground"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0 animate-pulse" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Where Support Helps Most */}
        <div className={cn(
          "bg-background/50 border border-border rounded-lg p-5 transition-all duration-500",
          "hover:border-yellow-500/30 hover:shadow-lg hover:shadow-yellow-500/10",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )} style={{ transitionDelay: "150ms" }}>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-500" />
            Where Support Helps Most
          </h4>
          <ul className="space-y-3">
            {needsSupport.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Next Actions */}
        <div className={cn(
          "bg-primary/5 border border-primary/30 rounded-lg p-5 transition-all duration-500",
          "hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )} style={{ transitionDelay: "300ms" }}>
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary animate-bounce" />
            Recommended Next Actions
          </h4>
          <ul className="space-y-3">
            {recommendedActions.map((item, index) => (
              <li 
                key={index} 
                className="flex items-start gap-2 text-sm text-foreground group cursor-default"
              >
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0 group-hover:scale-110 transition-transform">
                  {index + 1}
                </span>
                <span className="group-hover:text-primary transition-colors">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionableInsights;
