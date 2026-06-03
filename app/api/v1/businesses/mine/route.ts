import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';

// GET /api/v1/businesses/mine — Get the logged-in user's business
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const { data: business, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('owner_id', user.id)
      .single();

    if (error) {
      return NextResponse.json({ error: 'No business found for this account' }, { status: 404 });
    }

    return NextResponse.json({ success: true, business });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
