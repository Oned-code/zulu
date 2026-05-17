import type { NicheType, ContentCategory, LeadType } from '../types/index';

// Navigation items
export const NAV_ITEMS = [
  { label: 'AI', href: '/ai' },
  { label: 'Energy', href: '/energy' },
  { label: 'Security', href: '/security' },
  { label: 'Property', href: '/property' },
  { label: 'Auto', href: '/automotive' },
  { label: 'Education', href: '/education' },
  { label: 'Business', href: '/business' },
];

export const NICHES: Record<NicheType, {
  icon: string; // Lucide icon name
  description: string;
  color: string; // Tailwind color class
  stats: {
    businessesServed: number;
    leadsGenerated: number;
    avgConversionRate: number; // percentage
  }
}> = {
  power: {
    icon: 'zap',
    description: 'Solar power, inverters, batteries, and alternative energy solutions for homes and businesses.',
    color: 'bg-zulu-indigo',
    stats: {
      businessesServed: 1240,
      leadsGenerated: 8450,
      avgConversionRate: 18
    }
  },
  security: {
    icon: 'shield',
    description: 'Alarm systems, CCTV, access control, and armed response services for residential and commercial properties.',
    color: 'bg-zulu-red',
    stats: {
      businessesServed: 980,
      leadsGenerated: 6200,
      avgConversionRate: 22
    }
  },
  real_estate: {
    icon: 'home',
    description: 'Property buying, selling, rentals, and property management services across South Africa.',
    color: 'bg-zulu-gold',
    stats: {
      businessesServed: 2100,
      leadsGenerated: 15800,
      avgConversionRate: 12
    }
  },
  automotive: {
    icon: 'car',
    description: 'Vehicle repairs, maintenance, parts, and automotive services for all makes and models.',
    color: 'bg-zulu-indigo/90',
    stats: {
      businessesServed: 1750,
      leadsGenerated: 11200,
      avgConversionRate: 15
    }
  },
  education: {
    icon: 'graduation-cap',
    description: 'Schools, tutoring, online courses, and educational services for learners of all ages.',
    color: 'bg-zulu-red/90',
    stats: {
      businessesServed: 890,
      leadsGenerated: 4100,
      avgConversionRate: 20
    }
  }
};

export const CATEGORIES: Record<ContentCategory, {
  icon: string; // Lucide icon name
  description: string;
}> = {
  ai: {
    icon: 'brain',
    description: 'Artificial intelligence, machine learning, and AI tools for African businesses.'
  },
  energy: {
    icon: 'sun',
    description: 'Power solutions, renewable energy, and electricity news for Africa.'
  },
  security: {
    icon: 'shield-alert',
    description: 'Safety, security systems, and crime prevention insights.'
  },
  property: {
    icon: 'building',
    description: 'Real estate, housing, property investment, and urban development.'
  },
  automotive: {
    icon: 'truck',
    description: 'Automotive industry, vehicle news, and transportation innovations.'
  },
  education: {
    icon: 'book-open',
    description: 'Education sector, learning technologies, and academic developments.'
  },
  business: {
    icon: 'briefcase',
    description: 'Business news, entrepreneurship, and economic trends across the continent.'
  },
  technology: {
    icon: 'laptop',
    description: 'Technology innovations, gadgets, and digital transformation in Africa.'
  }
};

export const SUBSCRIPTION_TIERS = [
  { id: 'free', name: 'Free', price: 0, features: ['Basic lead access', 'Limited quotes', 'Community support'] },
  { id: 'starter', name: 'Starter', price: 999, features: ['Exclusive leads', 'Priority matching', 'Basic analytics'] },
  { id: 'pro', name: 'Pro', price: 2499, features: ['Exclusive + Duo leads', 'Advanced analytics', 'API access'] },
  { id: 'business', name: 'Business', price: 4999, features: ['All lead types', 'Dedicated account manager', 'Custom integrations'] },
  { id: 'enterprise', name: 'Enterprise', price: 9999, features: ['Unlimited leads', 'White-label solutions', 'SLA guarantee'] }
];

export const LEAD_PRICING: Record<NicheType, Record<LeadType, number>> = {
  power: {
    exclusive: 450,
    duo: 250,
    quad: 150,
    unverified: 75,
    email_only: 25
  },
  security: {
    exclusive: 400,
    duo: 220,
    quad: 120,
    unverified: 60,
    email_only: 20
  },
  real_estate: {
    exclusive: 600,
    duo: 350,
    quad: 200,
    unverified: 100,
    email_only: 30
  },
  automotive: {
    exclusive: 300,
    duo: 180,
    quad: 100,
    unverified: 50,
    email_only: 15
  },
  education: {
    exclusive: 250,
    duo: 150,
    quad: 90,
    unverified: 40,
    email_only: 10
  }
};

export const AFRICAN_COUNTRIES = [
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', marketSize: 'Largest', gdp: '$400B' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', marketSize: 'Largest Pop', gdp: '$470B' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', marketSize: 'East Africa Hub', gdp: '$110B' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', marketSize: 'North Africa Leader', gdp: '$400B' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭', marketSize: 'West Africa Rising', gdp: '$75B' }
];

export const COMPANY_METRICS = {
  businessesServed: 6850,
  leadsGenerated: 45200,
  revenueFacilitated: 125000000, // in ZAR
  avgRoi: 240 // percentage
};