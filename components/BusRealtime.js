"use client";

import { useEffect } from 'react';

// This component runs in the client and simulates bus position updates by
// slightly moving each bus every 2 seconds and writing the positions to
// localStorage key `ssb_bus_positions`. Other tabs/pages can listen to the
// storage event to get near-real-time updates (<=2s).

export default function BusRealtime({ enableSimulation = true }) {
  useEffect(() => {
    // initialize default buses if not present
    try {
      const key = 'ssb_bus_positions';
      const raw = localStorage.getItem(key);
      if (!raw) {
        const initial = [
          { id: 1, name: 'Bus 01', lat: 10.8231, lng: 106.6297, updatedAt: Date.now() },
          { id: 2, name: 'Bus 02', lat: 10.8350, lng: 106.6590, updatedAt: Date.now() }
        ];
        localStorage.setItem(key, JSON.stringify(initial));
      }
    } catch (e) {}

    if (!enableSimulation) return;

    const key = 'ssb_bus_positions';
    const t = setInterval(() => {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) return;
        const list = JSON.parse(raw);
        const moved = list.map(b => {
          // small random move (~up to ~0.0005 degrees)
          const dLat = (Math.random() - 0.5) * 0.001;
          const dLng = (Math.random() - 0.5) * 0.001;
          return { ...b, lat: b.lat + dLat, lng: b.lng + dLng, updatedAt: Date.now() };
        });
        // write back; this triggers storage events in other tabs
        localStorage.setItem(key, JSON.stringify(moved));
      } catch (e) {
        // ignore
      }
    }, 2000);

    return () => clearInterval(t);
  }, [enableSimulation]);

  return null;
}
