import { useState, useRef } from "react";
import { ArrowLeft, FileDown, AlertCircle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import QRCode from "qrcode.react";
import { logShareAction, generateFRSLitePDF, generateFRSFullPDF } from "@/lib/share-utils";

interface PDFExportOptionsProps {
  frsId: string;
  score: number;
  onBack: () => void;
}

export default function PDFExportOptions({ frsId, score, onBack }: PDFExportOptionsProps) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<'lite' | 'full' | null>('lite');
  const [isExporting, setIsExporting] = useState(false);
  const [showFullWarning, setShowFullWarning] = useState(false);
  const [exportError, setExportError] = useState<string | null>(null);
  const qrRef = useRef<HTMLDivElement>(null);

  const handleExportLite = async () => {
    setIsExporting(true);
    setExportError(null);
    try {
      // Generate QR code data URL first
      const canvas = qrRef.current?.querySelector('canvas') as HTMLCanvasElement;
      const qrDataUrl = canvas ? canvas.toDataURL('image/png') : undefined;

      const pdfBlob = await generateFRSLitePDF(frsId, score, qrDataUrl);

      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `FRS-${frsId}-Lite.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      logShareAction({
        action: 'pdf-lite',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'lite',
        frsId,
      });

      // Reset after successful export
      setSelectedType('lite');
      setShowFullWarning(false);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      setExportError('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportFull = async () => {
    if (!showFullWarning) {
      setShowFullWarning(true);
      return;
    }

    setIsExporting(true);
    setExportError(null);
    try {
      const pdfBlob = await generateFRSFullPDF(frsId, score);

      const link = document.createElement('a');
      link.href = URL.createObjectURL(pdfBlob);
      link.download = `FRS-${frsId}-Full.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      logShareAction({
        action: 'pdf-full',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'full',
        frsId,
      });

      // Reset after successful export
      setSelectedType('lite');
      setShowFullWarning(false);
    } catch (error) {
      console.error('Failed to export PDF:', error);
      setExportError('Failed to generate PDF. Please try again.');
    } finally {
      setIsExporting(false);
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

      <h3 className="text-lg font-semibold text-foreground">Choose PDF Type</h3>

      <div className="space-y-3">
        {/* FRS Lite Option */}
        <button
          onClick={() => {
            setSelectedType('lite');
            setShowFullWarning(false);
          }}
          className={`w-full border rounded-lg p-4 transition-all text-left ${
            selectedType === 'lite'
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 bg-secondary/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === 'lite'
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {selectedType === 'lite' && (
                  <Check className="w-3 h-3 text-primary-foreground" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">
                FRS Lite — Summary (1 Page)
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Verification-backed summary with score, band, trajectory snapshot, and QR code for live access.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block px-2 py-1 bg-primary/20 text-primary rounded text-xs font-medium">
                  ✓ Share-Ready
                </span>
                <span className="inline-block px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs font-medium">
                  ✓ Public Safe
                </span>
              </div>
            </div>
          </div>
        </button>

        {/* FRS Full Option */}
        <button
          onClick={() => {
            setSelectedType('full');
            setShowFullWarning(false);
          }}
          className={`w-full border rounded-lg p-4 transition-all text-left ${
            selectedType === 'full'
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary/50 bg-secondary/30'
          }`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedType === 'full'
                  ? 'border-primary bg-primary'
                  : 'border-border'
              }`}>
                {selectedType === 'full' && (
                  <Check className="w-3 h-3 text-primary-foreground" />
                )}
              </div>
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">
                Full FRS Report — Complete (Multi-Page)
              </h4>
              <p className="text-xs text-muted-foreground mt-1">
                Complete assessment with all sections: learning readiness, skills, career alignment, social readiness, detailed analysis, and insights.
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                <span className="inline-block px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs font-medium">
                  🔒 Personal Use Only
                </span>
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Hidden QR for PDF generation */}
      <div className="hidden" ref={qrRef}>
        <QRCode
          value={`https://anvesh.ai/u/${frsId}`}
          size={200}
          level="H"
          includeMargin={true}
          renderAs="canvas"
        />
      </div>

      {/* Warnings and Info */}
      {selectedType === 'full' && showFullWarning && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-yellow-700 dark:text-yellow-400 mb-2">
                Full Report Contains Detailed Information
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed">
                The full FRS report includes detailed assessment across all dimensions: learning readiness, technical and soft skills, career alignment, social capabilities, and personalized insights.
              </p>
              <p className="text-xs text-yellow-700 dark:text-yellow-400 leading-relaxed mt-2">
                This export is for your personal records only. Do not share the full report without explicit consent from each recipient.
              </p>
            </div>
          </div>
        </div>
      )}

      {selectedType === 'lite' && (
        <div className="bg-primary/5 border border-primary/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">✓ Share-Ready:</span> The Lite PDF includes a scannable QR code linking to your live FRS page for instant access.
          </p>
        </div>
      )}

      {exportError && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3">
          <p className="text-xs text-destructive">
            {exportError}
          </p>
        </div>
      )}

      {/* Export Button */}
      <Button
        onClick={selectedType === 'full' ? handleExportFull : handleExportLite}
        disabled={!selectedType || isExporting}
        className="w-full gap-2"
      >
        <FileDown className="w-4 h-4" />
        {isExporting ? (
          <>
            <span className="inline-block animate-spin mr-1">⟳</span>
            {selectedType === 'lite' ? 'Generating Lite PDF...' : 'Generating Full PDF...'}
          </>
        ) : (
          `Download FRS ${selectedType === 'lite' ? 'Lite' : 'Full'} PDF`
        )}
      </Button>

      {/* Additional Info */}
      <div className="bg-secondary/30 rounded-lg p-4 space-y-3">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase">Why Two Versions?</p>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="flex-shrink-0 text-primary font-bold">•</span>
              <span><span className="font-medium text-foreground">Lite:</span> Perfect for sharing with colleges and institutions</span>
            </li>
            <li className="flex gap-2">
              <span className="flex-shrink-0 text-primary font-bold">•</span>
              <span><span className="font-medium text-foreground">Full:</span> Keep for your records and personal portfolio</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Trust Badge */}
      <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <span>✓</span>
        <span>All PDF exports are logged in your Consent History</span>
      </div>
    </div>
  );
}
