import { Badge } from "@/components/ui/badge";
import { Brain, Wrench, Trophy, Compass } from "lucide-react";
import { useTranslation } from "react-i18next";

const ReadinessTypeAnalysis = () => {
  const { t } = useTranslation();

  const readinessTypes = [
    {
      type: t("readinessAnalysis.conceptualReadiness"),
      level: "strong" as const,
      levelLabel: t("readinessAnalysis.strong"),
      insight: t("readinessAnalysis.conceptualInsight"),
      icon: <Brain className="w-5 h-5" />,
    },
    {
      type: t("readinessAnalysis.appliedReadiness"),
      level: "strong" as const,
      levelLabel: t("readinessAnalysis.strong"),
      insight: t("readinessAnalysis.appliedInsight"),
      icon: <Wrench className="w-5 h-5" />,
    },
    {
      type: t("readinessAnalysis.competitiveReadiness"),
      level: "developing" as const,
      levelLabel: t("readinessAnalysis.developing"),
      insight: t("readinessAnalysis.competitiveInsight"),
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      type: t("readinessAnalysis.selfDirectedReadiness"),
      level: "moderate" as const,
      levelLabel: t("readinessAnalysis.moderate"),
      insight: t("readinessAnalysis.selfDirectedInsight"),
      icon: <Compass className="w-5 h-5" />,
    },
  ];

  const getLevelStyles = (level: string) => {
    switch (level) {
      case "strong":
        return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
      case "developing":
        return "bg-amber-500/10 text-amber-400 border-amber-500/30";
      case "moderate":
        return "bg-blue-500/10 text-blue-400 border-blue-500/30";
      case "emerging":
        return "bg-purple-500/10 text-purple-400 border-purple-500/30";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-foreground mb-1">
          {t("readinessAnalysis.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("readinessAnalysis.subtitle")}
        </p>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-lg border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-secondary/50">
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                {t("readinessAnalysis.readinessType")}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                {t("readinessAnalysis.level")}
              </th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">
                {t("readinessAnalysis.insight")}
              </th>
            </tr>
          </thead>
          <tbody>
            {readinessTypes.map((item, index) => (
              <tr
                key={item.type}
                className={`border-t border-border transition-colors hover:bg-secondary/30 ${
                  index % 2 === 0 ? "bg-background" : "bg-secondary/20"
                }`}
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      {item.icon}
                    </div>
                    <span className="font-medium text-foreground">{item.type}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <Badge variant="outline" className={`${getLevelStyles(item.level)} font-medium`}>
                    {item.levelLabel}
                  </Badge>
                </td>
                <td className="py-4 px-4 text-muted-foreground">{item.insight}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {readinessTypes.map((item) => (
          <div key={item.type} className="bg-secondary/30 border border-border rounded-lg p-4">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-1">{item.type}</h3>
                <Badge variant="outline" className={`${getLevelStyles(item.level)} font-medium`}>
                  {item.levelLabel}
                </Badge>
              </div>
            </div>
            <p className="text-sm text-muted-foreground pl-[52px]">{item.insight}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReadinessTypeAnalysis;