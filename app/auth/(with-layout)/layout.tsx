import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ZuluFun — Authentication',
  description: 'Sign in or create your ZuluFun account',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-zulu-indigo via-zulu-indigo/95 to-zulu-indigo py-12 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link href="/" className="flex flex-col items-center space-y-2">
          <span className="text-zulu-gold font-bold text-3xl tracking-tight">
            ZuluFun.io
          </span>
          <span className="text-zulu-gold/60 text-xs tracking-wider uppercase">
            Africa&apos;s Autonomous Business Engine
          </span>
        </Link>
      </div>

      <div className="w-full max-w-md bg-white/5 backdrop-blur-sm border border-zulu-gold/20 rounded-2xl shadow-2xl p-8 space-y-8">
        {children}
      </div>

      <div className="mt-8 text-center">
        <p className="text-zulu-gold/40 text-xs">
          By continuing, you agree to ZuluFun&apos;s{' '}
          <Link href="/terms" className="text-zulu-gold/60 hover:text-zulu-gold underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-zulu-gold/60 hover:text-zulu-gold underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
