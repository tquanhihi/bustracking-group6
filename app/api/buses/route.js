import { NextResponse } from 'next/server';

export function GET() {
  const buses = [
    { id: 1, licensePlate: '51B-00001', driverName: 'Trần Công', routeName: 'Tuyến 1', lat: 10.7769, lng: 106.7009 },
    { id: 2, licensePlate: '51B-00002', driverName: 'Lê Bình', routeName: 'Tuyến 2', lat: 10.78, lng: 106.695 },
  ];
  return NextResponse.json(buses);
}
