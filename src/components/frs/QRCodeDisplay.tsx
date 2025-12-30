import { useState, useRef } from "react";
import { ArrowLeft, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";
import { logShareAction } from "@/lib/share-utils";

interface QRCodeDisplayProps {
  url: string;
  frsId: string;
  onBack: () => void;
}

export default function QRCodeDisplay({ url, frsId, onBack }: QRCodeDisplayProps) {
  const qrRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadQR = async (format: 'png' | 'pdf') => {
    setIsDownloading(true);
    const element = qrRef.current?.querySelector('canvas');
    
    if (!element) {
      setIsDownloading(false);
      return;
    }

    try {
      if (format === 'png') {
        const link = document.createElement('a');
        link.href = element.toDataURL('image/png');
        link.download = `FRS-${frsId}-QR.png`;
        link.click();
      } else if (format === 'pdf') {
        // For PDF, use html2pdf
        const html2pdf = (await import('html2pdf.js')).default;
        const element = document.createElement('div');
        element.innerHTML = qrRef.current?.innerHTML || '';
        
        html2pdf()
          .set({
            margin: 10,
            filename: `FRS-${frsId}-QR.pdf`,
            image: { type: 'PNG', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
          })
          .from(element)
          .save();
      }

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
        <QRCode
          value={url}
          size={256}
          level="H"
          includeMargin={true}
          renderAs="canvas"
        />
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
          onClick={() => downloadQR('pdf')}
          disabled={isDownloading}
          variant="outline"
          className="w-full gap-2"
        >
          <FileText className="w-4 h-4" />
          Download QR (PDF)
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Share this QR code with institutions, colleges, or mentors for instant access.
      </p>
    </div>
  );
}
