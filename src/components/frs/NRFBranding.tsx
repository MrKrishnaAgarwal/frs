const NRFBranding = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-card via-card/95 to-card border border-border rounded-lg p-6 md:p-8">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
      
      <div className="relative text-center">
        {/* Main Title */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="hidden sm:block h-px w-12 bg-gradient-to-r from-transparent via-primary/50 to-primary" />
          <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide">
            <span className="text-primary">NRF</span>
            <span className="text-muted-foreground mx-2 font-light">—</span>
            <span className="text-foreground">National Readiness Framework</span>
          </h1>
          <div className="hidden sm:block h-px w-12 bg-gradient-to-l from-transparent via-primary/50 to-primary" />
        </div>
        
        {/* Tagline */}
        <p className="font-playfair text-sm sm:text-base md:text-lg text-muted-foreground italic tracking-wide">
          A unified framework for tracking learner readiness across India
        </p>
        
        {/* Decorative underline */}
        <div className="flex items-center justify-center gap-2 mt-4">
          <div className="h-px w-8 bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="h-px w-8 bg-primary/30" />
        </div>
      </div>
    </div>
  );
};

export default NRFBranding;
