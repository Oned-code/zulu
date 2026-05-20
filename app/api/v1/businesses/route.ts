import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // Return directory of verified businesses
  return NextResponse.json({
    status: 'success',
    data: [
      {
        id: 'biz_01',
        name: 'SunPower Solutions JHB',
        niche: 'solar',
        verified: true,
        rating: 4.8,
        reviews_count: 124,
      }
    ]
  });
}
