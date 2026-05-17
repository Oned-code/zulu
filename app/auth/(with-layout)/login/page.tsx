'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast-client';

const schema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
});

type LoginFormData = z.infer<typeof schema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Login failed');
      }

      toast.success('Logged in successfully!');
      router.push('/dashboard');
      router.refresh();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">
        Welcome Back
      </h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">
        Sign in to your ZuluFun account
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-zulu-gold/80">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            {...register('email')}
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.email ? 'border-red-400' : 'border-zulu-gold/20'} text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-zulu-gold/80">
            Password
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.password ? 'border-red-400' : 'border-zulu-gold/20'} text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
        </div>

        <div className="text-right">
          <Link href="/auth/forgot-password" className="text-sm text-zulu-gold/60 hover:text-zulu-gold transition-colors">
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      <div className="text-center text-sm text-zulu-gold/50">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-medium text-zulu-gold hover:text-zulu-gold/80 transition-colors">
          Sign Up
        </Link>
      </div>
    </>
  );
}
