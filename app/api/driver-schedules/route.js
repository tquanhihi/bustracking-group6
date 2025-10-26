import { NextResponse } from 'next/server';

export function GET() {
  const schedules = [
    { id: 1, driverId: 1, date: '2025-10-26', route: 'Tuyến 1', time: '07:00' },
    { id: 2, driverId: 1, date: '2025-10-26', route: 'Tuyến 1', time: '13:00' },
    { id: 3, driverId: 2, date: '2025-10-26', route: 'Tuyến 2', time: '07:15' },
  ];
  return NextResponse.json(schedules);
}
