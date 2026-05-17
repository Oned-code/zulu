'use client';

import { useState } from 'react';
import { toast } from '@/lib/toast-client';

export function ForgotPasswordForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setIsSubmitted(true);
      toast.success('Password reset link sent! Check your email.');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-4">
        <div className="h-12 w-12 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full mx-auto text-xl">
          ✓
        </div>
        <p className="text-zulu-gold/80 text-sm">
          If an account exists with <strong>{email}</strong>, you will receive a password reset link shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-zulu-gold/80">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent"
          placeholder="Enter your email"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading || !email}
        className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Sending...' : 'Send Reset Link'}
      </button>
    </form>
  );
}
