import Link from 'next/link';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  alignment?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  alignment = 'left',
  className = '',
}: SectionHeaderProps) {
  return (
    <div className={`mb-10 ${className}`}>
      <div className={`flex flex-col ${alignment === 'center' ? 'items-center text-center' : 'items-start'} space-y-3`}>
        {eyebrow && (
          <span className="text-zulu-gold font-medium text-xs tracking-wider uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="text-2xl font-bold text-zulu-indigo md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="text-zulu-indigo/60 max-w-2xl">
            {description}
          </p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center px-5 py-2.5 bg-zulu-gold text-zulu-indigo font-medium rounded-lg hover:bg-zulu-gold/90 transition-colors text-sm"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
