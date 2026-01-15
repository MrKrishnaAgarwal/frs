import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Shield, Brain, Eye } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Subtle grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background/50" />
      
      {/* Accent glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5">
              <Shield className="w-4 h-4 mr-2 text-primary" />
              NEP-Aligned • Explainable • Privacy-First
            </Badge>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-bold mb-8 tracking-tight leading-tight">
            From <span className="text-primary">Exam-Based Selection</span> to <span className="text-primary">Readiness-Based Development</span>
          </h1>

          {/* Sub-headline with NRF Context */}
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            <span className="text-primary font-semibold">Future Readiness Score (FRS)</span> is a readiness indicator developed under the <span className="text-foreground font-semibold">NRF — National Readiness Framework</span>, enabling early, holistic learner support.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href="/1786">
              <Button size="lg" className="text-lg px-8 py-6 group w-full sm:w-auto">
                View Sample FRS
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6">
              Understand How FRS Works
            </Button>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border border-border">
              <Brain className="w-8 h-8 text-primary mb-3" />
              <span className="text-3xl font-bold text-foreground mb-1">42L+</span>
              <span className="text-sm text-muted-foreground text-center">Students take CBSE exams annually</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border border-border">
              <Eye className="w-8 h-8 text-primary mb-3" />
              <span className="text-3xl font-bold text-foreground mb-1">51%</span>
              <span className="text-sm text-muted-foreground text-center">Graduate employability rate</span>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-card/50 border border-border">
              <Shield className="w-8 h-8 text-primary mb-3" />
              <span className="text-3xl font-bold text-foreground mb-1">Zero</span>
              <span className="text-sm text-muted-foreground text-center">Rankings or comparisons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
