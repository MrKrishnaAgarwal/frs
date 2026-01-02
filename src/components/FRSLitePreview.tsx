import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Lock, TrendingUp, QrCode, Smartphone } from "lucide-react";

const FRSLitePreview = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              FRS Public <span className="text-primary">Profile</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Each learner has a unique, shareable public link. Safe for public viewing via QR or NFC.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* FRS Lite Card Preview */}
            <div className="bg-card border border-border rounded-2xl overflow-hidden">
              {/* Card Header */}
              <div className="bg-gradient-to-r from-primary/20 to-primary/5 p-6 border-b border-border">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Future Ready Score</p>
                    <p className="text-xs font-mono text-muted-foreground">anvesh.ai/1284</p>
                  </div>
                  <Badge variant="outline" className="border-primary/30 text-primary">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Verified
                  </Badge>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Score Display */}
                <div className="text-center mb-8">
                  <div className="inline-flex items-baseline gap-2 mb-2">
                    <span className="text-7xl font-bold text-primary">742</span>
                    <span className="text-2xl text-muted-foreground">/1000</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Badge className="bg-primary/20 text-primary border-0">
                      Advanced Readiness
                    </Badge>
                  </div>
                </div>

                {/* One-line Explanation */}
                <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                  <p className="text-sm text-muted-foreground text-center">
                    FRS is a holistic indicator of academic, skill, and pathway readiness.
                  </p>
                </div>

                {/* Trajectory Snapshot */}
                <div className="flex items-center justify-center gap-4 mb-6 p-4 border border-border rounded-lg">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <div className="text-sm">
                    <span className="text-foreground font-medium">+48 points</span>
                    <span className="text-muted-foreground"> in the last 6 months</span>
                  </div>
                </div>

                {/* Consent Status */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
                  <Lock className="w-4 h-4" />
                  <span>Full report access is student-controlled</span>
                </div>

                {/* Request Button */}
                <Button className="w-full" size="lg">
                  Request Full FRS Report
                </Button>
              </div>

              {/* Card Footer */}
              <div className="bg-secondary/30 p-4 border-t border-border">
                <p className="text-xs text-muted-foreground text-center">
                  This is a summary view. Full report access requires student approval and is time-limited.
                </p>
              </div>
            </div>

            {/* QR & NFC Information */}
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  QR & NFC Support
                </h3>
                <p className="text-muted-foreground mb-6">
                  FRS profiles can be accessed via QR codes and NFC tags—making sharing seamless and secure.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                    <QrCode className="w-10 h-10 text-primary mb-2" />
                    <span className="text-sm text-foreground font-medium">QR Code</span>
                    <span className="text-xs text-muted-foreground">Scan to view</span>
                  </div>
                  <div className="flex flex-col items-center p-4 bg-secondary/30 rounded-lg">
                    <Smartphone className="w-10 h-10 text-primary mb-2" />
                    <span className="text-sm text-foreground font-medium">NFC Tag</span>
                    <span className="text-xs text-muted-foreground">Tap to access</span>
                  </div>
                </div>

                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Important:</strong> No personal data is stored on QR/NFC. They act only as secure pointers to the consented summary.
                  </p>
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-8">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Full Report Access Flow
                </h3>
                <ol className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">1</span>
                    <span className="text-muted-foreground">Viewer requests access via the public profile</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">2</span>
                    <span className="text-muted-foreground">Student receives notification and explicitly approves</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">3</span>
                    <span className="text-muted-foreground">Full report opens in read-only mode</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0">4</span>
                    <span className="text-muted-foreground">Access expires after a time-limited period</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FRSLitePreview;
