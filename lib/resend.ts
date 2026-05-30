import { Resend } from 'resend';

let resend: Resend | null = null;

export function getResendClient(): Resend | null {
  if (resend) return resend;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — emails will not be sent');
    return null;
  }

  resend = new Resend(apiKey);
  return resend;
}

export function isEmailEnabled(): boolean {
  return !!process.env.RESEND_API_KEY;
}
