'use client';

import { useAuth } from '@/lib/auth-context';
import Link from 'next/link';
import { Building2, Users, TrendingUp, CreditCard, Settings, Bell } from 'lucide-react';
import { StatsCard } from '@/components/shared/stats-card';

export default function DashboardPage() {
  const { user, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zulu-indigo/5">
        <div className="text-zulu-indigo/50">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zulu-indigo/5 space-y-4">
        <p className="text-zulu-indigo/60">Please sign in to access your dashboard.</p>
        <Link href="/auth/login" className="px-6 py-2.5 bg-zulu-gold text-zulu-indigo font-medium rounded-lg hover:bg-zulu-gold/90 transition-colors">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zulu-indigo/5">
      {/* Dashboard Header */}
      <header className="bg-zulu-indigo text-zulu-gold">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Welcome back, {user.user_metadata?.full_name || 'User'}</h1>
              <p className="text-zulu-gold/60 text-sm mt-1">Manage your ZuluFun business account</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-lg hover:bg-zulu-indigo/80 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-zulu-red rounded-full" />
              </button>
              <Link href="/auth/profile" className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-zulu-indigo/80 transition-colors">
                <Settings className="h-4 w-4" />
                <span className="text-sm">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard icon={Users} value="12" label="Active Leads" trend={{ value: 8, isPositive: true }} />
          <StatsCard icon={Building2} value="3" label="Business Listings" />
          <StatsCard icon={TrendingUp} value="24%" label="Conversion Rate" trend={{ value: 3, isPositive: true }} />
          <StatsCard icon={CreditCard} value="R4,250" label="Monthly Spend" />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/quotes" className="bg-white rounded-xl border border-zulu-indigo/10 p-6 hover:border-zulu-gold/30 transition-all group">
            <h3 className="text-zulu-indigo font-semibold group-hover:text-zulu-gold transition-colors">Get Quotes</h3>
            <p className="text-zulu-indigo/50 text-sm mt-1">Request quotes from verified service providers</p>
          </Link>
          <Link href="/dashboard/leads" className="bg-white rounded-xl border border-zulu-indigo/10 p-6 hover:border-zulu-gold/30 transition-all group">
            <h3 className="text-zulu-indigo font-semibold group-hover:text-zulu-gold transition-colors">View Leads</h3>
            <p className="text-zulu-indigo/50 text-sm mt-1">Manage your incoming leads and contacts</p>
          </Link>
          <Link href="/dashboard/analytics" className="bg-white rounded-xl border border-zulu-indigo/10 p-6 hover:border-zulu-gold/30 transition-all group">
            <h3 className="text-zulu-indigo font-semibold group-hover:text-zulu-gold transition-colors">Analytics</h3>
            <p className="text-zulu-indigo/50 text-sm mt-1">Track your performance and ROI</p>
          </Link>
        </div>
      </main>
    </div>
  );
}
