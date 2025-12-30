import { useState } from "react";
import { ArrowLeft, FileDown, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { logShareAction } from "@/lib/share-utils";

interface PDFExportOptionsProps {
  frsId: string;
  score: number;
  onBack: () => void;
}

export default function PDFExportOptions({ frsId, score, onBack }: PDFExportOptionsProps) {
  const { t } = useTranslation();
  const [selectedType, setSelectedType] = useState<'lite' | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [showFullWarning, setShowFullWarning] = useState(false);

  const handleExportLite = async () => {
    setIsExporting(true);
    try {
      // Create a simple PDF for FRS Lite
      // In production, this would generate a proper formatted PDF
      const canvas = await generatePDFLite(frsId, score);
      const link = document.createElement('a');
      link.href = canvas;
      link.download = `FRS-${frsId}-Lite.pdf`;
      link.click();

      logShareAction({
        action: 'pdf-lite',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'lite',
        frsId,
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
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
    try {
      const canvas = await generatePDFFull(frsId, score);
      const link = document.createElement('a');
      link.href = canvas;
      link.download = `FRS-${frsId}-Full.pdf`;
      link.click();

      logShareAction({
        action: 'pdf-full',
        timestamp: new Date().toISOString(),
        visibilityLevel: 'full',
        frsId,
      });
    } catch (error) {
      console.error('Failed to export PDF:', error);
    } finally {
      setIsExporting(false);
      setShowFullWarning(false);
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

      <div className="space-y-3">
        {/* FRS Lite Option */}
        <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer bg-secondary/30"
          onClick={() => setSelectedType('lite')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              checked={selectedType === 'lite'}
              onChange={() => setSelectedType('lite')}
              className="mt-1"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">FRS Lite (1 Page)</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Summary view with score, band, trajectory, and verification status.
              </p>
              <p className="text-xs text-primary mt-2">✓ Verification-backed summary</p>
            </div>
          </div>
        </div>

        {/* FRS Full Option */}
        <div className="border border-border rounded-lg p-4 hover:border-primary/50 transition-all cursor-pointer bg-secondary/30"
          onClick={() => setSelectedType('lite')}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              disabled
              className="mt-1 opacity-50 cursor-not-allowed"
            />
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Full FRS Report</h4>
              <p className="text-xs text-muted-foreground mt-1">
                Complete report with all sections and detailed analysis.
              </p>
              <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                🔒 Available only for student download (coming soon)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <Button
        onClick={handleExportLite}
        disabled={!selectedType || isExporting}
        className="w-full gap-2 mt-4"
      >
        <FileDown className="w-4 h-4" />
        {isExporting ? 'Generating PDF...' : 'Download FRS Lite PDF'}
      </Button>

      <div className="bg-primary/5 border border-primary/20 rounded-lg p-3">
        <p className="text-xs text-muted-foreground">
          ✓ FRS Lite PDF includes QR code for instant access to live FRS page.
        </p>
      </div>

      {showFullWarning && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3">
          <div className="flex gap-2">
            <AlertCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-700 dark:text-yellow-400">
              You are exporting your full FRS report. This contains detailed information about your academic, skill, and career readiness. Full reports are for your records only.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// Placeholder PDF generation functions
async function generatePDFLite(frsId: string, score: number): Promise<string> {
  // In production, use html2pdf or pdfkit to generate proper PDF
  // This is a placeholder
  return 'data:application/pdf;base64,JVBERi0xLjQK';
}

async function generatePDFFull(frsId: string, score: number): Promise<string> {
  // In production, generate full report PDF
  return 'data:application/pdf;base64,JVBERi0xLjQK';
}
