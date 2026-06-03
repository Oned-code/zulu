import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// POST /api/leads — Business buys a lead (or click from email link triggers GET)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { quote_id, business_id, price } = body;

    if (!quote_id || !business_id || !price) {
      return NextResponse.json(
        { error: 'Missing required fields: quote_id, business_id, price' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Verify business ownership
    const { data: business, error: bizError } = await supabase
      .from('businesses')
      .select('id, company_name, email, lead_balance, niche')
      .eq('id', business_id)
      .eq('owner_id', user.id)
      .single();

    if (bizError || !business) {
      return NextResponse.json({ error: 'Business not found or unauthorized' }, { status: 403 });
    }

    if (business.lead_balance < price) {
      return NextResponse.json(
        { error: `Insufficient credits. Balance: R ${business.lead_balance}, Required: R ${price}` },
        { status: 402 }
      );
    }

    // Get the quote details
    const { data: quote } = await supabase
      .from('quotes')
      .select('*')
      .eq('id', quote_id)
      .eq('status', 'open')
      .single();

    if (!quote) {
      return NextResponse.json({ error: 'Quote not found or no longer available' }, { status: 404 });
    }

    // Deduct credits
    const { error: deductError } = await supabase
      .from('businesses')
      .update({ lead_balance: business.lead_balance - price })
      .eq('id', business_id);

    if (deductError) {
      return NextResponse.json({ error: 'Failed to deduct credits' }, { status: 500 });
    }

    // Create the lead record
    const { data: lead, error: leadError } = await supabase
      .from('leads')
      .insert({
        quote_id,
        business_id,
        consumer_id: quote.consumer_id,
        niche: quote.niche,
        lead_type: 'exclusive',
        price: Number(price),
        status: 'accepted',
      })
      .select()
      .single();

    if (leadError) {
      // Refund the credits
      await supabase
        .from('businesses')
        .update({ lead_balance: business.lead_balance })
        .eq('id', business_id);

      return NextResponse.json({ error: 'Failed to create lead record' }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      lead,
      message: `Lead purchased successfully! R ${price} deducted from your balance.`,
      remainingBalance: business.lead_balance - price,
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/leads — Redirect target from "Buy Lead" email button
// Authenticates user first, then processes the purchase
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const quote_id = searchParams.get('quote_id');
  const business_id = searchParams.get('business_id');
  const price = searchParams.get('price');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app';

  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    // Redirect to login with a return URL
    const returnUrl = encodeURIComponent(request.url);
    return NextResponse.redirect(`${siteUrl}/auth/login?redirectedFrom=/dashboard/business&action=buy_lead&quote_id=${quote_id}&business_id=${business_id}&price=${price}`);
  }

  // Forward to POST logic
  return POST(new NextRequest(new URL(`${siteUrl}/api/leads`), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ quote_id, business_id, price: Number(price) }),
  }));
}

// GET /api/leads/mine — Fetch leads for the logged-in business
export async function PUT(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    // Find businesses owned by this user
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id')
      .eq('owner_id', user.id);

    if (!businesses || businesses.length === 0) {
      return NextResponse.json({ success: true, leads: [] });
    }

    const businessIds = businesses.map(b => b.id);

    const { data: leads, error } = await supabase
      .from('leads')
      .select(`
        *,
        quote:quotes(*)
      `)
      .in('business_id', businessIds)
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, leads: leads || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
