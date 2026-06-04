/**
 * ZuluFun Seed Script
 * Creates dummy businesses and sample quotes in Supabase
 * Run with: node scripts/seed-supabase.mjs
 * 
 * Requires env vars:
 *   SUPABASE_URL=https://xxxxx.supabase.co
 *   SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
 */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  process.stderr.write('ERROR: Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY env vars\n');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false },
});

const BUSINESS_EMAIL = process.env.BUSINESS_EMAIL || 'wandile.chamane@gmail.com';
const CONSUMER_EMAIL = process.env.CONSUMER_EMAIL || 'wandile.chamane@gmail.com';

async function seed() {
  process.stdout.write('🌱 Seeding ZuluFun database...\n\n');

  // ── Step 1: Create auth users ──
  process.stdout.write('Creating auth users...\n');

  const users = [];
  const businesses = [
    { name: 'SunPower Solutions JHB', niche: 'power', city: 'Johannesburg', province: 'Gauteng', areas: ['Sandton', 'Randburg', 'Fourways', 'Roodepoort', 'Midrand'], tier: 'pro' },
    { name: 'Sentinel Security Systems', niche: 'security', city: 'Cape Town', province: 'Western Cape', areas: ['Cape Town', 'Bellville', 'Stellenbosch', 'Paarl'], tier: 'business' },
    { name: 'PropertyMax Realtors', niche: 'real_estate', city: 'Durban', province: 'KwaZulu-Natal', areas: ['Umhlanga', 'Durban North', 'Berea', 'Ballito'], tier: 'starter' },
    { name: 'AutoFix Express', niche: 'automotive', city: 'Centurion', province: 'Gauteng', areas: ['Centurion', 'Pretoria', 'Midrand', 'Hatfield'], tier: 'pro' },
    { name: 'EduBright Tutoring', niche: 'education', city: 'Bloemfontein', province: 'Free State', areas: ['Bloemfontein', 'Welkom', 'Kimberley'], tier: 'starter' },
    { name: 'GreenVolt Energy', niche: 'power', city: 'Pinetown', province: 'KwaZulu-Natal', areas: ['Pinetown', 'Durban', 'Pietermaritzburg'], tier: 'enterprise' },
  ];

  for (let i = 0; i < businesses.length; i++) {
    const biz = businesses[i];
    const email = `business${i + 1}@zulufun.demo`;
    const password = `ZuluFun202!${i + 1}`;

    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: biz.name, role: 'business' },
    });

    if (authError) {
      if (authError.message.includes('already exists')) {
        process.stdout.write(`  ⚠️  ${email} already exists, fetching...\n`);
        // Fetch existing user
        const { data: existing } = await supabase.auth.admin.listUsers();
        const found = existing?.users?.find((u: any) => u.email === email);
        if (found) {
          users.push({ id: found.id, email, password, ...biz });
        }
        continue;
      }
      process.stderr.write(`  ❌ Failed to create ${email}: ${authError.message}\n`);
      continue;
    }

    // Update profile with business role and phone
    await supabase.from('profiles').upsert({
      id: authData.user.id,
      full_name: biz.name,
      email,
      phone: `082100100${i + 1}`,
      role: 'business',
    }, { onConflict: 'id' });

    users.push({ id: authData.user.id, email, password, ...biz });
    process.stdout.write(`  ✅ ${email} (${biz.niche})\n`);
  }

  // ── Step 2: Create MAKE IT FUN company (your business) ──
  process.stdout.write('\nCreating MAKE IT FUN company...\n');

  const { data: wandileAuth, Error: wandileError } = await supabase.auth.admin.createUser({
    email: BUSINESS_EMAIL,
    password: 'MakeItFun2024!',
    email_confirm: true,
    user_metadata: { full_name: 'Wandile Chamane', role: 'business' },
  });

  let wandileId = wandileAuth?.user?.id;
  if (wandileError && wandileError.message.includes('already exists')) {
    const { data: existing } = await supabase.auth.admin.listUsers();
    wandileId = existing?.users?.find((u: any) => u.email === BUSINESS_EMAIL)?.id;
    process.stdout.write(`  ⚠️  ${BUSINESS_EMAIL} already exists, using existing account\n`);
  }

  if (wandileId) {
    await supabase.from('profiles').upsert({
      id: wandileId,
      full_name: 'Wandile Chamane',
      email: BUSINESS_EMAIL,
      phone: '0829990001',
      role: 'business',
    }, { onConflict: 'id' });

    const { error: bizError } = await supabase.from('businesses').upsert({
      owner_id: wandileId,
      company_name: 'MAKE IT FUN',
      description: 'AI-powered business platform connecting African consumers with trusted service providers. News content, B2B lead generation, and marketplace.',
      niche: 'power',
      phone: '0829990001',
      email: BUSINESS_EMAIL,
      website: 'https://zulu-chi.vercel.app',
      address: 'Sandton, Johannesburg',
      city: 'Johannesburg',
      province: 'Gauteng',
      service_areas: ['Sandton', 'Johannesburg', 'Cape Town', 'Durban', 'National'],
      logo_url: '',
      is_verified: true,
      is_active: true,
      subscription_tier: 'enterprise',
      lead_balance: 1000,
    }, { onConflict: 'owner_id' });

    if (bizError) {
      process.stderr.write(`  ❌ MAKE IT FUN business: ${bizError.message}\n`);
    } else {
      process.stdout.write(`  ✅ MAKE IT FUN (${BUSINESS_EMAIL}) — 1000 credits\n`);
    }
    users.push({ id: wandileId, email: BUSINESS_EMAIL, name: 'MAKE IT FUN', niche: 'power', tier: 'enterprise' });
  }

  // ── Step 3: Create businesses from other users ──
  process.stdout.write('\nRegistering businesses...\n');
  for (const user of users) {
    if (user.email === BUSINESS_EMAIL) continue; // Already created

    await supabase.from('businesses').upsert({
      owner_id: user.id,
      company_name: user.name,
      description: `Professional ${user.niche} services in ${user.city}.`,
      niche: user.niche,
      phone: `082100100${users.indexOf(user) + 1}`,
      email: user.email,
      city: user.city,
      province: user.province,
      service_areas: user.areas,
      is_verified: true,
      is_active: true,
      subscription_tier: user.tier,
      lead_balance: 1000,
    }, { onConflict: 'owner_id' });

    process.stdout.write(`  ✅ ${user.name} — ${user.niche} — 1000 credits\n`);
  }

  // ── Step 4: Create consumer + sample quotes ──
  process.stdout.write('\nCreating consumer and sample quotes...\n');

  const { data: consumerAuth } = await supabase.auth.admin.createUser({
    email: CONSUMER_EMAIL,
    password: 'Consumer2024!',
    email_confirm: true,
    user_metadata: { full_name: 'Wandile Chamane', role: 'consumer' },
  });

  let consumerId = consumerAuth?.user?.id;
  if (!consumerId) {
    const { data: existing } = await supabase.auth.admin.listUsers();
    consumerId = existing?.users?.find((u: any) => u.email === CONSUMER_EMAIL)?.id;
  }

  if (consumerId) {
    await supabase.from('profiles').upsert({
      id: consumerId,
      full_name: 'Wandile Chamane',
      email: CONSUMER_EMAIL,
      phone: '0829990001',
      role: 'consumer',
    }, { onConflict: 'id' });
  }

  const sampleQuotes = [
    { niche: 'power', title: '5kW Solar Panel System for Home', desc: 'Looking to install a full 5kW solar panel system with inverter and battery backup. 4-bedroom house.', location: 'Sandton, Johannesburg', city: 'Johannesburg', province: 'Gauteng', min: 45000, max: 85000, timeline: '1_month', contact: 'whatsapp' },
    { niche: 'power', title: 'Inverter and Battery Backup for Office', desc: 'Need a 3kW inverter with lithium battery for load shedding backup. Small office, 4 computers.', location: 'Midrand, Johannesburg', city: 'Johannesburg', province: 'Gauteng', min: 15000, max: 28000, timeline: 'asap', contact: 'phone' },
    { niche: 'security', title: 'Home CCTV and Alarm System', desc: 'Need a complete security setup for my 3-bedroom house. 6-camera CCTV plus alarm with monitoring.', location: 'Bellville, Cape Town', city: 'Cape Town', province: 'Western Cape', min: 12000, max: 25000, timeline: '2_weeks', contact: 'phone' },
    { niche: 'real_estate', title: 'Property Valuation and Sale', desc: 'Looking to sell my 3-bedroom townhouse in Umhlanga. Need professional valuation and agent.', location: 'Umhlanga Rocks, Durban', city: 'Durban', province: 'KwaZulu-Natal', min: 1800000, max: 2400000, timeline: '3_months', contact: 'email' },
    { niche: 'automotive', title: 'Full Service and Brake Replacement', desc: 'BMW 320i needs full service and brake pads. RMI-approved workshop preferred.', location: 'Centurion, Pretoria', city: 'Centurion', province: 'Gauteng', min: 3000, max: 6000, timeline: 'asap', contact: 'whatsapp' },
    { niche: 'education', title: 'Grade 12 Maths Tutor', desc: 'Need an experienced Maths tutor for Grade 12. Calculus and algebra. Twice a week.', location: 'Bloemfontein', city: 'Bloemfontein', province: 'Free State', min: 2000, max: 4000, timeline: 'asap', contact: 'phone' },
  ];

  for (const q of sampleQuotes) {
    await supabase.from('quotes').insert({
      consumer_id: consumerId,
      niche: q.niche,
      title: q.title,
      description: q.desc,
      requirements: q.desc,
      location: q.location,
      city: q.city,
      province: q.province,
      budget_min: q.min,
      budget_max: q.max,
      timeline: q.timeline,
      preferred_contact: q.contact,
      status: 'open',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    });
    process.stdout.write(`  📋 "${q.title}" (${q.niche})\n`);
  }

  process.stdout.write('\n🎉 Done! Seed complete.\n');
  process.stdout.write(`\nSummary:\n`);
  process.stdout.write(`  • ${users.length} businesses created (each with 1000 credits)\n`);
  process.stdout.write(`  • MAKE IT FUN company: ${BUSINESS_EMAIL}\n`);
  process.stdout.write(`  • ${sampleQuotes.length} sample quotes\n`);
  process.stdout.write(`  • Consumer: ${CONSUMER_EMAIL}\n`);
}

seed().catch((err) => {
  process.stderr.write(`Fatal: ${err.message}\n`);
  process.exit(1);
});
