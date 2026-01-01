import { Badge } from "@/components/ui/badge";

const NRFBanner = () => {
  return (
    <section className="w-full bg-card/70 border-b border-border/50 sticky top-[70px] z-40 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: NRF Identity */}
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl md:text-2xl font-bold text-foreground mb-2">
              NRF — <span className="text-primary">National Readiness Framework</span>
            </h3>
            <p className="text-base text-muted-foreground">
              A unified framework for tracking learner readiness across India
            </p>
          </div>

          {/* Right: Badges */}
          <div className="flex flex-wrap gap-3 justify-start md:justify-end">
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5 font-medium">
              NEP-Aligned
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5 font-medium">
              Explainable
            </Badge>
            <Badge variant="outline" className="px-4 py-2 text-sm border-primary/30 bg-primary/5 font-medium">
              Privacy-First
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NRFBanner;
