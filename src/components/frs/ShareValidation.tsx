import { Share2, Building2, Award, GraduationCap, Users, CheckCircle } from "lucide-react";

const ShareValidation = () => {
  const shareTargets = [
    { icon: Building2, label: "Colleges & Universities" },
    { icon: Award, label: "Scholarship Bodies" },
    { icon: GraduationCap, label: "Schools" },
    { icon: Users, label: "Mentors" },
  ];

  const sources = ["CBSE", "DigiLocker", "Skill India", "School Records"];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <Share2 className="w-5 h-5 text-primary" />
        Share & Validation
      </h3>

      <p className="text-sm text-muted-foreground mb-4">
        This FRS may be shared (with consent) with:
      </p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {shareTargets.map((target, index) => {
          const Icon = target.icon;
          return (
            <div
              key={index}
              className="flex items-center gap-2 p-3 bg-secondary/30 rounded-lg"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-sm text-foreground">{target.label}</span>
            </div>
          );
        })}
      </div>

      <div className="border-t border-border pt-4">
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-primary" />
          Verification Sources
        </p>
        <div className="flex flex-wrap gap-2">
          {sources.map((source, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {source}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShareValidation;
