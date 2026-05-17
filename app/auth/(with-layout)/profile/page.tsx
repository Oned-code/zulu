'use client';

import { useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { toast } from '@/lib/toast-client';
import { useAuth } from '@/lib/auth-context';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
});

export default function ProfilePage() {
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.user_metadata?.full_name || '',
        email: user.email || '',
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: z.infer<typeof schema>) => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/auth/update-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Failed to update profile');
      }

      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to update profile';
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success('Signed out successfully!');
    } catch {
      toast.error('Failed to sign out');
    }
  };

  if (authLoading) {
    return (
      <div className="text-center text-zulu-gold/60">Loading...</div>
    );
  }

  if (!user) {
    return (
      <div className="text-center space-y-4">
        <p className="text-zulu-gold/60">Please sign in to view your profile.</p>
        <Link href="/auth/login" className="inline-block text-zulu-gold hover:text-zulu-gold/80 underline">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-center text-zulu-gold">
        Profile
      </h1>

      {isEditing ? (
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
              disabled
              className="w-full px-4 py-3 rounded-lg bg-white/5 border border-zulu-gold/10 text-zulu-gold/50 cursor-not-allowed"
            />
            <p className="text-xs text-zulu-gold/40">Email cannot be changed</p>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="py-2 px-4 border border-zulu-gold/20 rounded-lg text-sm font-medium text-zulu-gold/70 hover:bg-white/5 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="py-2 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      ) : (
        <>
          <div className="text-center space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zulu-gold text-zulu-indigo text-2xl font-bold mx-auto">
              {(user.user_metadata?.full_name || user.email || 'U').charAt(0).toUpperCase()}
            </div>
            <h2 className="text-xl font-bold text-zulu-gold">
              {user.user_metadata?.full_name || 'User'}
            </h2>
            <p className="text-zulu-gold/60 text-sm">{user.email}</p>
            <p className="text-zulu-gold/40 text-xs">
              Member since {new Date(user.created_at).toLocaleDateString('en-ZA', { year: 'numeric', month: 'long' })}
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 transition-all"
            >
              Edit Profile
            </button>

            <button
              onClick={handleSignOut}
              className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium border border-red-400/30 text-red-400 hover:bg-red-400/10 transition-all"
            >
              Sign Out
            </button>
          </div>
        </>
      )}
    </>
  );
}
