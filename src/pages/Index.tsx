import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhatIsFRS from "@/components/WhatIsFRS";
import ProblemSection from "@/components/ProblemSection";
import HowFRSIsUsed from "@/components/HowFRSIsUsed";
import TrustAndEthics from "@/components/TrustAndEthics";
import FRSLitePreview from "@/components/FRSLitePreview";
import InstitutionalValue from "@/components/InstitutionalValue";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Future Ready Score (FRS) | Anvesh - National Readiness Framework</title>
        <meta
          name="description"
          content="Future Ready Score (0-1000): India's privacy-first, NEP-aligned holistic indicator of academic, skill, and pathway readiness for learners."
        />
        <meta
          name="keywords"
          content="Future Ready Score, FRS, Anvesh, NEP 2020, holistic assessment, student readiness, education India"
        />
        <link rel="canonical" href="https://anvesh.in" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Future Ready Score | Anvesh" />
        <meta
          property="og:description"
          content="A holistic indicator of academic, skill, and pathway readiness for every Indian learner."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://anvesh.in" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Future Ready Score | Anvesh" />
        <meta
          name="twitter:description"
          content="A holistic indicator of academic, skill, and pathway readiness for every Indian learner."
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <HeroSection />
          <WhatIsFRS />
          <ProblemSection />
          <HowFRSIsUsed />
          <TrustAndEthics />
          <FRSLitePreview />
          <InstitutionalValue />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
