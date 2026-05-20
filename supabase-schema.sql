-- ZuluFun.io Database Schema
-- Run this in Supabase SQL Editor: https://robtxkiowzjevzbkuhrf.supabase.co/project/default/sql

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'consumer' CHECK (role IN ('consumer', 'business', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Businesses table
CREATE TABLE IF NOT EXISTS public.businesses (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  owner_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  description TEXT,
  niche TEXT CHECK (niche IN ('power', 'security', 'real_estate', 'automotive', 'education', 'crypto')),
  phone TEXT,
  email TEXT,
  website TEXT,
  address TEXT,
  city TEXT,
  province TEXT,
  postal_code TEXT,
  service_areas TEXT[],
  logo_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'starter', 'pro', 'business', 'enterprise')),
  lead_balance INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Consumer quotes/requests
CREATE TABLE IF NOT EXISTS public.quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  consumer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  niche TEXT NOT NULL CHECK (niche IN ('power', 'security', 'real_estate', 'automotive', 'education', 'crypto')),
  title TEXT NOT NULL,
  description TEXT,
  requirements TEXT,
  location TEXT,
  city TEXT,
  province TEXT,
  budget_min NUMERIC,
  budget_max NUMERIC,
  timeline TEXT,
  preferred_contact TEXT CHECK (preferred_contact IN ('phone', 'email', 'whatsapp')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'closed', 'expired')),
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads (business responses to quotes)
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE,
  business_id UUID REFERENCES public.businesses(id) ON DELETE CASCADE,
  consumer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  niche TEXT NOT NULL,
  lead_type TEXT DEFAULT 'exclusive' CHECK (lead_type IN ('exclusive', 'duo', 'quad', 'unverified', 'email_only')),
  price NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
  contact_info JSONB,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles/News
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  category TEXT CHECK (category IN ('ai', 'energy', 'security', 'property', 'automotive', 'education', 'business', 'technology', 'crypto')),
  author TEXT,
  featured_image TEXT,
  tags TEXT[],
  read_time INTEGER,
  is_sponsored BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Businesses policies
CREATE POLICY "Anyone can view active businesses" ON public.businesses FOR SELECT USING (is_active = TRUE);
CREATE POLICY "Owners can manage their businesses" ON public.businesses FOR ALL USING (auth.uid() = owner_id);

-- Quotes policies
CREATE POLICY "Anyone can view open quotes" ON public.quotes FOR SELECT USING (status = 'open');
CREATE POLICY "Consumers can manage their quotes" ON public.quotes FOR ALL USING (auth.uid() = consumer_id);

-- Leads policies
CREATE POLICY "Businesses can view their leads" ON public.leads FOR SELECT USING (
  auth.uid() IN (SELECT owner_id FROM public.businesses WHERE id = business_id)
);
CREATE POLICY "Consumers can view their leads" ON public.leads FOR SELECT USING (auth.uid() = consumer_id);

-- Articles policies
CREATE POLICY "Anyone can view published articles" ON public.articles FOR SELECT USING (is_published = TRUE);

-- Newsletter policies
CREATE POLICY "Anyone can subscribe" ON public.newsletter_subscribers FOR INSERT WITH CHECK (TRUE);

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
