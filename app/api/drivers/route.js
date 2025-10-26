import { NextResponse } from 'next/server';

export function GET() {
  const drivers = [
    { id: 1, name: 'Trần Công', phone: '0901xxxx', bus: '51B-00001' },
    { id: 2, name: 'Lê Bình', phone: '0902xxxx', bus: '51B-00002' },
  ];
  return NextResponse.json(drivers);
}
