import { Zap, Shield, Home, Car, GraduationCap } from 'lucide-react';
import { NICHES } from '@/lib/constants';
import type { NicheType } from '@/types/index';

interface NicheCardProps {
  niche: NicheType;
  onClick?: () => void;
}

const NICHE_ICONS: Record<NicheType, React.ReactNode> = {
  power: <Zap className="h-5 w-5 text-white" />,
  security: <Shield className="h-5 w-5 text-white" />,
  real_estate: <Home className="h-5 w-5 text-white" />,
  automotive: <Car className="h-5 w-5 text-white" />,
  education: <GraduationCap className="h-5 w-5 text-white" />,
};

const NICHE_LABELS: Record<NicheType, string> = {
  power: 'Power & Energy',
  security: 'Security',
  real_estate: 'Real Estate',
  automotive: 'Automotive',
  education: 'Education',
};

export function NicheCard({ niche, onClick }: NicheCardProps) {
  const nicheData = NICHES[niche];

  return (
    <div
      onClick={onClick}
      className="group flex flex-col items-center justify-between p-6 bg-white dark:bg-zulu-indigo/90 rounded-xl border border-zulu-indigo/20 hover:border-zulu-gold/30 hover:bg-zulu-indigo/5 dark:hover:bg-zulu-indigo/80 transition-all duration-300 cursor-pointer"
    >
      <div className="flex h-12 w-12 items-center justify-center mb-4">
        <div className={`h-12 w-12 flex items-center justify-center rounded-full ${nicheData.color}`}>
          {NICHE_ICONS[niche]}
        </div>
      </div>

      <h3 className="mt-2 text-zulu-indigo font-semibold group-hover:text-zulu-gold transition-colors text-center">
        {NICHE_LABELS[niche]}
      </h3>

      <p className="mt-2 text-center text-zulu-indigo/60 text-sm">
        {nicheData.stats.businessesServed.toLocaleString()}+ businesses served
      </p>

      <button
        onClick={onClick}
        className="mt-4 inline-flex items-center px-3 py-1.5 text-xs font-medium bg-zulu-gold text-zulu-indigo rounded-full hover:bg-zulu-gold/90 transition-colors"
      >
        Get Quotes
        <span className="ml-2">{'->'}</span>
      </button>
    </div>
  );
}
