import { NextResponse } from 'next/server';

let alerts = [];

export async function POST(request) {
  try {
    const body = await request.json();
    const id = alerts.length + 1;
    const entry = { id, ...body, createdAt: new Date().toISOString() };
    alerts.push(entry);
    return NextResponse.json({ ok: true, entry });
  } catch (e) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json(alerts);
}
