import { useState } from "react";
import { X, Copy, Check, FileDown, QrCode as QrCodeIcon, ArrowLeft, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { canSharePublicly, copyToClipboard, logShareAction, getFRSLiteUrl } from "@/lib/share-utils";
import QRCodeDisplay from "./QRCodeDisplay";
import PDFExportOptions from "./PDFExportOptions";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  frsId: string;
  score: number;
  isPublicVisible?: boolean;
}

type ShareTab = 'options' | 'qr' | 'pdf';

export default function ShareModal({
  isOpen,
  onClose,
  frsId,
  score,
  isPublicVisible = true,
}: ShareModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<ShareTab>('options');
  const [copied, setCopied] = useState(false);
  const shareUrl = getFRSLiteUrl(frsId);
  const canShare = canSharePublicly(isPublicVisible);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      logShareAction({
        action: 'link',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'lite',
        frsId,
      });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Content */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          {/* Header */}
          <div className="sticky top-0 bg-card border-b border-border px-6 py-5 flex items-start justify-between gap-4 flex-shrink-0">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Lock className="w-5 h-5 text-primary" />
                <h2 id="share-modal-title" className="text-xl font-bold text-foreground">
                  Share Your FRS
                </h2>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {isPublicVisible
                  ? "Securely share your Future Readiness Score with colleges, institutions, scholarships, and mentors."
                  : "Public sharing is currently disabled in your privacy settings."}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors flex-shrink-0 p-1 -mr-1"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-4">
              {activeTab === 'options' && (
                <div className="space-y-3">
                  {/* Copy Link Option */}
                  <button
                    onClick={() => canShare && handleCopyLink()}
                    disabled={!canShare}
                    className={`w-full border rounded-lg p-4 transition-all text-left ${
                      canShare
                        ? 'border-border hover:border-primary/50 hover:bg-secondary/40 cursor-pointer bg-secondary/30'
                        : 'border-border/50 opacity-50 cursor-not-allowed bg-secondary/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <Copy className={`w-5 h-5 mt-0.5 flex-shrink-0 ${canShare ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                          <h4 className="font-semibold text-foreground">
                            {copied ? 'Link Copied!' : 'Copy Share Link'}
                          </h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Summary view only. Recipients access the live FRS page.
                          </p>
                        </div>
                      </div>
                      {copied && <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" />}
                    </div>
                  </button>

                  {/* QR Code Option */}
                  <button
                    onClick={() => canShare && setActiveTab('qr')}
                    disabled={!canShare}
                    className={`w-full border rounded-lg p-4 transition-all text-left ${
                      canShare
                        ? 'border-border hover:border-primary/50 hover:bg-secondary/40 cursor-pointer bg-secondary/30'
                        : 'border-border/50 opacity-50 cursor-not-allowed bg-secondary/10'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <QrCodeIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${canShare ? 'text-primary' : 'text-muted-foreground'}`} />
                        <div>
                          <h4 className="font-semibold text-foreground">Generate QR Code</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Share a QR code for instant access to your FRS summary.
                          </p>
                        </div>
                      </div>
                      {canShare && <span className="text-primary font-medium text-sm">→</span>}
                    </div>
                  </button>

                  {/* PDF Export Option */}
                  <button
                    onClick={() => setActiveTab('pdf')}
                    className="w-full border border-border hover:border-primary/50 hover:bg-secondary/40 cursor-pointer bg-secondary/30 rounded-lg p-4 transition-all text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <FileDown className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                        <div>
                          <h4 className="font-semibold text-foreground">Download PDF</h4>
                          <p className="text-xs text-muted-foreground mt-1">
                            Export as PDF (Lite summary or Full report).
                          </p>
                        </div>
                      </div>
                      <span className="text-primary font-medium text-sm">→</span>
                    </div>
                  </button>

                  {!canShare && (
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mt-6">
                      <p className="text-xs text-yellow-700 dark:text-yellow-400 font-medium">
                        ⚠️ Public sharing is currently disabled in your Privacy Settings.
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-500 mt-2">
                        Enable "Public Visibility" to share via links, QR codes, or PDF with read-only access.
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'qr' && (
                <QRCodeDisplay
                  url={shareUrl}
                  frsId={frsId}
                  onBack={() => setActiveTab('options')}
                />
              )}

              {activeTab === 'pdf' && (
                <PDFExportOptions
                  frsId={frsId}
                  score={score}
                  onBack={() => setActiveTab('options')}
                />
              )}
            </div>
          </div>

          {/* Footer Info */}
          <div className="bg-primary/5 border-t border-primary/20 px-6 py-4 flex-shrink-0">
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="font-medium text-foreground">✓ Privacy Protected:</span> All shares are logged in your Consent History. You maintain full control and can revoke access anytime.
              </p>
              <p className="text-xs text-muted-foreground">
                Shared links show summary view only. Full data requires your explicit approval.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
