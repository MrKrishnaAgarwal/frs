import { Badge } from "@/components/ui/badge";

const NRFBanner = () => {
  return (
    <section className="w-full bg-card/50 border-b border-border sticky top-[70px] z-40">
      <div className="container mx-auto px-6 py-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Left: NRF Identity */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-foreground mb-1">
              NRF — <span className="text-primary">National Readiness Framework</span>
            </h3>
            <p className="text-sm text-muted-foreground">
              A unified framework for tracking learner readiness across India
            </p>
          </div>

          {/* Right: Badges */}
          <div className="flex flex-wrap gap-2 justify-start md:justify-end">
            <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 bg-primary/5">
              NEP-Aligned
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 bg-primary/5">
              Explainable
            </Badge>
            <Badge variant="outline" className="px-3 py-1 text-xs border-primary/30 bg-primary/5">
              Privacy-First
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NRFBanner;
