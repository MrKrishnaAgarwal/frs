import { useState, useRef } from "react";
import { ArrowLeft, Download, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logShareAction, copyToClipboard } from "@/lib/share-utils";
import { QRCodeCanvas } from "qrcode.react";

interface QRCodeDisplayProps {
  url: string;
  frsId: string;
  onBack: () => void;
}

export default function QRCodeDisplay({ url, frsId, onBack }: QRCodeDisplayProps) {
  const qrRef = useRef<any>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const downloadQR = async () => {
    setIsDownloading(true);
    try {
      const canvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (!canvas) {
        console.error('Canvas element not found');
        throw new Error('QR code canvas not found');
      }

      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `FRS-${frsId}-QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      logShareAction({
        action: 'qr',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'lite',
        frsId,
      });
    } catch (error) {
      console.error('Failed to download QR:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyUrl = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Go back to sharing options"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Options
      </button>

      {/* QR Code Container */}
      <div className="flex flex-col items-center space-y-4">
        <h3 className="text-lg font-semibold text-foreground">QR Code for Your FRS</h3>

        <div
          className="bg-white rounded-lg p-8 border-2 border-primary/30 shadow-lg"
          ref={qrRef}
        >
          <QRCodeCanvas
            value={url}
            size={256}
            level="H"
            includeMargin={true}
          />
        </div>

        {/* Security Info */}
        <div className="w-full bg-primary/8 border border-primary/30 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <span className="text-lg">🔒</span>
            </div>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium text-foreground">
                Summary View Only
              </p>
              <p className="text-xs text-muted-foreground">
                This QR code links to your FRS summary. Recipients see read-only access to your verified score and trajectory.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* URL Copy Section */}
      <div className="space-y-3 bg-secondary/50 rounded-lg p-4">
        <label className="text-xs font-semibold text-muted-foreground uppercase">
          Share URL
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={url}
            readOnly
            className="flex-1 bg-input border border-border rounded-md px-3 py-2 text-sm font-mono text-foreground placeholder-muted-foreground cursor-default"
            aria-label="FRS share link"
          />
          <Button
            onClick={handleCopyUrl}
            variant="outline"
            size="sm"
            className="gap-2 flex-shrink-0"
            aria-label="Copy share link"
          >
            {copiedUrl ? (
              <>
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Download Options */}
      <div className="space-y-3">
        <label className="text-xs font-semibold text-muted-foreground uppercase block">
          Download QR Code
        </label>
        <Button
          onClick={downloadQR}
          disabled={isDownloading}
          variant="outline"
          className="w-full gap-2 border-primary/30 hover:border-primary/50 bg-primary/5 hover:bg-primary/10"
        >
          <Download className="w-4 h-4" />
          {isDownloading ? 'Downloading...' : 'Download as PNG'}
        </Button>
      </div>

      {/* Instructions */}
      <div className="space-y-3 bg-secondary/30 rounded-lg p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase">
          Usage Instructions
        </p>
        <ul className="space-y-2 text-xs text-muted-foreground">
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-primary font-bold">1</span>
            <span>Download or display this QR code</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-primary font-bold">2</span>
            <span>Share with colleges, institutions, or mentors</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-primary font-bold">3</span>
            <span>They scan to view your verified FRS summary</span>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 text-primary font-bold">4</span>
            <span>Full data access requires your approval</span>
          </li>
        </ul>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>✓</span>
        <span>All QR code shares are logged in your Consent History</span>
      </div>
    </div>
  );
}
