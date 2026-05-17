import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { DM_Sans } from 'next/font/google';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });
const dmSans = DM_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ZuluFun.io — Africa\'s Autonomous Business Engine',
  description: 'AI-powered business platform connecting African consumers with trusted providers. Get quotes, access business insights, and grow your business with ZuluFun.',
  openGraph: {
    title: 'ZuluFun.io — Africa\'s Autonomous Business Engine',
    description: 'AI-powered business platform connecting African consumers with trusted providers. Get quotes, access business insights, and grow your business with ZuluFun.',
    url: 'https://zulufun.io',
    siteName: 'ZuluFun.io',
    images: [
      {
        url: 'https://zulufun.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZuluFun.io — Africa\'s Autonomous Business Engine',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className={`${dmSans.className} antialiased`}>
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)] pb-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}