import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Scale, Globe } from "lucide-react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import ReportHeader from "@/components/frs/ReportHeader";
import StudentProfile from "@/components/frs/StudentProfile";
import ScoreGauge from "@/components/frs/ScoreGauge";
import ScoreBreakdown from "@/components/frs/ScoreBreakdown";
import ContextSection from "@/components/frs/ContextSection";
import IdentityFidelity from "@/components/frs/IdentityFidelity";
import SocialReadiness from "@/components/frs/SocialReadiness";
import TrajectoryChart from "@/components/frs/TrajectoryChart";
import ActionableInsights from "@/components/frs/ActionableInsights";
import CareerAlignment from "@/components/frs/CareerAlignment";
import ShareValidation from "@/components/frs/ShareValidation";
import AnimatedSection from "@/components/frs/AnimatedSection";
import LanguageSelector from "@/components/frs/LanguageSelector";
import ShareButton from "@/components/frs/ShareButton";
import NRFBranding from "@/components/frs/NRFBranding";
import ReadinessTypeAnalysis from "@/components/frs/ReadinessTypeAnalysis";
import ReadinessSummary from "@/components/frs/ReadinessSummary";
import anveshLogo from "@/assets/anvesh-logo.png";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const FRSReport = () => {
  const { frsId } = useParams();
  const displayId = frsId || "FRS-IND-2026-001786";
  const { t } = useTranslation();

  useEffect(() => {
    // Initialize Google Translate
    const addGoogleTranslateScript = () => {
      if (document.getElementById("google-translate-script")) return;

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,hi,bn,te,ta,mr,gu,kn,ml,pa,or,as,ur",
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
          },
          "google_translate_element"
        );
      };

      const script = document.createElement("script");
      script.id = "google-translate-script";
      script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <>
      <Helmet>
        <title>FRS Report | {displayId} | Anvesh</title>
        <meta
          name="description"
          content="Future Ready Score Report - A holistic readiness indicator for learning, skills, and pathways."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <a href="/" className="flex items-center gap-1.5">
                <img src={anveshLogo} alt="Anvesh" className="w-7 h-7" />
                <span className="text-xl font-bold text-primary">Anvesh</span>
              </a>
              <div className="flex items-center gap-4">
                {/* Language Selector */}
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <LanguageSelector />
                </div>
                <a
                  href="/"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">{t("common.backToHome")}</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* NRF Branding Header */}
            <AnimatedSection animation="fade-up">
              <NRFBranding />
            </AnimatedSection>

            {/* Report Header */}
            <AnimatedSection animation="fade-up" delay={50}>
              <ReportHeader frsId={displayId} />
            </AnimatedSection>

            {/* Main Grid: Profile + Score + Breakdown */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column - Student Profile */}
              <div className="lg:col-span-3 space-y-6">
                <AnimatedSection animation="fade-right" delay={100}>
                  <StudentProfile />
                </AnimatedSection>
                <AnimatedSection animation="fade-right" delay={200}>
                  <ContextSection />
                </AnimatedSection>
              </div>

              {/* Center Column - Score Gauge */}
              <div className="lg:col-span-5">
                <AnimatedSection animation="scale" delay={150}>
                  <div className="bg-card border border-border rounded-lg p-6 md:p-8 flex flex-col items-center justify-center min-h-[400px]">
                    <ScoreGauge
                      score={758}
                      maxScore={1000}
                      band={t("scoreGauge.futureReady")}
                      bandDescription={t("scoreGauge.consistentGrowth")}
                    />
                    <p className="text-center text-sm text-muted-foreground mt-4 max-w-sm">
                      {t("scoreGauge.indicator")}
                    </p>
                    <div className="mt-6 pt-4 border-t border-border w-full flex justify-center">
                      <ShareButton
                        frsId={displayId}
                        score={758}
                        isPublicVisible={true}
                      />
                    </div>
                  </div>
                </AnimatedSection>
              </div>

              {/* Right Column - Score Breakdown */}
              <div className="lg:col-span-4">
                <AnimatedSection animation="fade-left" delay={200}>
                  <ScoreBreakdown />
                </AnimatedSection>
              </div>
            </div>

            {/* Readiness Type Analysis - After Score Breakdown */}
            <AnimatedSection animation="fade-up">
              <ReadinessTypeAnalysis />
            </AnimatedSection>

            {/* Secondary Grid: Trust & Social */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatedSection animation="fade-up" delay={0}>
                <IdentityFidelity />
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={100}>
                <SocialReadiness />
              </AnimatedSection>
              <AnimatedSection animation="fade-up" delay={200}>
                <CareerAlignment />
              </AnimatedSection>
            </div>

            {/* Trajectory Chart */}
            <AnimatedSection animation="fade-up">
              <TrajectoryChart />
            </AnimatedSection>

            {/* Actionable Insights - Full Width */}
            <AnimatedSection animation="scale" delay={100}>
              <ActionableInsights />
            </AnimatedSection>

            {/* FRS Readiness Summary - Auto-generated narrative */}
            <AnimatedSection animation="fade-up" delay={150}>
              <ReadinessSummary studentName="Krishna" score={758} />
            </AnimatedSection>

            {/* Ethics & Disclaimer Footer */}
            <AnimatedSection animation="fade" delay={200}>
              <div className="bg-card border border-border rounded-lg p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 animate-pulse">
                    <Scale className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      Ethics & Disclaimer
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      "FRS is a guidance tool — not a ranking system. Scores are dynamic and improve with effort and support. No single score defines a learner."
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12 bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <img src={anveshLogo} alt="Anvesh" className="w-6 h-6" />
                <span className="font-bold text-primary">Anvesh</span>
                <span className="mx-2">•</span>
                <span>Issuer of the Future Ready Score</span>
              </div>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms of Use
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Data Protection
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Custom styles for Google Translate */}
      <style>{`
        .goog-te-banner-frame { display: none !important; }
        .goog-te-menu-value span { color: hsl(var(--foreground)) !important; }
        .goog-te-gadget { font-family: inherit !important; }
        .goog-te-gadget-simple {
          background-color: transparent !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 6px !important;
          padding: 4px 8px !important;
        }
        .goog-te-gadget-simple img { display: none !important; }
        .goog-te-gadget-simple .goog-te-menu-value { color: hsl(var(--foreground)) !important; }
        body { top: 0 !important; }
        .skiptranslate { display: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
      `}</style>
    </>
  );
};

export default FRSReport;
