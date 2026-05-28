import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://zulufun.io'),
  title: 'ZuluFun.io - Africa\'s Business Engine',
  description: 'AI-powered business platform connecting African consumers with trusted providers. Get quotes, access business insights, and grow your business with ZuluFun.',
  openGraph: {
    title: 'ZuluFun.io - Africa\'s Business Engine',
    description: 'AI-powered business platform connecting African consumers with trusted providers. Get quotes, access business insights, and grow your business with ZuluFun.',
    url: 'https://zulufun.io',
    siteName: 'ZuluFun.io',
    images: [
      {
        url: 'https://zulufun.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ZuluFun.io - Africa\'s Business Engine',
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
    <html lang="en" suppressHydrationWarning>
      <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8892146158683290"
     crossOrigin="anonymous"></script>
      <body className="font-sans antialiased bg-zulu-mist text-zulu-indigo">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)] bg-zulu-mist">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
