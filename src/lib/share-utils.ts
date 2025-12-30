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

// Copy to clipboard helper
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    console.error('Failed to copy:', err);
    return false;
  }
};

// QR Code data URL generation
export const generateQRDataUrl = async (text: string): Promise<string> => {
  // Will be used with qrcode.react to generate the QR code
  return text;
};
