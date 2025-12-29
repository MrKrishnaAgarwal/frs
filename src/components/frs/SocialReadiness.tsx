import { Users, HeartHandshake, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const SocialReadiness = () => {
  const indicators = [
    { 
      icon: Users, 
      label: "Teamwork & Collaboration", 
      value: "Strong",
      color: "text-primary"
    },
    { 
      icon: MessageCircle, 
      label: "Peer Learning Participation", 
      value: "Active",
      color: "text-primary"
    },
    { 
      icon: HeartHandshake, 
      label: "Community Engagement Signals", 
      value: "Positive",
      color: "text-primary"
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Social & Collaborative Readiness
        </h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/30">
          Indicator only
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        Non-scoring behavioral indicators
      </p>

      <div className="space-y-3">
        {indicators.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-secondary/30 rounded-lg"
            >
              <span className="flex items-center gap-2 text-sm text-foreground">
                <Icon className="w-4 h-4 text-muted-foreground" />
                {item.label}
              </span>
              <span className={`text-sm font-medium ${item.color}`}>{item.value}</span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 p-3 bg-secondary/50 rounded-lg">
        <p className="text-xs text-muted-foreground">
          Derived from participation signals, not personal behavior tracking.
        </p>
      </div>
    </div>
  );
};

export default SocialReadiness;
