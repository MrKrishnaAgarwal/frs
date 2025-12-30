import { useState } from "react";
import { X, Copy, Check, FileDown, QrCode as QrCodeIcon } from "lucide-react";
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-card border-border">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">Share Your FRS</DialogTitle>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {isPublicVisible
              ? "Share your Future Ready Score securely with institutions and mentors."
              : "Public sharing is currently disabled in your privacy settings."}
          </p>
        </DialogHeader>

        <div className="space-y-4">
          {activeTab === 'options' && (
            <div className="space-y-3">
              {/* Copy Link Option */}
              <div
                className={`border rounded-lg p-4 transition-all ${
                  canShare
                    ? 'border-border hover:border-primary/50 cursor-pointer bg-secondary/30'
                    : 'border-border/50 opacity-50 cursor-not-allowed bg-secondary/10'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-start gap-3">
                    <Copy className={`w-5 h-5 mt-0.5 ${canShare ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="font-semibold text-foreground">Copy Share Link</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Summary view only. Recipient must approve access.
                      </p>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCopyLink}
                  disabled={!canShare}
                  variant="outline"
                  size="sm"
                  className="w-full mt-3 gap-2"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      Copied to Clipboard
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      Copy Link
                    </>
                  )}
                </Button>
              </div>

              {/* QR Code Option */}
              <div
                onClick={() => canShare && setActiveTab('qr')}
                className={`border rounded-lg p-4 transition-all ${
                  canShare
                    ? 'border-border hover:border-primary/50 cursor-pointer bg-secondary/30'
                    : 'border-border/50 opacity-50 cursor-not-allowed bg-secondary/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <QrCodeIcon className={`w-5 h-5 mt-0.5 ${canShare ? 'text-primary' : 'text-muted-foreground'}`} />
                    <div>
                      <h4 className="font-semibold text-foreground">Generate QR Code</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Share via QR for instant access to summary view.
                      </p>
                    </div>
                  </div>
                  {canShare && <span className="text-xs text-primary font-medium">→</span>}
                </div>
              </div>

              {/* PDF Export Option */}
              <div
                onClick={() => setActiveTab('pdf')}
                className="border border-border hover:border-primary/50 cursor-pointer bg-secondary/30 rounded-lg p-4 transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <FileDown className="w-5 h-5 mt-0.5 text-primary" />
                    <div>
                      <h4 className="font-semibold text-foreground">Download PDF</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Export as PDF (Lite or Full report).
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-primary font-medium">→</span>
                </div>
              </div>

              {!canShare && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mt-4">
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    ⚠️ Public sharing is currently disabled. Enable it in Privacy Settings to share.
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

        {/* Footer Info */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 mt-6">
          <p className="text-xs text-muted-foreground">
            ✓ All shares are logged and tracked in your Consent History. You maintain full control.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
