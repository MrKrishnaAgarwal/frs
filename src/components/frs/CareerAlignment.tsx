import { Compass, Target, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const CareerAlignment = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        {t("career.title")}
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("career.interestClusters")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary border-0">{t("career.engineering")}</Badge>
            <Badge className="bg-primary/10 text-primary border-0">{t("career.dataScience")}</Badge>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("career.recommendedStreams")}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/30">{t("career.stem")}</Badge>
            <Badge variant="outline" className="border-primary/30">{t("career.appliedSciences")}</Badge>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("career.mentorshipStatus")}</span>
          </div>
          <Badge className="bg-primary/20 text-primary border-0">{t("career.connected")}</Badge>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">{t("career.frsUseCase")}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {t("career.useCaseDescription")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAlignment;