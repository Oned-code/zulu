'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { toast } from '@/lib/toast-client';

const schema = z.object({
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetFormData = z.infer<typeof schema>;

export default function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ResetFormData) => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) throw error;
      
      toast.success('Password updated successfully');
      router.push('/dashboard');
    } catch (error: any) {
      toast.error(error.message || 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">Set New Password</h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">Please enter your new password below.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zulu-gold/80">New Password</label>
          <input
            {...register('password')}
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
          />
          {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zulu-gold/80">Confirm Password</label>
          <input
            {...register('confirmPassword')}
            type="password"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold"
          />
          {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-bold bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 transition-all">
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </>
  );
}
