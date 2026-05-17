import Link from 'next/link';

interface AdBannerProps {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  sponsor: string;
  variant?: 'default' | 'compact';
}

export function AdBanner({ title, description, ctaText, ctaHref, sponsor, variant = 'default' }: AdBannerProps) {
  if (variant === 'compact') {
    return (
      <div className="bg-zulu-indigo/5 border border-zulu-indigo/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex-1">
          <p className="text-xs text-zulu-indigo/40 mb-1">Sponsored by {sponsor}</p>
          <h4 className="text-sm font-semibold text-zulu-indigo">{title}</h4>
        </div>
        <Link
          href={ctaHref}
          className="shrink-0 ml-4 px-4 py-1.5 bg-zulu-gold text-zulu-indigo text-xs font-medium rounded-full hover:bg-zulu-gold/90 transition-colors"
        >
          {ctaText}
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-zulu-indigo to-zulu-indigo/90 rounded-xl p-6 text-center space-y-3">
      <p className="text-xs text-zulu-gold/50 uppercase tracking-wider">Sponsored by {sponsor}</p>
      <h3 className="text-xl font-bold text-zulu-gold">{title}</h3>
      <p className="text-zulu-gold/60 text-sm max-w-md mx-auto">{description}</p>
      <Link
        href={ctaHref}
        className="inline-flex items-center px-6 py-2.5 bg-zulu-gold text-zulu-indigo font-medium rounded-lg hover:bg-zulu-gold/90 transition-colors"
      >
        {ctaText}
      </Link>
    </div>
  );
}
