import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, Scale } from "lucide-react";

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

const FRSReport = () => {
  const { frsId } = useParams();
  const displayId = frsId || "FRS-IND-2026-001786";

  return (
    <>
      <Helmet>
        <title>FRS Report | {displayId} | ANVESH.AI</title>
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
              <a href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">ANVESH</span>
                <span className="text-xl font-bold text-foreground">.AI</span>
              </a>
              <a
                href="/"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back to Home</span>
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 md:px-6 py-8 md:py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Report Header */}
            <ReportHeader frsId={displayId} />

            {/* Main Grid: Profile + Score + Breakdown */}
            <div className="grid lg:grid-cols-12 gap-6">
              {/* Left Column - Student Profile */}
              <div className="lg:col-span-3 space-y-6">
                <StudentProfile />
                <ContextSection />
              </div>

              {/* Center Column - Score Gauge */}
              <div className="lg:col-span-5">
                <div className="bg-card border border-border rounded-lg p-6 md:p-8 flex flex-col items-center justify-center min-h-[450px]">
                  <ScoreGauge
                    score={758}
                    maxScore={1000}
                    band="READY"
                    bandDescription="Consistent Growth & Applied Engagement"
                  />
                  <p className="text-center text-sm text-muted-foreground mt-6 max-w-sm">
                    A dynamic indicator of academic, skill, and career readiness.
                  </p>
                </div>
              </div>

              {/* Right Column - Score Breakdown */}
              <div className="lg:col-span-4">
                <ScoreBreakdown />
              </div>
            </div>

            {/* Secondary Grid: Trust & Social */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <IdentityFidelity />
              <SocialReadiness />
              <CareerAlignment />
            </div>

            {/* Trajectory Chart */}
            <TrajectoryChart />

            {/* Actionable Insights - Full Width */}
            <ActionableInsights />

            {/* Share & Validation */}
            <ShareValidation />

            {/* Ethics & Disclaimer Footer */}
            <div className="bg-card border border-border rounded-lg p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
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
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12 bg-card/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">ANVESH</span>
                <span className="font-bold text-foreground">.AI</span>
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
    </>
  );
};

export default FRSReport;
