import { Lightbulb, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";

const ActionableInsights = () => {
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
    <div className="bg-gradient-to-br from-primary/10 via-card to-card border border-primary/20 rounded-lg p-6 md:p-8">
      <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Lightbulb className="w-6 h-6 text-primary" />
        Actionable Insights
      </h3>

      <div className="grid md:grid-cols-3 gap-6">
        {/* What's Working Well */}
        <div className="bg-background/50 border border-border rounded-lg p-5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-primary" />
            What's Working Well
          </h4>
          <ul className="space-y-3">
            {workingWell.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Where Support Helps Most */}
        <div className="bg-background/50 border border-border rounded-lg p-5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-primary" />
            Where Support Helps Most
          </h4>
          <ul className="space-y-3">
            {needsSupport.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground mt-2 flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Next Actions */}
        <div className="bg-primary/5 border border-primary/30 rounded-lg p-5">
          <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <ArrowRight className="w-5 h-5 text-primary" />
            Recommended Next Actions
          </h4>
          <ul className="space-y-3">
            {recommendedActions.map((item, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-foreground">
                <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold flex-shrink-0">
                  {index + 1}
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ActionableInsights;
