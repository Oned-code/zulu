interface QuoteConfirmationProps {
  name: string;
  quoteTitle: string;
  niche: string;
  location: string;
  siteUrl: string;
}

export function quoteConfirmationEmailHtml({ name, quoteTitle, niche, location, siteUrl }: QuoteConfirmationProps): string {
  const nicheLabels: Record<string, string> = {
    power: 'Power & Energy',
    security: 'Security',
    real_estate: 'Real Estate',
    automotive: 'Automotive',
    education: 'Education',
    crypto: 'Crypto',
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
    <tr>
      <td style="background:#1b1b3a;padding:32px 40px;text-align:center;">
        <a href="${siteUrl}" style="text-decoration:none;color:#f4b740;font-size:24px;font-weight:700;letter-spacing:-0.5px;">ZuluFun</a>
        <p style="color:rgba(244,183,64,0.6);font-size:13px;margin:8px 0 0;">Africa's Business Engine</p>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <div style="text-align:center;margin-bottom:24px;">
          <div style="width:56px;height:56px;background:#dcfce7;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;">
            <span style="font-size:28px;">✓</span>
          </div>
        </div>
        <h1 style="font-size:22px;font-weight:700;color:#1b1b3a;margin:0 0 16px;text-align:center;">Quote Request Received!</h1>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 24px;">
          Hi ${escapeHtml(name)}, your request <strong>"${escapeHtml(quoteTitle)}"</strong> has been submitted successfully.
        </p>
        <table cellpadding="0" cellspacing="0" style="width:100%;background:#f4f4f5;border-radius:12px;margin:0 0 24px;">
          <tr>
            <td style="padding:16px 20px;">
              <p style="font-size:13px;color:#71717a;margin:0 0 4px;"><strong>Category</strong></p>
              <p style="font-size:15px;color:#1b1b3a;margin:0 0 12px;">${nicheLabels[niche] || niche}</p>
              <p style="font-size:13px;color:#71717a;margin:0 0 4px;"><strong>Location</strong></p>
              <p style="font-size:15px;color:#1b1b3a;margin:0;">${escapeHtml(location)}</p>
            </td>
          </tr>
        </table>
        <p style="font-size:15px;color:#3f3f46;line-height:1.6;margin:0 0 24px;">
          We're matching you with up to 4 verified ${nicheLabels[niche] || niche} professionals in your area. You'll receive their contact details via email shortly.
        </p>
        <table cellpadding="0" cellspacing="0" style="margin:24px auto;">
          <tr>
            <td style="background:#1b1b3a;border-radius:8px;">
              <a href="${siteUrl}/dashboard" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;border-radius:8px;">Track Your Request</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 40px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="font-size:12px;color:#a1a1aa;margin:0;">You'll get an email as soon as professionals respond.</p>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

interface LeadNotificationProps {
  businessName: string;
  quoteTitle: string;
  niche: string;
  location: string;
  budgetMin?: number | null;
  budgetMax?: number | null;
  timeline: string;
  siteUrl: string;
  quoteId: string;
  businessId: string;
  leadPrice: number;
  profileComplete: boolean;
}

export function leadNotificationEmailHtml({
  businessName,
  quoteTitle,
  niche,
  location,
  budgetMin,
  budgetMax,
  timeline,
  siteUrl,
  quoteId,
  businessId,
  leadPrice,
}: LeadNotificationProps): string {
  const nicheLabels: Record<string, string> = {
    power: 'Power & Energy',
    security: 'Security',
    real_estate: 'Real Estate',
    automotive: 'Automotive',
    education: 'Education',
    crypto: 'Crypto',
  };

  const timelineLabels: Record<string, string> = {
    asap: '⚡ ASAP',
    '2_weeks': '📅 Within 2 weeks',
    '1_month': '📅 Within 1 month',
    '3_months': '📅 Within 3 months',
    planning: '🔍 Just planning',
  };

  const budgetDisplay = budgetMin && budgetMax
    ? `R ${Number(budgetMin).toLocaleString()} – R ${Number(budgetMax).toLocaleString()}`
    : 'Not specified';

  const buyUrl = `${siteUrl}/api/leads?quote_id=${quoteId}&business_id=${businessId}&price=${leadPrice}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e4e4e7;">
    <tr>
      <td style="background:#1b1b3a;padding:32px 40px;text-align:center;">
        <a href="${siteUrl}" style="text-decoration:none;color:#f4b740;font-size:24px;font-weight:700;letter-spacing:-0.5px;">ZuluFun</a>
        <p style="color:rgba(244,183,64,0.6);font-size:13px;margin:8px 0 0;">Lead Notification</p>
      </td>
    </tr>
    <tr>
      <td style="padding:40px;">
        <h1 style="font-size:20px;font-weight:700;color:#1b1b3a;margin:0 0 8px;">New Lead Alert 🔔</h1>
        <p style="font-size:14px;color:#71717a;margin:0 0 24px;">Hi ${escapeHtml(businessName)}, a new customer in your area is looking for your services.</p>

        <h2 style="font-size:18px;font-weight:600;color:#1b1b3a;margin:0 0 16px;">${escapeHtml(quoteTitle)}</h2>

        <table cellpadding="0" cellspacing="0" style="width:100%;background:#f4f4f5;border-radius:12px;margin:0 0 24px;">
          <tr>
            <td style="padding:16px 20px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#71717a;width:120px;">Category</td>
                  <td style="padding:6px 0;font-size:13px;color:#1b1b3a;font-weight:500;">${nicheLabels[niche] || niche}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#71717a;">Location</td>
                  <td style="padding:6px 0;font-size:13px;color:#1b1b3a;font-weight:500;">${escapeHtml(location)}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#71717a;">Budget</td>
                  <td style="padding:6px 0;font-size:13px;color:#1b1b3a;font-weight:500;">${budgetDisplay}</td>
                </tr>
                <tr>
                  <td style="padding:6px 0;font-size:13px;color:#71717a;">Timeline</td>
                  <td style="padding:6px 0;font-size:13px;color:#1b1b3a;font-weight:500;">${timelineLabels[timeline] || timeline}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <div style="background:#fefce8;border:1px solid #fde68a;border-radius:12px;padding:16px 20px;margin:0 0 24px;">
          <p style="font-size:13px;color:#92400e;margin:0;text-align:center;">
            <strong>Lead Price: R ${leadPrice}</strong> · 1 credit = R 1 · Deducted from your balance
          </p>
        </div>

        <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
          <tr>
            <td style="background:#f4b740;border-radius:8px;">
              <a href="${buyUrl}" style="display:inline-block;padding:14px 32px;color:#1b1b3a;text-decoration:none;font-size:15px;font-weight:700;border-radius:8px;">Buy Lead — R ${leadPrice}</a>
            </td>
          </tr>
        </table>

        <p style="font-size:12px;color:#a1a1aa;text-align:center;margin:16px 0 0;">
          Or view all leads in your <a href="${siteUrl}/dashboard/business" style="color:#1b1b3a;">business dashboard</a>
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 40px;background:#fafafa;border-top:1px solid #e4e4e7;text-align:center;">
        <p style="font-size:12px;color:#a1a1aa;margin:0;">You have credits available · Click to unlock the customer's contact details</p>
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
