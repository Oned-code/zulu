import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Briefcase, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ZuluFun - Authentication',
  description: 'Sign in or create your ZuluFun account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-zulu-mist">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl grid-cols-1 lg:grid-cols-[0.95fr_1.05fr]">
        <aside className="relative hidden overflow-hidden bg-zulu-indigo px-10 py-12 text-zulu-gold lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(244,183,64,0.16),transparent_38%),radial-gradient(circle_at_15%_20%,rgba(244,183,64,0.18),transparent_28%)]" />
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-zulu-gold text-zulu-indigo">
                <Briefcase className="h-6 w-6" />
              </span>
              <span>
                <span className="block text-2xl font-bold leading-none">Azania<span className='text-2xl font-normal'>Connect</span></span>
                <span className="text-sm text-zulu-gold/65">Africa's business engine</span>
              </span>
            </Link>
          </div>

          <div className="relative max-w-lg">
            <p className="mb-5 text-sm font-semibold uppercase tracking-wider text-zulu-gold/60">Business access</p>
            <h2 className="text-5xl font-bold leading-tight text-white">
              Sign in to manage leads, quotes, and growth signals.
            </h2>
            <div className="mt-8 grid gap-4 text-sm text-zulu-gold/75">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zulu-gold" />
                Verified provider workflows
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zulu-gold" />
                Market insights and business reporting
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-zulu-gold" />
                Quote requests from high-intent customers
              </div>
            </div>
          </div>

          <p className="relative text-sm text-zulu-gold/55">
            Built for African service businesses that need sharper demand, cleaner operations, and faster follow-up.
          </p>
        </aside>

        <section className="flex items-center justify-center px-4 py-12 sm:px-6 lg:px-12">
          <div className="w-full max-w-md">
            <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zulu-indigo/60 transition-colors hover:text-zulu-indigo lg:hidden">
              <ArrowLeft className="h-4 w-4" />
              Back to ZuluFun.io
            </Link>
            <div className="rounded-lg border border-zulu-indigo/10 bg-white p-6 shadow-xl shadow-zulu-indigo/10 sm:p-8">
              {children}
            </div>
            <p className="mt-6 text-center text-xs leading-5 text-zulu-indigo/50">
              By continuing, you agree to ZuluFun&apos;s{' '}
              <Link href="/terms" className="font-medium text-zulu-indigo hover:text-zulu-gold">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-zulu-indigo hover:text-zulu-gold">
                Privacy Policy
              </Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
