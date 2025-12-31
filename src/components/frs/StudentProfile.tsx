import { User, GraduationCap, MapPin, Languages, CheckCircle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";

const StudentProfile = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        {t("studentProfile.title")}
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <p className="text-2xl font-bold text-foreground">Krishna Agarwal</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              <CheckCircle className="w-3 h-3 mr-1" />
              {t("studentProfile.status")}
            </Badge>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("studentProfile.ageClass")}</span>
            <span className="text-sm font-medium text-foreground">16 yrs | Class 10</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{t("studentProfile.boardStream")}</span>
            <span className="text-sm font-medium text-foreground">CBSE | Science</span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              {t("studentProfile.school")}
            </span>
            <span className="text-sm font-medium text-foreground text-right max-w-[160px]">
              Delhi Public School Indore
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Languages className="w-4 h-4" />
              {t("studentProfile.languages")}
            </span>
            <span className="text-sm font-medium text-foreground">Hindi, English</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {t("studentProfile.region")}
            </span>
            <span className="text-sm font-medium text-foreground">Madhya Pradesh</span>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Verification Status */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">School + Board Verified</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-muted-foreground">FRS Status: Active</span>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-secondary/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-primary" />
            Trust without surveillance — Identity verification ensures data integrity while protecting student privacy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
