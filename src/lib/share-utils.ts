// PDF and share utility functions

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


// Generate FRS Lite PDF - Returns the pre-designed PDF
export const generateFRSLitePDF = async (
  frsId: string,
  score: number,
  qrDataUrl?: string
): Promise<Blob> => {
  // Fetch the pre-designed PDF from public folder
  const response = await fetch('/FRS_REPORT_KRISHNA_AGARWAL.pdf');
  if (!response.ok) {
    throw new Error('Failed to fetch FRS report PDF');
  }
  return await response.blob();
};

// Generate Full FRS PDF - Returns the pre-designed PDF
export const generateFRSFullPDF = async (
  frsId: string,
  score: number
): Promise<Blob> => {
  // Fetch the pre-designed PDF from public folder (same comprehensive report)
  const response = await fetch('/FRS_REPORT_KRISHNA_AGARWAL.pdf');
  if (!response.ok) {
    throw new Error('Failed to fetch FRS report PDF');
  }
  return await response.blob();
};
