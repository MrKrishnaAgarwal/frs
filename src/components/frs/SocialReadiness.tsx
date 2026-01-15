import { Users, HeartHandshake, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const SocialReadiness = () => {
  const { t } = useTranslation();

  const indicators = [
    { 
      icon: Users, 
      label: t("social.teamworkCollaboration"), 
      value: t("social.strong"),
      color: "text-primary"
    },
    { 
      icon: MessageCircle, 
      label: t("social.peerLearning"), 
      value: t("social.active"),
      color: "text-primary"
    },
    { 
      icon: HeartHandshake, 
      label: t("social.communityEngagement"), 
      value: t("social.positive"),
      color: "text-primary"
    },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          {t("social.title")}
        </h3>
        <Badge variant="outline" className="text-xs border-muted-foreground/30">
          {t("social.indicatorOnly")}
        </Badge>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {t("social.description")}
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
          {t("social.derivedNote")}
        </p>
      </div>
    </div>
  );
};

export default SocialReadiness;