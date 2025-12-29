import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, TrendingUp, ArrowLeft, Shield, Calendar } from "lucide-react";

const FRSProfile = () => {
  const { frsId } = useParams();

  // Sample data for demonstration
  const profileData = {
    score: 742,
    band: "Advanced Readiness",
    verified: true,
    trajectory: "+48",
    trajectoryPeriod: "6 months",
    consentStatus: "Summary only",
    lastUpdated: "December 2024",
  };

  return (
    <>
      <Helmet>
        <title>FRS Profile {frsId} | ANVESH.AI</title>
        <meta
          name="description"
          content="View Future Ready Score summary. Full report access is student-controlled."
        />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-card/50">
          <div className="container mx-auto px-6 py-4">
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
                Back to Home
              </a>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto">
            {/* FRS Lite Card */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Future Ready Score</p>
                    <p className="text-xs font-mono text-muted-foreground">
                      anvesh.ai/u/{frsId}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="border-primary/30 text-primary"
                  >
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {profileData.verified ? "Verified" : "Pending"}
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Score Display */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline gap-2 mb-3">
                    <span className="text-8xl font-bold text-primary">
                      {profileData.score}
                    </span>
                    <span className="text-3xl text-muted-foreground">/1000</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-0 text-base px-4 py-1">
                      {profileData.band}
                    </Badge>
                  </div>
                </div>

                {/* One-line Explanation */}
                <div className="bg-secondary/50 rounded-lg p-5 mb-6">
                  <p className="text-muted-foreground text-center">
                    The Future Ready Score is a holistic indicator of academic, skill, and pathway readiness—aligned with NEP 2020.
                  </p>
                </div>

                {/* Trajectory Snapshot */}
                <div className="flex items-center justify-center gap-4 mb-6 p-5 border border-border rounded-lg bg-background/50">
                  <TrendingUp className="w-6 h-6 text-primary" />
                  <div>
                    <span className="text-foreground font-semibold text-lg">
                      {profileData.trajectory} points
                    </span>
                    <span className="text-muted-foreground">
                      {" "}
                      in the last {profileData.trajectoryPeriod}
                    </span>
                  </div>
                </div>

                {/* Last Updated */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <Calendar className="w-4 h-4" />
                  <span>Last updated: {profileData.lastUpdated}</span>
                </div>

                {/* Consent Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8 p-4 bg-secondary/30 rounded-lg">
                  <Lock className="w-4 h-4 text-primary" />
                  <span>
                    <strong className="text-foreground">Consent Status:</strong>{" "}
                    {profileData.consentStatus}
                  </span>
                </div>

                {/* Request Button */}
                <Button className="w-full" size="lg">
                  <Lock className="w-4 h-4 mr-2" />
                  Request Full FRS Report
                </Button>
              </div>

              {/* Card Footer */}
              <div className="bg-secondary/30 p-5 border-t border-border">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    This is a summary view. Full report access is student-controlled and requires explicit approval. Access, when granted, is time-limited and read-only.
                  </p>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Want to learn more about the Future Ready Score?
              </p>
              <a
                href="/#what-is-frs"
                className="text-primary hover:underline text-sm font-medium"
              >
                Understand How FRS Works →
              </a>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-border py-8 mt-12">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="font-bold text-primary">ANVESH</span>
                <span className="font-bold text-foreground">.AI</span>
                <span className="mx-2">•</span>
                <span>Issuer of the Future Ready Score</span>
              </div>
              <div className="flex items-center gap-4">
                <a href="#" className="hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="hover:text-foreground transition-colors">
                  Terms
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default FRSProfile;
