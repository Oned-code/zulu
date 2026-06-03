import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// GET /api/v1/businesses — List all verified businesses (public directory)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get('niche');

  const supabase = await createServerSupabaseClient();

  let query = supabase
    .from('businesses')
    .select('id, company_name, description, niche, city, service_areas, is_verified, subscription_tier, lead_balance')
    .eq('is_active', true)
    .eq('is_verified', true)
    .order('company_name');

  if (niche) {
    query = query.eq('niche', niche);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, businesses: data || [] });
}
