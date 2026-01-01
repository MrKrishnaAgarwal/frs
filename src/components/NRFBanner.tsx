const NRFBanner = () => {
  return (
    <section className="w-full bg-card/70 border-b border-border/50">
      <div className="container mx-auto px-6 py-8 md:py-10">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-2xl md:text-2xl font-bold text-white mb-2">
            NRF — <span className="text-primary">National Readiness Framework</span>
          </h3>
          <p className="text-base text-gray-300">
            A unified framework for tracking learner readiness across India
          </p>
        </div>
      </div>
    </section>
  );
};

export default NRFBanner;
