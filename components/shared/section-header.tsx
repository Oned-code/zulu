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
          <span className="text-zulu-gold font-semibold text-xs tracking-wider uppercase">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl font-bold text-zulu-indigo md:text-4xl xl:text-5xl leading-tight">
          {title}
        </h2>
        {description && (
          <p className="text-zulu-indigo/60 max-w-2xl text-sm md:text-base">
            {description}
          </p>
        )}
        {ctaText && ctaHref && (
          <Link
            href={ctaHref}
            className="inline-flex items-center px-5 py-3 bg-zulu-gold text-zulu-indigo font-semibold rounded-full hover:bg-zulu-gold/90 transition-colors text-sm shadow-md shadow-zulu-gold/10 mt-2"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
}
