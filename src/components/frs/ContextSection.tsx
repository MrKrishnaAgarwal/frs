import { Info, CheckCircle, AlertTriangle } from "lucide-react";

const ContextSection = () => {
  const contextItems = [
    { label: "Learning Support Preferences", status: "Considered", active: true },
    { label: "Financial Aid", status: "Acknowledged", active: true },
    { label: "School Infrastructure Index", status: "Medium", active: true },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Info className="w-5 h-5 text-primary" />
        Context & Support
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        Non-scoring context layer for holistic understanding
      </p>

      <div className="space-y-3">
        {contextItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
          >
            <span className="text-sm text-foreground">{item.label}</span>
            <span className="flex items-center gap-1 text-sm">
              {item.active ? (
                <CheckCircle className="w-4 h-4 text-primary" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
              )}
              <span className="text-muted-foreground">{item.status}</span>
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
        <p className="text-xs text-muted-foreground flex items-start gap-2">
          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
          Context indicators add perspective only — they never reduce or inflate the score.
        </p>
      </div>
    </div>
  );
};

export default ContextSection;
