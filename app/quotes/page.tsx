import Link from 'next/link';
import { BatteryCharging, Car, GraduationCap, Home, ShieldCheck, Bitcoin, Cpu } from 'lucide-react';
import { SectionHeader } from '@/components/shared/section-header';

const NICHES = [
  { key: 'power', label: 'Power & Energy', color: 'bg-zulu-indigo text-zulu-gold', description: 'Solar power, inverters, and battery solutions' },
  { key: 'security', label: 'Security', color: 'bg-zulu-red text-white', description: 'Alarm systems, CCTV, and access control' },
  { key: 'real_estate', label: 'Real Estate', color: 'bg-zulu-gold text-zulu-indigo', description: 'Property buying, selling, and rentals' },
  { key: 'automotive', label: 'Automotive', color: 'bg-zulu-indigo/90 text-zulu-gold', description: 'Vehicle repairs and maintenance' },
  { key: 'education', label: 'Education', color: 'bg-zulu-red/90 text-white', description: 'Schools, tutoring, and online courses' },
  { key: 'crypto', label: 'Crypto', color: 'bg-zulu-gold text-zulu-indigo', description: 'Cryptocurrency trading, consulting, and blockchain dev' },
];

const nicheIcons = {
  power: BatteryCharging,
  security: ShieldCheck,
  real_estate: Home,
  automotive: Car,
  education: GraduationCap,
  crypto: Bitcoin,
};

export const metadata = {
  title: 'Get Quotes | ZuluFun.io',
  description: 'Request quotes from verified businesses in South Africa.',
};

export default function QuotesPage() {
  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Get Quotes"
          title="What service do you need?"
          description="Select a category below to get matched with up to 4 trusted professionals in your area."
          alignment="center"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {NICHES.map((niche) => {
            const Icon = nicheIcons[niche.key as keyof typeof nicheIcons];

            return (
              <Link key={niche.key} href={`/quotes/${niche.key}`} className="block group">
                <div className="bg-white rounded-2xl p-8 border border-zinc-200 hover:border-zulu-gold/40 hover:shadow-xl hover:shadow-zulu-gold/5 transition-all duration-300 h-full flex flex-col items-center text-center">
                  <div className={`h-16 w-16 flex items-center justify-center rounded-xl ${niche.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-zulu-indigo font-bold text-xl mb-3">{niche.label}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{niche.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
