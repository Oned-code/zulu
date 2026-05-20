'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/lib/toast-client';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
});

type ForgotFormData = z.infer<typeof schema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ForgotFormData) => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) throw error;
      
      setIsSuccess(true);
      toast.success('Password reset email sent');
    } catch (error: any) {
      toast.error(error.message || 'Failed to send reset email');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="h-12 w-12 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full mx-auto text-xl">✓</div>
        <h1 className="text-2xl font-bold text-zulu-gold">Check Your Email</h1>
        <p className="text-zulu-gold/60 text-sm">We've sent a password reset link to your email.</p>
        <Link href="/auth/login" className="inline-block mt-4 text-zulu-gold hover:text-zulu-gold/80 text-sm underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">Reset Password</h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">Enter your email and we'll send you a link to reset your password.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zulu-gold/80">Email Address</label>
          <input
            {...register('email')}
            type="email"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-bold bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 transition-all">
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      <div className="text-center text-sm text-zulu-gold/50 mt-6">
        Remembered your password? <Link href="/auth/login" className="font-medium text-zulu-gold hover:underline">Sign In</Link>
      </div>
    </>
  );
}
