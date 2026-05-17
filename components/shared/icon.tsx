'use client';

import { type ReactNode } from 'react';

interface IconProps {
  children: ReactNode;
  className?: string;
}

export function Icon({ children, className }: IconProps) {
  return <span className={className} suppressHydrationWarning>{children}</span>;
}
