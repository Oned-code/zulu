import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getResendClient } from '@/lib/resend';
import { passwordResetEmailHtml } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app';

    // Look up the user's name from profiles
    let userName = 'there';
    try {
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name')
        .eq('email', email)
        .single();
      if (profile?.full_name) {
        userName = profile.full_name;
      }
    } catch {
      // Profile not found — use default greeting
    }

    // Supabase sends its own reset email, but we send a branded one via Resend too
    const resend = getResendClient();
    if (resend) {
      try {
        const resetUrl = `${siteUrl}/auth/reset-password`;
        await resend.emails.send({
          from: 'ZuluFun <onboarding@zulufun.io>',
          to: [email],
          subject: 'Reset your ZuluFun password',
          html: passwordResetEmailHtml({
            name: userName,
            actionUrl: resetUrl,
            siteName: 'ZuluFun',
            siteUrl,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send reset email via Resend:', emailError);
      }
    }

    // Still call Supabase to trigger their reset flow as fallback
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/reset-password`,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({
      message: 'If an account exists with that email, a password reset link has been sent.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
