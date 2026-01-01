import { Lock, Eye, UserCheck, FileText, Shield } from "lucide-react";

const TrustAndEthics = () => {
  const principles = [
    {
      icon: Lock,
      title: "Student-Controlled Sharing",
      description: "Learners decide who sees their data. No exceptions.",
    },
    {
      icon: Eye,
      title: "Summary by Default",
      description: "Public links show only essential FRS summary. Full details require explicit approval.",
    },
    {
      icon: UserCheck,
      title: "Identity Fidelity",
      description: "Verification without exposure. Aadhaar or any government ID is never displayed.",
    },
    {
      icon: FileText,
      title: "Explainable Scores",
      description: "Every FRS component can be understood and challenged. No black boxes.",
    },
  ];

  return (
    <section id="trust-ethics" className="py-24 relative bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-2 mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-primary font-medium">Core Principles</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Trust, Consent & <span className="text-primary">Ethics</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-6">
              Privacy is not a feature—it's the foundation. FRS is built on principles that protect every learner.
            </p>
            <p className="text-sm text-primary font-medium mb-6">
              <span className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                🏛️ NRF-Governed — Designed under National Readiness Framework standards
              </span>
            </p>
          </div>

          {/* Principles Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {principles.map((principle, index) => (
              <div
                key={index}
                className="bg-background border border-border rounded-lg p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <principle.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{principle.title}</h3>
                <p className="text-muted-foreground">{principle.description}</p>
              </div>
            ))}
          </div>

          {/* Context Statement */}
          <div className="bg-background border border-border rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Context is Explanatory, Never Penalizing
                </h3>
                <p className="text-muted-foreground mb-6">
                  A learner's socioeconomic background, school resources, or family circumstances are captured to explain—not to reduce scores. FRS recognizes that achievement must be understood in context.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                    Context never reduces score
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                    Scores evolve with effort
                  </li>
                  <li className="flex items-center text-muted-foreground">
                    <span className="w-2 h-2 rounded-full bg-primary mr-3" />
                    No single score defines a learner
                  </li>
                </ul>
              </div>
              <div className="w-full md:w-80 bg-card border border-border rounded-lg p-6">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary mb-2">0</div>
                  <div className="text-sm text-muted-foreground mb-4">Rankings or Leaderboards</div>
                  <div className="h-px bg-border my-4" />
                  <p className="text-xs text-muted-foreground">
                    FRS focuses on individual growth and readiness—never comparison with others.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustAndEthics;
