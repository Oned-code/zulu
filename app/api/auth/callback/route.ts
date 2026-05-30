import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getResendClient, isEmailEnabled } from '@/lib/resend';
import { welcomeEmailHtml } from '@/lib/email-templates';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = await createServerSupabaseClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${requestUrl.origin}/auth/login?error=${encodeURIComponent(error.message)}`
      );
    }

    // Send welcome email after successful email verification
    if (isEmailEnabled() && data.user) {
      const resend = getResendClient();
      if (resend) {
        try {
          const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app';
          const userName = data.user.user_metadata?.full_name || data.user.email?.split('@')[0] || 'there';

          await resend.emails.send({
            from: 'ZuluFun <onboarding@zulufun.io>',
            to: [data.user.email!],
            subject: `Welcome to the family, ${userName}!`,
            html: welcomeEmailHtml({
              name: userName,
              siteName: 'ZuluFun',
              siteUrl,
              actionUrl: `${siteUrl}/dashboard`,
            }),
          });
        } catch (emailError) {
          console.error('Failed to send welcome email via Resend:', emailError);
        }
      }
    }
  }

  return NextResponse.redirect(`${requestUrl.origin}/auth/login?verified=true`);
}
