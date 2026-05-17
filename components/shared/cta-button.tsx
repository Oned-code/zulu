import Link from 'next/link';
import { type ReactNode } from 'react';

interface CTAButtonProps {
  href?: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
}

export function CTAButton({
  href,
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
}: CTAButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200';

  const variants = {
    primary: 'bg-zulu-gold text-zulu-indigo hover:bg-zulu-gold/90 shadow-sm',
    secondary: 'bg-zulu-indigo text-zulu-gold hover:bg-zulu-indigo/90',
    outline: 'border-2 border-zulu-gold text-zulu-gold hover:bg-zulu-gold hover:text-zulu-indigo',
    text: 'text-zulu-gold hover:text-zulu-gold/80 underline-offset-4 hover:underline',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  const combinedClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={combinedClassName}>
      {children}
    </button>
  );
}
