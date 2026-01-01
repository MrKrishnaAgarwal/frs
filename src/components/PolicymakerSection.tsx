import { CheckCircle, Target, TrendingUp, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const PolicymakerSection = () => {
  const useCases = [
    {
      icon: Target,
      title: "Scholarship Targeting Beyond Marks",
      description: "Direct support to learners with high readiness potential regardless of board exam performance",
    },
    {
      icon: TrendingUp,
      title: "Early Dropout-Risk Identification",
      description: "Identify and support at-risk learners in Classes 6–10 before they disengage",
    },
    {
      icon: CheckCircle,
      title: "NEP 2020–Aligned Assessment at Scale",
      description: "Measure holistic readiness—academic, skill, and pathway dimensions—across the system",
    },
    {
      icon: MapPin,
      title: "Skill-Readiness Mapping",
      description: "Understand readiness patterns by district and state to inform resource allocation",
    },
  ];

  return (
    <section id="policymakers" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 px-4 py-2 bg-primary/10 text-primary border-primary/20">
              Policymakers
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              FRS for <span className="text-primary">Policymakers</span> (Under NRF)
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Under the <span className="text-primary font-semibold">NRF — National Readiness Framework</span>, FRS enables system-level visibility and early intervention at scale.
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <div
                  key={index}
                  className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3">{useCase.title}</h3>
                  <p className="text-muted-foreground">{useCase.description}</p>
                </div>
              );
            })}
          </div>

          {/* Key Benefit */}
          <div className="mt-12 bg-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-4">System-Level Impact</h3>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                By adopting <span className="text-primary font-semibold">FRS under NRF standards</span>, states and institutions gain:
              </p>
              <ul className="grid md:grid-cols-3 gap-6 mt-8 text-left">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Standardized readiness measurement across geographies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Data-driven resource allocation for support programs</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">Early intervention capabilities for vulnerable learners</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PolicymakerSection;
