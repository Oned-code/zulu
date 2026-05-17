'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast-client';
import { z } from 'zod';

const schema = z.object({
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, { message: 'Must contain a lowercase letter' })
    .regex(/[A-Z]/, { message: 'Must contain an uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain a number' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export function ResetPasswordForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = schema.safeParse({ password, confirmPassword });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to reset password');
      }

      toast.success('Password reset successfully!');
      router.push('/auth/login');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-zulu-gold/80">
          New Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.password ? 'border-red-400' : 'border-zulu-gold/20'} text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent`}
          placeholder="Enter new password"
        />
        {errors.password && <p className="text-sm text-red-400">{errors.password}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-zulu-gold/80">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.confirmPassword ? 'border-red-400' : 'border-zulu-gold/20'} text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent`}
          placeholder="Confirm new password"
        />
        {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
      >
        {isLoading ? 'Resetting...' : 'Reset Password'}
      </button>
    </form>
  );
}
