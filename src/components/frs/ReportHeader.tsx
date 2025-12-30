import { Badge } from "@/components/ui/badge";
import { Shield, Calendar, CheckCircle, Info } from "lucide-react";
import { useTranslation } from "react-i18next";

interface ReportHeaderProps {
  frsId: string;
}

const ReportHeader = ({ frsId }: ReportHeaderProps) => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6 md:p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left side - Title and description */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">
              {t("header.futureReadyScore").split(" (")[0]}
            </h1>
            <span className="text-2xl md:text-3xl font-bold text-primary">(0–1000)</span>
          </div>
          <p className="text-muted-foreground">
            {t("header.holisticReadiness")}
          </p>
        </div>

        {/* Right side - Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            <Shield className="w-3 h-3 mr-1" />
            {t("badges.nepAligned")}
          </Badge>
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            <Info className="w-3 h-3 mr-1" />
            {t("badges.explainable")}
          </Badge>
          <Badge variant="outline" className="border-primary/30 bg-primary/5 text-primary">
            <Shield className="w-3 h-3 mr-1" />
            {t("badges.privacyFirst")}
          </Badge>
        </div>
      </div>

      <div className="h-px bg-border my-6" />

      {/* Meta information */}
      <div className="flex flex-wrap gap-6 text-sm">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">{t("report.frsId")}:</span>
          <code className="px-2 py-1 bg-secondary rounded text-foreground font-mono text-xs">
            {frsId}
          </code>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          <span className="text-muted-foreground">{t("report.lastUpdated")}:</span>
          <span className="text-foreground font-medium">15 Jan 2026</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          <span className="text-muted-foreground">{t("report.consentStatus")}:</span>
          <span className="text-primary font-medium">Student / Guardian Approved</span>
        </div>
      </div>
    </div>
  );
};

export default ReportHeader;
