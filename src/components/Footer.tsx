import { Shield } from "lucide-react";
import anveshLogo from "@/assets/anvesh-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-16 bg-card/50 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-1.5 mb-4">
                <img src={anveshLogo} alt="Anvesh.ai" className="w-8 h-8" />
                <span className="text-2xl font-bold">
                  <span className="text-primary">Anvesh</span>
                  <span className="text-foreground">.ai</span>
                </span>
              </div>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Issuer and steward of the Future Ready Score framework. Building national readiness infrastructure for India's learners.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Shield className="w-4 h-4 text-primary" />
                <span>NEP-Aligned • Explainable • Privacy-First</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-foreground mb-4">Framework</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#what-is-frs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    What is FRS
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#trust-ethics" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Trust & Ethics
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    View Sample FRS
                  </a>
                </li>
              </ul>
            </div>

            {/* Institutions */}
            <div>
              <h4 className="font-bold text-foreground mb-4">For Institutions</h4>
              <ul className="space-y-3">
                <li>
                  <a href="#institutions" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Partnership Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Integration Guide
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-foreground transition-colors text-sm">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="border-t border-border pt-8 mb-8">
            <p className="text-xs text-muted-foreground text-center max-w-3xl mx-auto">
              The Future Ready Score is designed to support educational decisions, not replace human judgment. FRS does not rank, label, or exclude learners. Context is explanatory only and never penalizes scores. All data access is student-controlled and consent-driven.
            </p>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} Anvesh.ai. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-foreground transition-colors">Data Protection</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
