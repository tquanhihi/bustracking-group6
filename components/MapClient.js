"use client";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix icon cho marker của leaflet khi dùng với React/Next.js
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.3/images/marker-shadow.png',
});

export default function MapClient({ markers = [], height = 400 }) {
  const defaultCenter = [10.7769, 106.7009];

  let bounds = null;
  if (markers && markers.length > 0) {
    const latlngs = markers.map((m) => [m.lat, m.lng]);
    bounds = L.latLngBounds(latlngs);
  }

  return (
    <div style={{ height: `${height}px`, width: '100%' }}>
      <MapContainer
        center={markers && markers.length > 0 ? [markers[0].lat, markers[0].lng] : defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        whenCreated={(map) => {
          if (bounds) {
            try {
              map.fitBounds(bounds, { padding: [40, 40] });
            } catch (e) {
              // ignore fitBounds errors
            }
          }
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {markers && markers.length > 0 ? (
          markers.map((m) => (
            <Marker key={m.id ?? `${m.lat}-${m.lng}`} position={[m.lat, m.lng]}>
              <Popup>{m.label || m.name || 'Vị trí xe'}</Popup>
            </Marker>
          ))
        ) : (
          <Marker position={defaultCenter}>
            <Popup>Hồ Chí Minh City</Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
