import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // In a real implementation, this would verify the API key,
  // check rate limits, and fetch leads from Supabase based on query params.
  
  const { searchParams } = new URL(request.url);
  const niche = searchParams.get('niche');
  const limit = searchParams.get('limit') || '10';

  return NextResponse.json({
    status: 'success',
    data: {
      leads: [
        {
          id: 'lead_982391',
          niche: niche || 'solar',
          location: 'Sandton, Johannesburg',
          intent_score: 92,
          verified: true,
          details: 'Looking for a 5kW inverter installation',
          created_at: new Date().toISOString(),
        }
      ],
      meta: {
        limit: parseInt(limit, 10),
        total_available: 1,
      }
    }
  });
}

export async function POST(request: Request) {
  // Webhook endpoint for the LeadAI agent to push new scraped/captured leads into the system
  try {
    const body = await request.json();
    
    // Process lead...
    
    return NextResponse.json({
      status: 'success',
      message: 'Lead ingested and queued for scoring',
      lead_id: 'lead_new_123'
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }
}
