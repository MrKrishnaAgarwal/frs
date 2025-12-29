import { Compass, Target, Users, Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const CareerAlignment = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
        <Compass className="w-5 h-5 text-primary" />
        Career & Pathway Alignment
      </h3>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Interest Clusters</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-primary/10 text-primary border-0">Engineering</Badge>
            <Badge className="bg-primary/10 text-primary border-0">Data Science</Badge>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Recommended Streams</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="border-primary/30">STEM</Badge>
            <Badge variant="outline" className="border-primary/30">Applied Sciences</Badge>
          </div>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Mentorship Status</span>
          </div>
          <Badge className="bg-primary/20 text-primary border-0">Connected</Badge>
        </div>

        <div className="p-4 bg-secondary/30 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Compass className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-foreground">FRS Use Case</span>
          </div>
          <p className="text-sm text-muted-foreground">
            College admissions, scholarships, guidance
          </p>
        </div>
      </div>
    </div>
  );
};

export default CareerAlignment;
