'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from '@/lib/toast-client';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(/[a-z]/, { message: 'Must contain a lowercase letter' })
    .regex(/[A-Z]/, { message: 'Must contain an uppercase letter' })
    .regex(/[0-9]/, { message: 'Must contain a number' }),
});

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Registration failed');
      }

      setIsSuccess(true);
      toast.success('Account created! Check your email to verify.');
      reset();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Registration failed';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="h-12 w-12 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full mx-auto text-xl">
          {'✓'}
        </div>
        <h1 className="text-2xl font-bold text-zulu-gold">Check Your Email</h1>
        <p className="text-zulu-gold/60 text-sm">
          We&apos;ve sent a verification link to your email. Please click it to activate your account.
        </p>
        <Link
          href="/auth/login"
          className="inline-block mt-4 text-zulu-gold hover:text-zulu-gold/80 text-sm underline"
        >
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">
        Create Your Account
      </h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">
        Join ZuluFun to discover and promote African businesses
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-zulu-gold/80">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            {...register('name')}
            className={`w-full px-4 py-3 rounded-lg bg-white/10 border ${errors.name ? 'border-red-400' : 'border-zulu-gold/20'} text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold focus:border-transparent`}
            placeholder="Enter your full name"
          />
          {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
        </div>

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
            placeholder="Create a strong password"
          />
          {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Creating Account...' : 'Sign Up'}
        </button>
      </form>

      <div className="text-center text-sm text-zulu-gold/50">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-zulu-gold hover:text-zulu-gold/80 transition-colors">
          Sign In
        </Link>
      </div>
    </>
  );
}
