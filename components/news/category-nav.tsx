'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Brain, Sun, ShieldAlert, Building, Truck, BookOpen, Briefcase, Laptop } from 'lucide-react';
import type { ContentCategory } from '@/types/index';

const CATEGORY_ICONS: Record<ContentCategory, React.ReactNode> = {
  ai: <Brain className="h-4 w-4" />,
  energy: <Sun className="h-4 w-4" />,
  security: <ShieldAlert className="h-4 w-4" />,
  property: <Building className="h-4 w-4" />,
  automotive: <Truck className="h-4 w-4" />,
  education: <BookOpen className="h-4 w-4" />,
  business: <Briefcase className="h-4 w-4" />,
  technology: <Laptop className="h-4 w-4" />,
};

const CATEGORIES: { key: ContentCategory; label: string }[] = [
  { key: 'ai', label: 'AI' },
  { key: 'energy', label: 'Energy' },
  { key: 'security', label: 'Security' },
  { key: 'property', label: 'Property' },
  { key: 'automotive', label: 'Auto' },
  { key: 'education', label: 'Education' },
  { key: 'business', label: 'Business' },
  { key: 'technology', label: 'Tech' },
];

export function CategoryNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => {
        const href = `/news/${cat.key}`;
        const isActive = pathname === href;
        return (
          <Link
            key={cat.key}
            href={href}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              isActive
                ? 'bg-zulu-gold text-zulu-indigo'
                : 'bg-zulu-indigo/5 text-zulu-indigo/70 hover:bg-zulu-gold/10 hover:text-zulu-gold'
            }`}
          >
            {CATEGORY_ICONS[cat.key]}
            <span>{cat.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
