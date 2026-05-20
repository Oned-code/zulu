import { notFound } from 'next/navigation';
import { QuoteForm } from '@/components/quotes/quote-form';
import { SectionHeader } from '@/components/shared/section-header';
import { BatteryCharging, Car, GraduationCap, Home, ShieldCheck, CheckCircle2 } from 'lucide-react';

const NICHES = {
  power: { 
    label: 'Power & Energy', 
    icon: BatteryCharging,
    benefits: ['Verified Solar Installers', 'Tier 1 Equipment Brands', 'Workmanship Warranties', 'Financing Options Available']
  },
  security: { 
    label: 'Security Systems', 
    icon: ShieldCheck,
    benefits: ['PSIRA Registered Installers', '24/7 Monitoring Options', 'Smart Home Integration', 'Rapid Response Ready']
  },
  real_estate: { 
    label: 'Real Estate', 
    icon: Home,
    benefits: ['Registered Property Agents', 'Free Valuations', 'Bond Origination', 'Extensive Area Knowledge']
  },
  automotive: { 
    label: 'Automotive Services', 
    icon: Car,
    benefits: ['RMI Approved Workshops', 'Genuine Parts Guarantee', 'Courtesy Cars Available', 'Transparent Pricing']
  },
  education: { 
    label: 'Education & Tutors', 
    icon: GraduationCap,
    benefits: ['Vetted Professional Tutors', 'Personalized Learning Plans', 'Online & In-Person Options', 'Progress Tracking']
  },
};

export function generateStaticParams() {
  return Object.keys(NICHES).map((niche) => ({
    niche: niche,
  }));
}

export const metadata = {
  title: 'Request a Quote | ZuluFun.io',
  description: 'Get matched with top-rated service providers in South Africa.',
};

export default function NicheQuotePage({ params }: { params: { niche: string } }) {
  const nicheData = NICHES[params.niche as keyof typeof NICHES];

  if (!nicheData) {
    notFound();
  }

  const Icon = nicheData.icon;

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* Left Column: Info & Benefits */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <div className="inline-flex items-center space-x-2 bg-white px-3 py-1 rounded-full text-sm font-semibold text-zulu-indigo border border-zinc-200 shadow-sm">
              <Icon className="w-4 h-4 text-zulu-gold" />
              <span>{nicheData.label}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-zulu-indigo leading-tight">
              Get quotes for your <span className="text-zulu-gold">{nicheData.label}</span> project.
            </h1>
            
            <p className="text-lg text-zinc-600 leading-relaxed">
              Tell us what you need, and we'll match you with up to 4 pre-vetted professionals in your area. Compare quotes, read reviews, and hire the best.
            </p>

            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm space-y-4">
              <h3 className="font-bold text-zulu-indigo mb-4">Why use ZuluFun?</h3>
              {nicheData.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:mt-0">
            <QuoteForm niche={params.niche} />
          </div>

        </div>
      </div>
    </div>
  );
}
