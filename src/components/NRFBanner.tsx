const NRFBanner = () => {
  return (
    <section className="w-full bg-card/70 border-b border-border/50">
      <div className="container mx-auto px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
            NRF — <span className="text-primary">National Readiness Framework</span>
          </h1>
          <p className="text-base text-gray-300">
            A unified framework for tracking learner readiness across India
          </p>
        </div>
      </div>
    </section>
  );
};

export default NRFBanner;
