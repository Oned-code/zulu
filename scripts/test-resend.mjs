import https from 'https';

// Try with resend's test domain
const data = JSON.stringify({
  from: 'ZuluFun <onboarding@resend.dev>',
  to: ['wandile.chamane@gmail.com'],
  subject: 'Resend test from ZuluFun',
  html: '<h1>It works!</h1><p>Resend is configured and sending from zulu-chi.vercel.app.</p>'
});

const options = {
  hostname: 'api.resend.com',
  path: '/emails',
  method: 'POST',
  headers: {
    'Authorization': 'Bearer re_D25UnU4n_4sjVGMUQa8h7hv249qEobemB',
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
  });
});

req.on('error', e => console.error('Error:', e.message));
req.write(data);
req.end();
