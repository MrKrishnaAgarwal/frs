import { AlertTriangle, TrendingDown, Clock } from "lucide-react";

const ProblemSection = () => {
  return (
    <section className="py-24 relative bg-card/50">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-destructive/10 border border-destructive/20 rounded-full px-4 py-2 mb-6">
              <AlertTriangle className="w-4 h-4 text-destructive" />
              <span className="text-sm text-destructive font-medium">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              India's Education Crisis is <span className="text-primary">Systemic</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The crisis is not about intelligence or effort—it's about missing systems.
            </p>
          </div>

          {/* Problem Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-background border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <TrendingDown className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">~51%</div>
              <p className="text-muted-foreground text-sm">
                of Indian graduates are employable. Degrees are not translating into readiness.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">~88%</div>
              <p className="text-muted-foreground text-sm">
                of the workforce is in low-competency, misaligned jobs. Wrong paths cascade.
              </p>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-destructive" />
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">~65%</div>
              <p className="text-muted-foreground text-sm">
                of unemployed youth are "educated." The system fails after Class 12.
              </p>
            </div>
          </div>

          {/* Why Too Late */}
          <div className="bg-background border border-primary/20 rounded-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Why "Score After Class 12" Is Too Late
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      Skill gaps are discovered only at graduation or hiring
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      Wrong stream and college choices cascade into long-term damage
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      No early-warning system exists for career misalignment
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <span className="text-muted-foreground">
                      Most career decisions are made without aptitude or readiness signals
                    </span>
                  </li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="text-center">
                  <div className="text-5xl font-bold text-primary mb-2">42L+</div>
                  <p className="text-sm text-muted-foreground">
                    students sit CBSE exams annually—admissions rely on a narrow slice of exam performance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gap Statement */}
          <div className="mt-12 text-center">
            <div className="inline-block bg-card border border-border rounded-lg p-8 max-w-2xl">
              <h4 className="text-xl font-bold text-foreground mb-4">The Missing Piece</h4>
              <p className="text-muted-foreground">
                India has identity infrastructure (Aadhaar), financial credit (CIBIL), and exam scores—but <span className="text-primary font-semibold">no national readiness standard</span>. No single, longitudinal, portable student readiness record exists.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
