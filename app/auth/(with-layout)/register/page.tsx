'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const schema = z.object({
  accountType: z.enum(['consumer', 'business']),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  company_name: z.string().optional(),
  niche: z.string().optional(),
  city: z.string().optional(),
}).refine(data => {
  if (data.accountType === 'business') {
    return !!data.company_name && !!data.niche && !!data.city;
  }
  return true;
}, {
  message: "Business details are required",
  path: ["company_name"],
});

type RegisterFormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [accountType, setAccountType] = useState<'consumer' | 'business'>('business');
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
    defaultValues: { accountType: 'business' }
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    const supabase = createClient();
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            full_name: data.name,
            role: data.accountType,
            company_name: data.accountType === 'business' ? data.company_name : null,
            niche: data.accountType === 'business' ? data.niche : null,
            city: data.accountType === 'business' ? data.city : null,
          }
        }
      });

      if (error) throw error;
      
      setIsSuccess(true);
      reset();
    } catch (error: any) {
      alert(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="h-12 w-12 flex items-center justify-center bg-green-500/20 text-green-400 rounded-full mx-auto text-xl">✓</div>
        <h1 className="text-2xl font-bold text-zulu-gold">Check Your Email</h1>
        <p className="text-zulu-gold/60 text-sm">We've sent a verification link. Please click it to activate your account.</p>
        <Link href="/auth/login" className="inline-block mt-4 text-zulu-gold hover:text-zulu-gold/80 text-sm underline">
          Back to Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-2 text-2xl font-bold text-center text-zulu-gold">Create Account</h1>
      <p className="mb-6 text-center text-zulu-gold/60 text-sm">Join ZuluFun to discover and promote African businesses</p>

      <div className="flex bg-white/5 rounded-lg p-1 mb-6">
        <button
          type="button"
          onClick={() => { setAccountType('consumer'); setValue('accountType', 'consumer'); }}
          className={`flex-1 text-sm py-2 rounded-md transition-colors ${accountType === 'consumer' ? 'bg-zulu-gold text-zulu-indigo font-bold' : 'text-zulu-gold hover:bg-white/5'}`}
        >
          Consumer
        </button>
        <button
          type="button"
          onClick={() => { setAccountType('business'); setValue('accountType', 'business'); }}
          className={`flex-1 text-sm py-2 rounded-md transition-colors ${accountType === 'business' ? 'bg-zulu-gold text-zulu-indigo font-bold' : 'text-zulu-gold hover:bg-white/5'}`}
        >
          Business
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
        <div className="space-y-1">
          <label className="block text-sm font-medium text-zulu-gold/80">Full Name</label>
          <input {...register('name')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold" />
          {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-zulu-gold/80">Email</label>
          <input type="email" {...register('email')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold" />
          {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
        </div>

        {accountType === 'business' && (
          <>
            <div className="space-y-1">
              <label className="block text-sm font-medium text-zulu-gold/80">Company Name</label>
              <input {...register('company_name')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold" />
            </div>
            
            <div className="space-y-1">
              <label className="block text-sm font-medium text-zulu-gold/80">Industry / Niche</label>
              <select {...register('niche')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold focus:outline-none focus:ring-2 focus:ring-zulu-gold appearance-none">
                <option value="" className="text-zinc-900">Select Industry...</option>
                <option value="power" className="text-zinc-900">Solar & Energy</option>
                <option value="security" className="text-zinc-900">Security Systems</option>
                <option value="real_estate" className="text-zinc-900">Real Estate</option>
                <option value="automotive" className="text-zinc-900">Automotive</option>
                <option value="education" className="text-zinc-900">Education</option>
                <option value="crypto" className="text-zinc-900">Crypto</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block text-sm font-medium text-zulu-gold/80">Operating City</label>
              <input {...register('city')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold" />
            </div>
          </>
        )}

        <div className="space-y-1">
          <label className="block text-sm font-medium text-zulu-gold/80">Password</label>
          <input type="password" {...register('password')} className="w-full px-4 py-2.5 rounded-lg bg-white/10 border border-zulu-gold/20 text-zulu-gold placeholder-zulu-gold/30 focus:outline-none focus:ring-2 focus:ring-zulu-gold" />
          {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isLoading} className="w-full mt-4 flex justify-center py-3 px-4 rounded-lg text-sm font-bold bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 transition-all">
          {isLoading ? 'Processing...' : accountType === 'business' ? 'Create Business Account' : 'Create Consumer Account'}
        </button>
      </form>

      <div className="text-center text-sm text-zulu-gold/50 mt-6">
        Already have an account? <Link href="/auth/login" className="font-medium text-zulu-gold hover:underline">Sign In</Link>
      </div>
    </>
  );
}
