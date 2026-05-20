import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Webhook receiver for third-party services like PayFast and Twilio
  
  try {
    const signature = request.headers.get('x-signature');
    const source = request.headers.get('x-source'); // 'payfast' or 'twilio'
    
    // In production, we would verify the signature here to ensure the webhook is genuine.
    
    const body = await request.json();
    
    if (source === 'payfast') {
      // Process payment success/failure, update B2B client wallet balance
      console.log('Processed PayFast webhook', body.pf_payment_id);
    } else if (source === 'twilio') {
      // Process SMS delivery receipts or incoming SMS messages
      console.log('Processed Twilio webhook', body.MessageStatus);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 });
  }
}
