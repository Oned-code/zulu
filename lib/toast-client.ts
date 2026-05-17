'use client';

type ToastType = 'success' | 'error' | 'info' | 'warning';

function showToast(message: string, type: ToastType = 'info') {
  if (typeof window === 'undefined') return;
  // Simple console-based toast for now
  // Can be replaced with a proper UI toast component later
  const prefix = type === 'success' ? '✓' : type === 'error' ? '✗' : type === 'warning' ? '⚠' : 'ℹ';
  console.log(`[${prefix}] ${message}`);
}

export const toast = Object.assign(
  (message: string) => showToast(message, 'info'),
  {
    success: (message: string) => showToast(message, 'success'),
    error: (message: string) => showToast(message, 'error'),
    info: (message: string) => showToast(message, 'info'),
    warning: (message: string) => showToast(message, 'warning'),
  }
);
