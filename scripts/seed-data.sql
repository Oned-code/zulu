-- Seed data for ZuluFun dummy businesses
-- Run this in Supabase SQL Editor after the main schema is applied
-- Creates 6 dummy businesses across niches with 1000 credits each

-- =====================================================
-- STEP 1: Create dummy auth users + profiles
-- In Supabase dashboard → Authentication → Users → Add User
-- Create these 6 users with email/password auth, then copy their UUIDs below:
--
--   business1@zulu.demo / Business1@demo  → Solar
--   business2@zulu.demo / Business2@demo  → Security
--   business3@zulu.demo / Business3@demo  → Real Estate
--   business4@zulu.demo / Business4@demo  → Automotive
--   business5@zulu.demo / Business5@demo  → Education
--   business6@zulu.demo / Business6@demo  → Power (second)
--
-- STEP 2: After creating users, run the profile + business inserts below
--         replacing the UUID placeholders with actual user UUIDs
-- =====================================================

-- Dummy profiles (replace UUIDs with actual auth.users IDs)
-- These will auto-create via the on_auth_user_created trigger,
-- but we update them with full details here:

-- Uncomment and replace with real UUIDs from Supabase auth.users:
/*
INSERT INTO public.profiles (id, full_name, email, phone, role) VALUES
  ('REPLACE-UUID-1', 'Thabo Mokoena', 'business1@zulu.demo', '0821001001', 'business'),
  ('REPLACE-UUID-2', 'Sipho Dlamini', 'business2@zulu.demo', '0821001002', 'business'),
  ('REPLACE-UUID-3', 'Naledi Khumalo', 'business3@zulu.demo', '0821001003', 'business'),
  ('REPLACE-UUID-4', 'Johan van der Merwe', 'business4@zulu.demo', '0821001004', 'business'),
  ('REPLACE-UUID-5', 'Priya Naidoo', 'business5@zulu.demo', '0821001005', 'business'),
  ('REPLACE-UUID-6', 'Bongani Zulu', 'business6@zulu.demo', '0821001006', 'business')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;

-- Dummy businesses (1000 credits each, 1 credit = 1 Rand)
INSERT INTO public.businesses (owner_id, company_name, description, niche, phone, email, website, address, city, province, service_areas, is_verified, is_active, subscription_tier, lead_balance) VALUES
  (
    'REPLACE-UUID-1',
    'SunPower Solutions JHB',
    'Leading solar installation company in Gauteng. Specializing in residential and commercial solar PV systems, inverter backup solutions, and battery storage. SANS 10142 certified installers.',
    'power',
    '0821001001',
    'info@sunpowerjhb.co.za',
    'https://sunpowerjhb.co.za',
    '124 Sandton Drive, Sandton',
    'Johannesburg',
    'Gauteng',
    ARRAY['Sandton', 'Randburg', 'Fourways', 'Roodepoort', 'Midrand'],
    true,
    true,
    'pro',
    1000
  ),
  (
    'REPLACE-UUID-2',
    'Sentinel Security Systems',
    'Professional security solutions for homes and businesses. CCTV installation, alarm systems, access control, and 24/7 monitoring services. PSIRA registered.',
    'security',
    '0821001002',
    'info@sentinelsec.co.za',
    'https://sentinelsec.co.za',
    '89 Cape Town Rd, Foreshore',
    'Cape Town',
    'Western Cape',
    ARRAY['Cape Town', 'Bellville', 'Stellenbosch', 'Paarl', 'Somerset West'],
    true,
    true,
    'business',
    1000
  ),
  (
    'REPLACE-UUID-3',
    'PropertyMax Realtors',
    'Full-service real estate agency specializing in residential sales, rentals, and property management across the Durban metro area. Registered with EAAB.',
    'real_estate',
    '0821001003',
    'listings@propertymax.co.za',
    'https://propertymax.co.za',
    '45 Umhlanga Ridge Blvd, Umhlanga',
    'Durban',
    'KwaZulu-Natal',
    ARRAY['Umhlanga', 'Durban North', 'Berea', 'Phoenix', 'Ballito'],
    true,
    true,
    'starter',
    1000
  ),
  (
    'REPLACE-UUID-4',
    'AutoFix Express Centurion',
    'RMI-approved auto repair and maintenance. Major services, diagnostics, brakes, suspension, and courtesy car available. All makes and models welcome.',
    'automotive',
    '0821001004',
    'service@autofixcenturion.co.za',
    'https://autofixcenturion.co.za',
    '22 Lenchen Ave, Centurion',
    'Centurion',
    'Gauteng',
    ARRAY['Centurion', 'Pretoria', 'Midrand', 'Irene', 'Hatfield'],
    true,
    true,
    'pro',
    1000
  ),
  (
    'REPLACE-UUID-5',
    'EduBright Tutoring Academy',
    'Professional tutoring services for Grade R-12. Experienced, vetted tutors for Maths, Science, English, and more. Online and in-person sessions available.',
    'education',
    '0821001005',
    'learn@edubright.co.za',
    'https://edubright.co.za',
    '12 Albert St, CBD',
    'Bloemfontein',
    'Free State',
    ARRAY['Bloemfontein', 'Welkom', 'Kimberley', 'Bethlehem', 'Kroonstad'],
    true,
    true,
    'starter',
    1000
  ),
  (
    'REPLACE-UUID-6',
    'GreenVolt Energy Solutions',
    'Sustainable energy solutions for commercial and industrial clients. Solar PV, energy audits, power factor correction, and energy management systems.',
    'power',
    '0821001006',
    'green@gvolt.co.za',
    'https://gvolt.co.za',
    '67 Indaba Lane, Pinetown',
    'Pinetown',
    'KwaZulu-Natal',
    ARRAY['Pinetown', 'Durban', 'Pietermaritzburg', 'Richards Bay'],
    true,
    true,
    'enterprise',
    1000
  )
ON CONFLICT DO NOTHING;

-- Dummy consumer profile for testing quotes
INSERT INTO public.profiles (id, full_name, email, phone, role) VALUES
  ('REPLACE-CONSUMER-UUID', 'Wandile Chamane', 'consumer@zulu.demo', '0829990001', 'consumer')
ON CONFLICT (id) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  phone = EXCLUDED.phone,
  role = EXCLUDED.role;

-- Sample quotes for testing (will be linked to consumer@zulu.demo once created)
-- These show up in the business dashboard as available leads
INSERT INTO public.quotes (consumer_id, niche, title, description, requirements, location, city, province, budget_min, budget_max, timeline, preferred_contact, status, expires_at) VALUES
  (
    'REPLACE-CONSUMER-UUID',
    'power',
    '5kW Solar Panel System for Home',
    'Looking to install a full 5kW solar panel system with inverter and battery backup. 4-bedroom house in Sandton.',
    'Must include: Solar panels (tier 1 brand), 5kW hybrid inverter, lithium battery (5kWh+), full installation with certificate of compliance. Willing to wait 2-3 weeks for the right installer.',
    'Sandton, Johannesburg',
    'Johannesburg',
    'Gauteng',
    45000,
    85000,
    '1_month',
    'whatsapp',
    'open',
    NOW() + INTERVAL '7 days'
  ),
  (
    'REPLACE-CONSUMER-UUID',
    'security',
    'Home CCTV and Alarm System',
    'Need a complete security setup for my 3-bedroom house. 6-camera CCTV system plus alarm with monitoring.',
    'Requirements: 6x outdoor IP cameras (4K), NVR with 2TB storage, perimeter alarm beams, 24/7 monitoring contract option. Must be PSIRA registered.',
    'Bellville, Cape Town',
    'Cape Town',
    'Western Cape',
    12000,
    25000,
    '2_weeks',
    'phone',
    'open',
    NOW() + INTERVAL '7 days'
  ),
  (
    'REPLACE-CONSUMER-UUID',
    'real_estate',
    'Property Valuation and Sale',
    'Looking to sell my 3-bedroom townhouse in Umhlanga. Need professional valuation and agent to handle the sale.',
    'Property: 3 bed, 2 bath, double garage, complex in Umhlanga Rocks. Prefer agent with track record in the area. Looking for sole mandate.',
    'Umhlanga Rocks, Durban',
    'Durban',
    'KwaZulu-Natal',
    1800000,
    2400000,
    '3_months',
    'email',
    'open',
    NOW() + INTERVAL '14 days'
  ),
  (
    'REPLACE-CONSUMER-UUID',
    'automotive',
    'Full Service and Brake Replacement',
    'BMW 320i (2019) needs full service and brake pads replacement. Prefer RMI-approved workshop.',
    'Full service with BMW-spec oil, front and rear brake pads, brake fluid flush. Courtesy car preferred. Centurion or Midrand area.',
    'Centurion, Pretoria',
    'Centurion',
    'Gauteng',
    3000,
    6000,
    'asap',
    'whatsapp',
    'open',
    NOW() + INTERVAL '5 days'
  ),
  (
    'REPLACE-CONSUMER-UUID',
    'education',
    'Grade 12 Maths Tutor',
    'Need an experienced Maths tutor for my daughter in Grade 12. She needs help with calculus and algebra. Twice a week, in-person preferred.',
    'Requirements: Experienced Grade 12 Maths tutor, strong track record with IEB or NSC exams. In-person in Bloemfontein CBD area. 2x per week.',
    'CBD, Bloemfontein',
    'Bloemfontein',
    'Free State',
    2000,
    4000,
    'asap',
    'phone',
    'open',
    NOW() + INTERVAL '21 days'
  ),
  (
    'REPLACE-CONSUMER-UUID',
    'power',
    'Inverter and Battery Backup',
    'Need a 3kW inverter with lithium battery for load shedding backup. Small office, 4 computers and networking equipment.',
    '3kW hybrid inverter, 2.4kWh lithium battery, automatic transfer switch, installation and wiring. Must include warranty. ASAP.',
    'Midrand, Johannesburg',
    'Johannesburg',
    'Gauteng',
    15000,
    28000,
    'asap',
    'phone',
    'open',
    NOW() + INTERVAL '5 days'
  )
ON CONFLICT DO NOTHING;
*/
