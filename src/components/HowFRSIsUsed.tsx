import { GraduationCap, Award, Users, UserCheck } from "lucide-react";

const HowFRSIsUsed = () => {
  const useCases = [
    {
      icon: GraduationCap,
      title: "College Admissions",
      description: "Provides contextual understanding beyond marks. Helps institutions see the complete learner profile.",
    },
    {
      icon: Award,
      title: "Scholarships",
      description: "Enables fair targeting of financial aid based on potential and growth, not just grades.",
    },
    {
      icon: Users,
      title: "Mentorship & Guidance",
      description: "Powers personalized career counseling with actionable insights for students and educators.",
    },
    {
      icon: UserCheck,
      title: "Student Self-Reflection",
      description: "Helps learners understand their own strengths, growth areas, and pathway readiness.",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              How FRS is <span className="text-primary">Used</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              FRS is designed to support—not replace—human decision-making across the education ecosystem.
            </p>
          </div>

          {/* Use Cases Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="group bg-card border border-border rounded-lg p-8 hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                    <useCase.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{useCase.title}</h3>
                    <p className="text-muted-foreground">{useCase.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* NEP Alignment */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Aligned with NEP 2020
                </h3>
                <p className="text-muted-foreground mb-6">
                  The National Education Policy 2020 mandates Holistic Progress Cards with 360° assessment across academics, skills, values, health, and projects. FRS is an operational, scalable implementation of this vision.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm text-foreground">
                    Holistic Assessment
                  </span>
                  <span className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm text-foreground">
                    Longitudinal Tracking
                  </span>
                  <span className="px-4 py-2 bg-background/50 border border-border rounded-full text-sm text-foreground">
                    Multi-Stakeholder
                  </span>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <div className="bg-card border border-border rounded-lg p-6 text-center">
                  <div className="text-5xl font-bold text-primary mb-2">2020</div>
                  <div className="text-sm text-muted-foreground">NEP Framework</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowFRSIsUsed;
