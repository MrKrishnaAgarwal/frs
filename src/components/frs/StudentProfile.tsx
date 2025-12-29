import { User, GraduationCap, MapPin, Languages, CheckCircle, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const StudentProfile = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
        <User className="w-5 h-5 text-primary" />
        Student Profile
      </h3>

      <div className="space-y-4">
        {/* Name */}
        <div>
          <p className="text-2xl font-bold text-foreground">Aarav Verma</p>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline" className="text-xs border-primary/30 text-primary">
              <CheckCircle className="w-3 h-3 mr-1" />
              Active
            </Badge>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Details Grid */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Age / Class</span>
            <span className="text-sm font-medium text-foreground">17 yrs | Class 12</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Board / Stream</span>
            <span className="text-sm font-medium text-foreground">CBSE | Science</span>
          </div>

          <div className="flex items-start justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <GraduationCap className="w-4 h-4" />
              School
            </span>
            <span className="text-sm font-medium text-foreground text-right max-w-[160px]">
              Kendriya Vidyalaya, Noida
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Languages className="w-4 h-4" />
              Languages
            </span>
            <span className="text-sm font-medium text-foreground">Hindi, English</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              Region
            </span>
            <span className="text-sm font-medium text-foreground">Uttar Pradesh</span>
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
            Aadhaar never displayed — backend identity mapping only
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
