import { SectionHeader } from '@/components/shared/section-header';
import { Button } from '@/components/ui/button';
import { notFound } from 'next/navigation';
import { BatteryCharging, Car, GraduationCap, Home, ShieldCheck, Filter, ChevronRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';

const NICHES = {
  power: { label: 'Solar & Energy', icon: BatteryCharging, color: 'text-zulu-gold', bg: 'bg-zulu-gold/10' },
  security: { label: 'Security Systems', icon: ShieldCheck, color: 'text-zulu-red', bg: 'bg-zulu-red/10' },
  real_estate: { label: 'Real Estate', icon: Home, color: 'text-zulu-indigo', bg: 'bg-zulu-indigo/10' },
  automotive: { label: 'Automotive', icon: Car, color: 'text-zulu-indigo', bg: 'bg-zulu-indigo/10' },
  education: { label: 'Education', icon: GraduationCap, color: 'text-zulu-red', bg: 'bg-zulu-red/10' },
};

export function generateStaticParams() {
  return Object.keys(NICHES).map((niche) => ({
    niche: niche,
  }));
}

export const metadata = {
  title: 'Niche Leads | ZuluFun.io',
  description: 'Buy targeted leads for your specific industry.',
};

export default function B2BNichePage({ params }: { params: { niche: string } }) {
  const nicheData = NICHES[params.niche as keyof typeof NICHES];

  if (!nicheData) {
    notFound();
  }

  const Icon = nicheData.icon;

  return (
    <div className="min-h-screen bg-zinc-50 pt-24 pb-16">
      
      {/* Breadcrumb & Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="flex items-center space-x-2 text-sm text-zinc-500 mb-6">
          <Link href="/b2b" className="hover:text-zulu-indigo">Marketplace</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="font-semibold text-zulu-indigo">{nicheData.label}</span>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200 pb-8">
          <div className="flex items-center space-x-4">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${nicheData.bg} ${nicheData.color}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-zulu-indigo">{nicheData.label} Leads</h1>
              <p className="text-zinc-500 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" /> High demand area
              </p>
            </div>
          </div>
          <div className="flex space-x-3 w-full md:w-auto">
            <Button variant="outline" className="w-full md:w-auto bg-white border-zinc-200">
              <Filter className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Button className="w-full md:w-auto bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">
              Set Auto-Buy Rules
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Feed */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="font-bold text-zulu-indigo mb-4">Live Lead Feed</h3>
            
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm hover:border-zulu-gold/50 hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-zinc-100 text-zinc-600">
                        {params.niche === 'power' ? 'Solar Panels' : params.niche === 'security' ? 'Alarm System' : 'General Request'}
                      </span>
                      <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded">Verified PIN</span>
                    </div>
                    <h4 className="font-bold text-zinc-900 text-lg">Project Request in Sandton</h4>
                    <p className="text-xs text-zinc-500 mt-1">Submitted {i * 12} minutes ago</p>
                  </div>
                  <div className="text-right">
                    <span className="block text-2xl font-bold text-zulu-indigo">R 200</span>
                    <span className="text-xs font-medium text-zulu-gold bg-zulu-gold/10 px-2 py-0.5 rounded">Exclusive Lead</span>
                  </div>
                </div>
                
                <div className="bg-zinc-50 p-4 rounded-xl border border-zinc-100 mb-6">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="block text-zinc-500 text-xs mb-1">Timeline</span>
                      <span className="font-semibold text-zinc-800">ASAP</span>
                    </div>
                    <div>
                      <span className="block text-zinc-500 text-xs mb-1">Budget Expectation</span>
                      <span className="font-semibold text-zinc-800">Standard</span>
                    </div>
                    <div className="col-span-2">
                      <span className="block text-zinc-500 text-xs mb-1">Consumer Note</span>
                      <span className="font-medium text-zinc-700 italic line-clamp-1">"Looking to get this done as quickly as possible. Have a 4 bedroom home."</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button className="w-full bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90">
                    Buy Lead
                  </Button>
                </div>
              </div>
            ))}
            
            <div className="text-center pt-8">
              <Button variant="outline" className="w-full max-w-sm bg-white">Load More Leads</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
              <h3 className="font-bold text-zulu-indigo mb-4">Niche Statistics</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-600 text-sm">Active Buyers</span>
                  <span className="font-bold text-zulu-indigo">42</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-600 text-sm">Avg. Conversion Rate</span>
                  <span className="font-bold text-green-600">28%</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b border-zinc-100">
                  <span className="text-zinc-600 text-sm">Lead Volume (24h)</span>
                  <span className="font-bold text-zulu-indigo">184</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-zinc-600 text-sm">Average ROI</span>
                  <span className="font-bold text-zulu-gold">310%</span>
                </div>
              </div>
            </div>

            <div className="bg-zulu-indigo p-6 rounded-2xl text-white">
              <h3 className="font-bold mb-2">Automate your pipeline</h3>
              <p className="text-sm text-zinc-400 mb-6">Set up filters to automatically purchase exclusive leads in your service area the second they are verified.</p>
              <Button className="w-full bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 font-bold">
                Configure Auto-Buy
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
