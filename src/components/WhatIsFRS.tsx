import { CheckCircle, XCircle } from "lucide-react";

const WhatIsFRS = () => {
  const measures = [
    "Academic performance across subjects and terms",
    "Skill development and competency acquisition",
    "Growth trajectory and learning momentum",
    "Exposure to diverse learning experiences",
    "Pathway readiness for higher education and careers",
  ];

  const doesNot = [
    "Rank students against each other",
    "Label or categorize learners",
    "Exclude anyone from opportunities",
    "Replace human judgment in admissions",
  ];

  return (
    <section id="what-is-frs" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-card/30 to-background" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              What is the <span className="text-primary">Future Ready Score?</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A single exam score captures a moment. FRS captures readiness—the complete picture of a learner's preparation for their future.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            {/* What FRS Measures */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                  <CheckCircle className="w-5 h-5 text-primary" />
                </span>
                What FRS Measures
              </h3>
              <ul className="space-y-4">
                {measures.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* What FRS Does NOT Do */}
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                <span className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center mr-3">
                  <XCircle className="w-5 h-5 text-destructive" />
                </span>
                What FRS Does NOT Do
              </h3>
              <ul className="space-y-4">
                {doesNot.map((item, index) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="w-5 h-5 text-destructive mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border">
                <p className="text-sm text-foreground font-medium">
                  FRS supports decisions — it does not replace them.
                </p>
              </div>
            </div>
          </div>

          {/* Why Single Scores Fail */}
          <div className="bg-card border border-primary/20 rounded-lg p-8 md:p-12">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Why Single Exam Scores Are Insufficient
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">~88%</div>
                <p className="text-muted-foreground text-sm">
                  of India's workforce is in low-competency, misaligned jobs
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">~65%</div>
                <p className="text-muted-foreground text-sm">
                  of unemployed youth are classified as "educated"
                </p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">Zero</div>
                <p className="text-muted-foreground text-sm">
                  early-warning systems exist for career misalignment
                </p>
              </div>
            </div>
            <p className="mt-8 text-muted-foreground border-t border-border pt-6">
              Marks show performance in an exam. <span className="text-primary font-semibold">Readiness shows preparedness for life.</span> India has identity infrastructure (Aadhaar), financial credit (CIBIL), and exam scores—but no national readiness standard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIsFRS;
