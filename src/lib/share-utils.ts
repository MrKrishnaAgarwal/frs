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

// PDF Generation helper functions
export const generatePDFCanvas = (): HTMLCanvasElement => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');
  return canvas;
};

// Generate FRS Lite PDF using Canvas
export const generateFRSLitePDF = async (
  frsId: string,
  score: number,
  qrDataUrl?: string
): Promise<Blob> => {
  const canvas = generatePDFCanvas();
  canvas.width = 800;
  canvas.height = 1100; // A4 aspect ratio

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Set background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 36px Roboto';
  ctx.fillText('Future Ready Score', 50, 80);
  ctx.fillStyle = '#fafaf8';
  ctx.font = '16px Roboto';
  ctx.fillText('Summary Report', 50, 110);

  // FRS ID
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto Mono';
  ctx.fillText(`FRS ID: ${frsId}`, 50, 160);

  // Timestamp
  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillText(`Generated: ${timestamp}`, 50, 185);

  // Score Box
  ctx.fillStyle = '#ffc50f';
  ctx.fillRect(50, 220, 700, 200);
  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 72px Roboto';
  ctx.textAlign = 'center';
  ctx.fillText(String(score), 400, 360);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '18px Roboto';
  ctx.fillText('/ 1000', 400, 385);

  // Band
  const band = score >= 750 ? 'FUTURE-READY' : score >= 500 ? 'READY' : 'EMERGING';
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.textAlign = 'left';
  ctx.fillText(`Band: ${band}`, 50, 490);

  // Verification badge
  ctx.fillStyle = '#4ade80';
  ctx.fillRect(50, 520, 700, 40);
  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 14px Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('✓ Verification-backed Summary', 400, 548);

  // QR Code section - draw placeholder
  ctx.fillStyle = '#fafaf8';
  ctx.font = '12px Roboto';
  ctx.textAlign = 'left';
  ctx.fillText('Scan to access live FRS page:', 50, 620);

  // Draw QR code if available
  if (qrDataUrl) {
    try {
      await new Promise<void>((resolve, reject) => {
        const qrImg = new Image();
        qrImg.onload = () => {
          ctx.drawImage(qrImg, 50, 640, 200, 200);
          resolve();
        };
        qrImg.onerror = reject;
        qrImg.src = qrDataUrl;
      });
    } catch (err) {
      console.warn('Failed to load QR code image:', err);
      // Draw QR placeholder instead
      ctx.fillStyle = '#2a2a2a';
      ctx.fillRect(50, 640, 200, 200);
      ctx.fillStyle = '#666';
      ctx.font = '12px Roboto';
      ctx.textAlign = 'center';
      ctx.fillText('QR Code', 150, 740);
    }
  } else {
    // Draw QR placeholder
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(50, 640, 200, 200);
  }

  // Footer disclaimer
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '10px Roboto';
  ctx.textAlign = 'center';
  ctx.fillText(
    'Shared with student consent. Summary view only. Full data access requires explicit approval.',
    400,
    1050
  );

  // Convert to blob
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error('Failed to create blob from canvas'));
        }
      },
      'image/png',
      0.95
    );
  });
};

// Generate Full FRS PDF using Canvas
export const generateFRSFullPDF = async (
  frsId: string,
  score: number
): Promise<Blob> => {
  const canvas = generatePDFCanvas();
  canvas.width = 800;
  canvas.height = 1600; // Full page

  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Could not get canvas context');

  // Set background
  ctx.fillStyle = '#0a0a0a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Title
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 36px Roboto';
  ctx.fillText('Future Ready Score', 50, 80);
  ctx.fillStyle = '#fafaf8';
  ctx.font = '16px Roboto';
  ctx.fillText('Complete Report', 50, 110);

  // FRS ID & Timestamp
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto Mono';
  ctx.fillText(`FRS ID: ${frsId}`, 50, 160);

  const now = new Date();
  const timestamp = now.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  ctx.fillText(`Generated: ${timestamp}`, 50, 185);

  // Watermark
  ctx.fillStyle = 'rgba(255, 197, 15, 0.1)';
  ctx.font = 'bold 48px Roboto';
  ctx.save();
  ctx.globalAlpha = 0.15;
  ctx.rotate((-Math.PI / 180) * 45);
  ctx.fillText('Student Copy', -200, 400);
  ctx.restore();

  // Score section
  ctx.fillStyle = '#ffc50f';
  ctx.fillRect(50, 220, 700, 200);
  ctx.fillStyle = '#0a0a0a';
  ctx.font = 'bold 72px Roboto';
  ctx.textAlign = 'center';
  ctx.fillText(String(score), 400, 360);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '18px Roboto';
  ctx.fillText('/ 1000', 400, 385);

  // Band
  const band = score >= 750 ? 'FUTURE-READY' : score >= 500 ? 'READY' : 'EMERGING';
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.textAlign = 'left';
  ctx.fillText(`Band: ${band}`, 50, 490);

  // Section headers with content placeholders
  let yPos = 550;

  // Learning Readiness Section
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.fillText('1. Learning Readiness', 50, yPos);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto';
  yPos += 30;
  ctx.fillText('Assessment of academic foundation and learning approach', 50, yPos);
  ctx.fillText('Score: 78/100 | Percentile: 85th', 50, yPos + 25);
  yPos += 60;

  // Skills Assessment Section
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.fillText('2. Skills Assessment', 50, yPos);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto';
  yPos += 30;
  ctx.fillText('Evaluation of technical and soft skills proficiency', 50, yPos);
  ctx.fillText('Score: 75/100 | Percentile: 82nd', 50, yPos + 25);
  yPos += 60;

  // Career Alignment Section
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.fillText('3. Career Alignment', 50, yPos);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto';
  yPos += 30;
  ctx.fillText('Match with emerging career pathways and opportunities', 50, yPos);
  ctx.fillText('Score: 76/100 | Percentile: 80th', 50, yPos + 25);
  yPos += 60;

  // Social Readiness Section
  ctx.fillStyle = '#ffc50f';
  ctx.font = 'bold 16px Roboto';
  ctx.fillText('4. Social Readiness', 50, yPos);
  ctx.fillStyle = '#a1a1a0';
  ctx.font = '12px Roboto';
  yPos += 30;
  ctx.fillText('Assessment of collaboration and leadership capabilities', 50, yPos);
  ctx.fillText('Score: 74/100 | Percentile: 78th', 50, yPos + 25);

  // Footer watermark
  ctx.fillStyle = 'rgba(255, 197, 15, 0.1)';
  ctx.font = '10px Roboto';
  ctx.textAlign = 'center';
  ctx.fillText('This document is confidential and for the student only.', 400, 1550);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      }
    }, 'image/png');
  });
};
