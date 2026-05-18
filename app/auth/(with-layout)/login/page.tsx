'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Lock, Mail } from 'lucide-react';
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
      <div className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-zulu-gold">Welcome back</p>
        <h1 className="text-3xl font-bold tracking-tight text-zulu-indigo">
          Sign in to ZuluFun
        </h1>
        <p className="mt-3 text-sm leading-6 text-zulu-indigo/60">
          Access your dashboard, manage leads, and keep your business pipeline moving.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-semibold text-zulu-indigo">
            Email address
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zulu-indigo/35" />
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`h-12 w-full rounded-md border bg-white pl-10 pr-4 text-sm text-zulu-indigo shadow-sm outline-none transition focus:border-zulu-gold focus:ring-4 focus:ring-zulu-gold/15 ${
                errors.email ? 'border-zulu-red' : 'border-zulu-indigo/15'
              }`}
              placeholder="you@company.com"
            />
          </div>
          {errors.email && <p className="text-sm text-zulu-red">{errors.email.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-4">
            <label htmlFor="password" className="block text-sm font-semibold text-zulu-indigo">
              Password
            </label>
            <Link href="/auth/forgot-password" className="text-sm font-medium text-zulu-indigo/55 transition-colors hover:text-zulu-gold">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zulu-indigo/35" />
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`h-12 w-full rounded-md border bg-white pl-10 pr-4 text-sm text-zulu-indigo shadow-sm outline-none transition focus:border-zulu-gold focus:ring-4 focus:ring-zulu-gold/15 ${
                errors.password ? 'border-zulu-red' : 'border-zulu-indigo/15'
              }`}
              placeholder="Enter your password"
            />
          </div>
          {errors.password && <p className="text-sm text-zulu-red">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="group flex h-12 w-full items-center justify-center gap-2 rounded-md bg-zulu-indigo px-4 text-sm font-semibold text-white shadow-lg shadow-zulu-indigo/20 transition hover:bg-zulu-indigo/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? 'Signing in...' : 'Sign in'}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>

      <div className="mt-8 rounded-lg bg-zulu-mist px-4 py-4 text-center text-sm text-zulu-indigo/65">
        Don&apos;t have an account?{' '}
        <Link href="/auth/register" className="font-semibold text-zulu-indigo transition-colors hover:text-zulu-gold">
          Create one
        </Link>
      </div>
    </>
  );
}
