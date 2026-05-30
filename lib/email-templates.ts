interface EmailTemplateProps {
  name: string;
  actionUrl: string;
  siteName: string;
  siteUrl: string;
}

export function verificationEmailHtml({ name, actionUrl, siteName, siteUrl }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
    <!-- Header -->
    <tr>
      <td style="background:#1b1b3a;padding:32px 40px;text-align:center;">
        <a href="${siteUrl}" style="text-decoration:none;color:#f4b740;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${siteName}</a>
        <p style="color:rgba(244,183,64,0.6);font-size:13px;margin:8px 0 0;">Africa's Business Engine</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:40px;">
        <h1 style="font-size:22px;font-weight:700;color:#1b1b3a;margin:0 0 16px;">Welcome, ${escapeHtml(name)}!</h1>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 24px;">
          Thank you for joining ${siteName}. We're excited to have you on board. Click the button below to verify your email address and activate your account.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:32px auto;">
          <tr>
            <td style="background:#1b1b3a;border-radius:8px;">
              <a href="${actionUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;">Verify Email Address</a>
            </td>
          </tr>
        </table>
        <p style="font-size:13px;color:#a1a1aa;text-align:center;margin:24px 0 0;">
          Or copy and paste this URL into your browser:<br/>
          <a href="${actionUrl}" style="color:#1b1b3a;word-break:break-all;">${actionUrl}</a>
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="font-size:12px;color:#a1a1aa;margin:0;">
          You received this email because you signed up at <a href="${siteUrl}" style="color:#1b1b3a;">${siteName}</a>.<br/>
          If you didn't create an account, you can safely ignore this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function passwordResetEmailHtml({ name, actionUrl, siteName, siteUrl }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
    <!-- Header -->
    <tr>
      <td style="background:#1b1b3a;padding:32px 40px;text-align:center;">
        <a href="${siteUrl}" style="text-decoration:none;color:#f4b740;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${siteName}</a>
        <p style="color:rgba(244,183,64,0.6);font-size:13px;margin:8px 0 0;">Africa's Business Engine</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:40px;">
        <h1 style="font-size:22px;font-weight:700;color:#1b1b3a;margin:0 0 16px;">Reset Your Password</h1>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 8px;">
          Hi ${escapeHtml(name)},
        </p>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 24px;">
          We received a request to reset your password. Click the button below to set a new password. This link expires in 1 hour.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:32px auto;">
          <tr>
            <td style="background:#1b1b3a;border-radius:8px;">
              <a href="${actionUrl}" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;">Reset Password</a>
            </td>
          </tr>
        </table>
        <p style="font-size:13px;color:#a1a1aa;text-align:center;margin:24px 0 0;">
          Or copy and paste this URL into your browser:<br/>
          <a href="${actionUrl}" style="color:#1b1b3a;word-break:break-all;">${actionUrl}</a>
        </p>
        <p style="font-size:13px;color:#ef4444;margin:24px 0 0;">
          If you didn't request this, please ignore this email. Your password will remain unchanged.
        </p>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="font-size:12px;color:#a1a1aa;margin:0;">
          You received this email because a password reset was requested for your account at <a href="${siteUrl}" style="color:#1b1b3a;">${siteName}</a>.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function welcomeEmailHtml({ name, siteName, siteUrl, actionUrl }: EmailTemplateProps): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
    <!-- Header -->
    <tr>
      <td style="background:#1b1b3a;padding:32px 40px;text-align:center;">
        <a href="${siteUrl}" style="text-decoration:none;color:#f4b740;font-size:24px;font-weight:700;letter-spacing:-0.5px;">${siteName}</a>
        <p style="color:rgba(244,183,64,0.6);font-size:13px;margin:8px 0 0;">Africa's Business Engine</p>
      </td>
    </tr>
    <!-- Body -->
    <tr>
      <td style="padding:40px;">
        <h1 style="font-size:22px;font-weight:700;color:#1b1b3a;margin:0 0 16px;">You're in, ${escapeHtml(name)}! 🎉</h1>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 16px;">
          Your account is verified and ready to go. Here's what you can do next:
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:0 0 24px;">
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#3f3f46;">✅ Browse the latest African business news</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#3f3f46;">✅ Get quotes from verified service providers</td>
          </tr>
          <tr>
            <td style="padding:8px 0;font-size:14px;color:#3f3f46;">✅ Discover businesses across energy, security, property, auto & education</td>
          </tr>
        </table>
        <table cellpadding="0" cellspacing="0" style="margin:24px auto;">
          <tr>
            <td style="background:#f4b740;border-radius:8px;">
              <a href="${actionUrl}" style="display:inline-block;padding:14px 32px;color:#1b1b3a;text-decoration:none;font-size:15px;font-weight:700;border-radius:8px;">Go to Dashboard</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <!-- Footer -->
    <tr>
      <td style="padding:24px 40px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="font-size:12px;color:#a1a1aa;margin:0;">
          Welcome to the family — <a href="${siteUrl}" style="color:#1b1b3a;">${siteName}</a>
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
