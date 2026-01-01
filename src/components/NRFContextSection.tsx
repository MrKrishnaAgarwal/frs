import { ArrowRight } from "lucide-react";

const NRFContextSection = () => {
  return (
    <section className="py-20 relative bg-card/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Main Content */}
          <div className="bg-card border border-border rounded-lg p-8 md:p-12">
            <div className="space-y-8">
              {/* NRF Layer */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">📋</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    NRF: Policy Layer
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="text-primary font-semibold">NRF — National Readiness Framework</span> provides the governance backbone and common readiness language for the entire education system.
                  </p>
                </div>
              </div>

              {/* Connection Arrow */}
              <div className="flex justify-center">
                <ArrowRight className="w-6 h-6 text-primary/50 transform rotate-90" />
              </div>

              {/* FRS Layer */}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">🎯</span>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    FRS: Practical Implementation
                  </h3>
                  <p className="text-muted-foreground">
                    <span className="text-primary font-semibold">FRS operationalizes NRF</span> at the learner level, translating national standards into actionable, measurable readiness scores.
                  </p>
                </div>
              </div>

              {/* Key Insight */}
              <div className="mt-8 pt-8 border-t border-border">
                <p className="text-center text-lg text-foreground">
                  <span className="text-primary font-semibold">NRF provides the common readiness language; FRS operationalizes it at the learner level.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Text */}
          <p className="text-center text-muted-foreground text-sm mt-8 max-w-2xl mx-auto">
            This hierarchical approach ensures consistency across the education system while enabling personalized, actionable insights for every learner.
          </p>
        </div>
      </div>
    </section>
  );
};

export default NRFContextSection;
