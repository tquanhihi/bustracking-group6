import { NextResponse } from 'next/server';

export function GET() {
  const students = [
    { id: 1, name: 'Học sinh A', driverId: 1, pickup: { lat: 10.7765, lng: 106.7010 }, parentId: 1 },
    { id: 2, name: 'Học sinh B', driverId: 1, pickup: { lat: 10.7775, lng: 106.7020 }, parentId: 2 },
    { id: 3, name: 'Học sinh C', driverId: 2, pickup: { lat: 10.78, lng: 106.695 }, parentId: 3 },
  ];
  return NextResponse.json(students);
}
