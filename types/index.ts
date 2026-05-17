export type NicheType = 'power' | 'security' | 'real_estate' | 'automotive' | 'education';

export type ContentCategory = 
  | 'ai' 
  | 'energy' 
  | 'security' 
  | 'property' 
  | 'automotive' 
  | 'education' 
  | 'business' 
  | 'technology';

export interface Article {
  id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: ContentCategory;
  author: string;
  publishedAt: string;
  featuredImage: string;
  tags: string[];
  readTime: number;
  isSponsored?: boolean;
}

export type LeadType = 'exclusive' | 'duo' | 'quad' | 'unverified' | 'email_only';

export interface BusinessClient {
  id: string;
  companyName: string;
  niche: NicheType;
  subscriptionTier: string; // Could be more specific if we have an enum
  serviceAreas: string[]; // Array of suburbs or regions
  leadBalance: number;
  totalLeads: number;
  conversionRate: number; // percentage
  monthlySpend: number; // in ZAR
  roi: number; // percentage
}

export interface ConsumerQuote {
  niche: NicheType;
  requirements: string;
  location: string;
  budget: number; // in ZAR
  timeline: string; // e.g., "ASAP", "Within 2 weeks", etc.
  preferredContact: 'phone' | 'email' | 'whatsapp';
}

export interface Agent {
  name: string;
  status: 'active' | 'idle' | 'error';
  lastRun: string; // ISO date string
  tasksCompleted: number;
  errorRate: number; // percentage
}