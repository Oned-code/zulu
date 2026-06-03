import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getResendClient } from '@/lib/resend';
import { leadNotificationEmailHtml, quoteConfirmationEmailHtml } from '@/lib/quote-email-templates';

// POST /api/quotes — Submit a new quote request
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      niche,
      title,
      description,
      requirements,
      location,
      city,
      province,
      budget_min,
      budget_max,
      timeline,
      preferred_contact,
      consumer_name,
      consumer_email,
      consumer_phone,
    } = body;

    if (!niche || !title || !location || !consumer_name || !consumer_email) {
      return NextResponse.json(
        { error: 'Missing required fields: niche, title, location, consumer_name, consumer_email' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();

    // Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    // Create or find consumer profile
    let consumerId = user?.id || null;

    // If not logged in, create a temporary consumer record
    // (In production, you'd want to create an account or use a guest flow)
    if (!consumerId) {
      // For guest submissions, we store without profile link
      // The consumer gets an email to create an account later
    }

    // Set expiry based on timeline
    let expiresDays = 7;
    if (timeline === 'asap') expiresDays = 5;
    else if (timeline === '1_month') expiresDays = 14;
    else if (timeline === '3_months') expiresDays = 30;
    else if (timeline === 'planning') expiresDays = 60;

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + expiresDays);

    // Insert the quote
    const { data: quote, error: quoteError } = await supabase
      .from('quotes')
      .insert({
        consumer_id: consumerId,
        niche,
        title,
        description: description || '',
        requirements: requirements || '',
        location,
        city: city || '',
        province: province || '',
        budget_min: budget_min ? Number(budget_min) : null,
        budget_max: budget_max ? Number(budget_max) : null,
        timeline: timeline || 'asap',
        preferred_contact: preferred_contact || 'email',
        status: 'open',
        expires_at: expiresAt.toISOString(),
      })
      .select()
      .single();

    if (quoteError) {
      console.error('Error creating quote:', quoteError);
      return NextResponse.json(
        { error: 'Failed to create quote request' },
        { status: 500 }
      );
    }

    // Find matching businesses in the same niche
    const { data: businesses } = await supabase
      .from('businesses')
      .select('id, company_name, email, service_areas, subscription_tier, lead_balance')
      .eq('niche', niche)
      .eq('is_active', true)
      .eq('is_verified', true)
      .gt('lead_balance', 0)
      .limit(4);

    // Send confirmation email to consumer
    const resend = getResendClient();
    if (resend) {
      try {
        await resend.emails.send({
          from: 'ZuluFun <onboarding@zulufun.io>',
          to: [consumer_email],
          subject: `Quote request received: ${title}`,
          html: quoteConfirmationEmailHtml({
            name: consumer_name,
            quoteTitle: title,
            niche,
            location,
            siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app',
          }),
        });
      } catch (e) {
        console.error('Failed to send consumer confirmation email:', e);
      }
    }

    // Send notification emails to matched businesses
    if (resend && businesses && businesses.length > 0) {
      for (const biz of businesses) {
        try {
          await resend.emails.send({
            from: 'ZuluFun <onboarding@zulufun.io>',
            to: [biz.email],
            subject: `🔔 New Lead: ${title}`,
            html: leadNotificationEmailHtml({
              businessName: biz.company_name,
              quoteTitle: title,
              niche,
              location,
              budgetMin: budget_min,
              budgetMax: budget_max,
              timeline,
              siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app',
              quoteId: quote.id,
              businessId: biz.id,
              leadPrice: getLeadPrice(niche, biz.subscription_tier),
              profileComplete: false,
            }),
          });
        } catch (e) {
          console.error(`Failed to send lead notification to ${biz.company_name}:`, e);
        }
      }
    }

    return NextResponse.json({
      success: true,
      quote,
      message: 'Quote request submitted successfully. Check your email for confirmation.',
      businessesNotified: businesses?.length || 0,
    }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// GET /api/quotes — Fetch quotes (for business dashboard or consumer dashboard)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const niche = searchParams.get('niche');
    const status = searchParams.get('status') || 'open';
    const forBusiness = searchParams.get('for') === 'business';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    let query = supabase
      .from('quotes')
      .select('*')
      .eq('status', status)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (niche) {
      query = query.eq('niche', niche);
    }

    // For consumer dashboard — only show own quotes
    if (user && !forBusiness) {
      query = query.eq('consumer_id', user.id);
    }

    const { data: quotes, error } = await query;

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, quotes: quotes || [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

function getLeadPrice(niche: string, tier: string): number {
  const prices: Record<string, number> = {
    power: 200,
    security: 180,
    real_estate: 300,
    automotive: 150,
    education: 120,
    crypto: 250,
  };
  return prices[niche] || 200;
}
