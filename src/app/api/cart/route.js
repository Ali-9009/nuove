import { NextResponse } from 'next/server';
import { executeCart } from '@/lib/shopify-cart';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    const { action, ...input } = await request.json();
    if (!['get', 'add', 'update', 'remove'].includes(action)) {
      return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });
    }
    const forwarded = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
    const ip = forwarded || '';
    const cart = await executeCart(action, input, ip);
    return NextResponse.json({ cart }, { headers: { 'Cache-Control': 'no-store' } });
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Cart request failed.' }, { status: 400 });
  }
}
