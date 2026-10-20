
import {
  User,
  GraduationCap,
  MapPin,
  CheckCircle,
  Shield,
  Briefcase,
  ExternalLink,
} from "lucide-react";
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
          <p className="text-2xl font-bold text-foreground">
            Asmi Agarwal
          </p>

          <div className="flex items-center gap-2 mt-2">
            <Badge
              variant="outline"
              className="text-xs border-primary/30 text-primary"
            >
              <GraduationCap className="w-3 h-3 mr-1" />
              B.Tech CSE
            </Badge>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Academic and Professional Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Age
            </span>
            <span className="text-sm font-medium text-foreground">
              23 years
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground">
              Degree
            </span>
            <span className="text-sm font-medium text-foreground text-right">
              B.Tech | Computer Science
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <GraduationCap className="w-4 h-4 shrink-0" />
              University
            </span>
            <span className="text-sm font-medium text-foreground text-right max-w-[180px]">
              Vellore Institute of Technology, Vellore
            </span>
          </div>

          <div className="flex items-start justify-between gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Briefcase className="w-4 h-4 shrink-0" />
              Experience
            </span>
            <span className="text-sm font-medium text-foreground text-right max-w-[180px]">
              Software Engineering
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Location
            </span>
            <span className="text-sm font-medium text-foreground text-right">
              India
            </span>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Profile Information */}
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                Education
              </p>
              <p className="text-muted-foreground">
                VIT Vellore · 2021–2025
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2 text-sm">
            <Shield className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-medium text-foreground">
                Professional Profile
              </p>
              <p className="text-muted-foreground">
                LinkedIn profile available
              </p>
            </div>
          </div>
        </div>

        {/* LinkedIn Profile */}
        <a
          href="https://linkedin.com/in/asmiagarwal"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full rounded-md border border-primary/30 px-4 py-2.5 text-sm font-medium text-primary hover:bg-primary/5 transition-colors"
        >
          View LinkedIn Profile
          <ExternalLink className="w-4 h-4" />
        </a>

        {/* Privacy Note */}
        <div className="bg-secondary/50 rounded-lg p-3 mt-4">
          <p className="text-xs text-muted-foreground flex items-start gap-2">
            <Shield className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
            Trust without surveillance. Student information should
            remain private, with professional details shared
            transparently and only when appropriate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
