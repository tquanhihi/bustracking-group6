'use client';

import dynamic from 'next/dynamic';

// Load the real map component only on the client to avoid server-side "window is not defined" errors.
const MapClient = dynamic(() => import('./MapClient'), { ssr: false });

export default function MapView(props) {
  return <MapClient {...props} />;
}
