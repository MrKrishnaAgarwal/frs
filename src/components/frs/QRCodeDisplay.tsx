import { useState, useRef, lazy, Suspense } from "react";
import { ArrowLeft, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logShareAction } from "@/lib/share-utils";

const QRCode = lazy(() => import("qrcode.react"));

interface QRCodeDisplayProps {
  url: string;
  frsId: string;
  onBack: () => void;
}

export default function QRCodeDisplay({ url, frsId, onBack }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadQR = async (format: 'png' | 'jpg') => {
    setIsDownloading(true);
    try {
      const element = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
      if (element) {
        const link = document.createElement('a');
        link.href = element.toDataURL('image/png');
        link.download = `FRS-${frsId}-QR.png`;
        link.click();

        logShareAction({
          action: 'qr',
          timestamp: new Date().toISOString(),
          visibilityLevel: 'lite',
          frsId,
        });
      }
    } catch (error) {
      console.error('Failed to download QR:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <div className="bg-white rounded-lg p-6 flex justify-center" ref={qrRef}>
        <Suspense fallback={<div className="w-64 h-64 bg-gray-200 rounded flex items-center justify-center">Generating QR...</div>}>
          <QRCode
            value={url}
            size={256}
            level="H"
            includeMargin={true}
            renderAs="canvas"
          />
        </Suspense>
      </div>

      <div className="bg-secondary/50 rounded-lg p-3 text-center">
        <p className="text-xs text-muted-foreground">
          🔒 QR shows a consented summary view only.
        </p>
      </div>

      <div className="space-y-2">
        <Button
          onClick={() => downloadQR('png')}
          disabled={isDownloading}
          variant="outline"
          className="w-full gap-2"
        >
          <Download className="w-4 h-4" />
          Download QR (PNG)
        </Button>
        <Button
          onClick={() => downloadQR('jpg')}
          disabled={isDownloading}
          variant="outline"
          className="w-full gap-2"
        >
          <Download className="w-4 h-4" />
          Download QR (JPG)
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Share this QR code with institutions, colleges, or mentors for instant access.
      </p>
    </div>
  );
}
