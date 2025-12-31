import { jsPDF } from 'jspdf';

// Access logging for share actions
export interface ShareLog {
  action: 'link' | 'qr' | 'pdf-lite' | 'pdf-full';
  timestamp: string;
  visibilityLevel: 'lite' | 'full';
  frsId: string;
}

export const logShareAction = (log: ShareLog) => {
  // In a real app, this would send to backend
  const existingLogs = JSON.parse(localStorage.getItem('frs_share_logs') || '[]');
  existingLogs.push(log);
  localStorage.setItem('frs_share_logs', JSON.stringify(existingLogs));
  console.log('Share action logged:', log);
};

export const getShareLogs = (frsId: string): ShareLog[] => {
  const logs = JSON.parse(localStorage.getItem('frs_share_logs') || '[]');
  return logs.filter((log: ShareLog) => log.frsId === frsId);
};

// Consent checking
export const canSharePublicly = (isPublicVisible: boolean): boolean => {
  return isPublicVisible;
};

// Share URLs
export const getFRSLiteUrl = (frsId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
  return `${baseUrl}/u/${frsId}`;
};

// Copy to clipboard helper with fallback
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // Try modern Clipboard API first
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (err) {
    console.warn('Clipboard API failed, using fallback:', err);
  }

  // Fallback to older execCommand method
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);

    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);

    return success;
  } catch (fallbackErr) {
    console.error('Fallback copy method failed:', fallbackErr);
    return false;
  }
};

// QR Code data URL generation
export const generateQRDataUrl = async (text: string): Promise<string> => {
  // Will be used with qrcode.react to generate the QR code
  return text;
};

// PDF Generation helper functions using jsPDF

export const generatePDFCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  return canvas;
};

// Generate FRS Lite PDF using jsPDF
export const generateFRSLitePDF = async (
  frsId: string,
  score: number,
  qrDataUrl?: string
): Promise<Blob> => {
  // Create PDF document (A4 size)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPos = 15;

  // Set background color
  pdf.setFillColor(10, 10, 10);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(255, 197, 15);
  pdf.text('Future Ready Score', 15, yPos);

  // Subtitle
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(250, 250, 248);
  pdf.text('Summary Report', 15, yPos + 8);

  yPos += 20;

  // FRS ID
  pdf.setFont('courier', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(161, 161, 160);
  pdf.text(`FRS ID: ${frsId}`, 15, yPos);

  // Timestamp
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  pdf.text(`Generated: ${timestamp}`, 15, yPos + 6);

  yPos += 20;

  // Score box (yellow background)
  pdf.setFillColor(255, 197, 15);
  pdf.rect(15, yPos, pageWidth - 30, 40, 'F');

  // Score text
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(36);
  pdf.setTextColor(10, 10, 10);
  pdf.text(String(score), pageWidth / 2, yPos + 25, { align: 'center' });

  // Score out of
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(14);
  pdf.setTextColor(161, 161, 160);
  pdf.text('/ 1000', pageWidth / 2, yPos + 35, { align: 'center' });

  yPos += 50;

  // Band
  const band = score >= 750 ? 'FUTURE-READY' : score >= 500 ? 'READY' : 'EMERGING';
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(255, 197, 15);
  pdf.text(`Band: ${band}`, 15, yPos);

  yPos += 12;

  // Verification badge
  pdf.setFillColor(74, 222, 128);
  pdf.rect(15, yPos, pageWidth - 30, 10, 'F');
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(10);
  pdf.setTextColor(10, 10, 10);
  pdf.text('✓ Verification-backed Summary', pageWidth / 2, yPos + 6.5, { align: 'center' });

  yPos += 18;

  // QR Code section label
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(250, 250, 248);
  pdf.text('Scan to access live FRS page:', 15, yPos);

  yPos += 8;

  // QR Code or placeholder
  if (qrDataUrl) {
    try {
      pdf.addImage(qrDataUrl, 'PNG', 15, yPos, 50, 50);
    } catch (err) {
      console.warn('Failed to add QR to PDF:', err);
      // Draw placeholder
      pdf.setFillColor(42, 42, 42);
      pdf.rect(15, yPos, 50, 50, 'F');
    }
  } else {
    // Draw placeholder
    pdf.setFillColor(42, 42, 42);
    pdf.rect(15, yPos, 50, 50, 'F');
  }

  yPos = pageHeight - 20;

  // Footer disclaimer
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(161, 161, 160);
  const disclaimer = 'Shared with student consent. Summary view only. Full data access requires explicit approval.';
  pdf.text(disclaimer, pageWidth / 2, yPos, { align: 'center', maxWidth: pageWidth - 30 });

  return new Promise<Blob>((resolve, reject) => {
    try {
      const blob = pdf.output('blob') as Blob;
      resolve(blob);
    } catch (err) {
      reject(err);
    }
  });
};

// Generate Full FRS PDF using jsPDF
export const generateFRSFullPDF = async (
  frsId: string,
  score: number
): Promise<Blob> => {
  // Create PDF document (A4 size)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  let yPos = 15;

  const addNewPage = () => {
    pdf.addPage();
    yPos = 15;
  };

  // Set background color for first page
  pdf.setFillColor(10, 10, 10);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Title
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(28);
  pdf.setTextColor(255, 197, 15);
  pdf.text('Future Ready Score', 15, yPos);

  // Subtitle
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(12);
  pdf.setTextColor(250, 250, 248);
  pdf.text('Complete Report', 15, yPos + 8);

  yPos += 20;

  // FRS ID & Timestamp
  pdf.setFont('courier', 'normal');
  pdf.setFontSize(10);
  pdf.setTextColor(161, 161, 160);
  pdf.text(`FRS ID: ${frsId}`, 15, yPos);

  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  pdf.text(`Generated: ${timestamp}`, 15, yPos + 6);

  yPos += 20;

  // Score box (yellow background)
  pdf.setFillColor(255, 197, 15);
  pdf.rect(15, yPos, pageWidth - 30, 40, 'F');

  // Score text
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(36);
  pdf.setTextColor(10, 10, 10);
  pdf.text(String(score), pageWidth / 2, yPos + 25, { align: 'center' });

  // Score out of
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(14);
  pdf.setTextColor(161, 161, 160);
  pdf.text('/ 1000', pageWidth / 2, yPos + 35, { align: 'center' });

  yPos += 50;

  // Band
  const band = score >= 750 ? 'FUTURE-READY' : score >= 500 ? 'READY' : 'EMERGING';
  pdf.setFont('roboto', 'bold');
  pdf.setFontSize(12);
  pdf.setTextColor(255, 197, 15);
  pdf.text(`Band: ${band}`, 15, yPos);

  yPos += 15;

  // Section headers with content
  const sections = [
    {
      title: '1. Learning Readiness',
      description: 'Assessment of academic foundation and learning approach',
      score: 78,
      percentile: 85,
    },
    {
      title: '2. Skills Assessment',
      description: 'Evaluation of technical and soft skills proficiency',
      score: 75,
      percentile: 82,
    },
    {
      title: '3. Career Alignment',
      description: 'Match with emerging career pathways and opportunities',
      score: 76,
      percentile: 80,
    },
    {
      title: '4. Social Readiness',
      description: 'Assessment of collaboration and leadership capabilities',
      score: 74,
      percentile: 78,
    },
  ];

  sections.forEach((section) => {
    // Check if we need a new page
    if (yPos > pageHeight - 40) {
      addNewPage();
      // Set background for new page
      pdf.setFillColor(10, 10, 10);
      pdf.rect(0, 0, pageWidth, pageHeight, 'F');
    }

    // Section title
    pdf.setFont('roboto', 'bold');
    pdf.setFontSize(12);
    pdf.setTextColor(255, 197, 15);
    pdf.text(section.title, 15, yPos);

    yPos += 7;

    // Description
    pdf.setFont('roboto', 'normal');
    pdf.setFontSize(10);
    pdf.setTextColor(161, 161, 160);
    pdf.text(section.description, 15, yPos);

    yPos += 7;

    // Score and percentile
    pdf.text(`Score: ${section.score}/100 | Percentile: ${section.percentile}th`, 15, yPos);

    yPos += 12;
  });

  yPos = pageHeight - 20;

  // Footer disclaimer
  pdf.setFont('roboto', 'normal');
  pdf.setFontSize(8);
  pdf.setTextColor(161, 161, 160);
  const disclaimer = 'This document is confidential and for the student only.';
  pdf.text(disclaimer, pageWidth / 2, yPos, { align: 'center' });

  return new Promise<Blob>((resolve, reject) => {
    try {
      const blob = pdf.output('blob') as Blob;
      resolve(blob);
    } catch (err) {
      reject(err);
    }
  });
};
