import { Button } from "@/components/ui/button";
import { Building2, Lightbulb, Target, Users, ArrowRight } from "lucide-react";

const InstitutionalValue = () => {
  const benefits = [
    {
      icon: Lightbulb,
      title: "Early Intervention",
      description: "Identify readiness gaps before they become failures—not after.",
    },
    {
      icon: Target,
      title: "Inclusive Admissions",
      description: "Move beyond ranks to understand the complete learner profile.",
    },
    {
      icon: Users,
      title: "Better Scholarship Targeting",
      description: "Direct financial aid based on potential and need, not just marks.",
    },
    {
      icon: Building2,
      title: "Workforce Alignment",
      description: "Reduce unemployability by aligning education with career pathways.",
    },
  ];

  return (
    <section id="institutions" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              For <span className="text-primary">Institutions</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              FRS is adoptable infrastructure—designed for integration into existing educational systems.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-card border border-border rounded-lg p-8 hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
                  Partner With FRS
                </h3>
                <p className="text-muted-foreground mb-6">
                  Whether you're a school, college, government body, or scholarship provider—FRS integrates with your existing processes to provide deeper learner insights.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="group">
                    Institutional Partnerships
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline">
                    Request Documentation
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Stream</div>
                    <div className="text-xs text-muted-foreground">Neutral</div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Class 1</div>
                    <div className="text-xs text-muted-foreground">→ Career</div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Holistic</div>
                    <div className="text-xs text-muted-foreground">Assessment</div>
                  </div>
                  <div className="bg-background border border-border rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-primary">Guidance</div>
                    <div className="text-xs text-muted-foreground">Not Gates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstitutionalValue;
