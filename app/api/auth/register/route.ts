import { NextRequest, NextResponse } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { getResendClient } from '@/lib/resend';
import { verificationEmailHtml } from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    const supabase = await createServerSupabaseClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zulu-chi.vercel.app';

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
        },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    // Send a personalized welcome/verification email via Resend
    // Supabase still sends its own confirmation email, but this adds a branded touch
    const resend = getResendClient();
    if (resend && data.user) {
      try {
        await resend.emails.send({
          from: 'ZuluFun <onboarding@zulufun.io>',
          to: [email],
          subject: `Welcome to ZuluFun, ${name}! Verify your email`,
          html: verificationEmailHtml({
            name,
            actionUrl: `${siteUrl}/auth/callback`,
            siteName: 'ZuluFun',
            siteUrl,
          }),
        });
      } catch (emailError) {
        console.error('Failed to send verification email via Resend:', emailError);
        // Don't fail the request — Supabase's default email is still sent
      }
    }

    return NextResponse.json({
      user: data.user,
      message: 'Registration successful. Please check your email to verify your account.',
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
