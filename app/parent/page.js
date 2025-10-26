"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import MapView from '@/components/MapView';
import BusRealtime from '@/components/BusRealtime';
import { haversineDistance } from '@/utils/geo';

export default function ParentDashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [buses, setBuses] = useState([]);
  const [messages, setMessages] = useState([]);
  const [nearAlerts, setNearAlerts] = useState([]);

  useEffect(() => {
    // Check auth
    const userStr = localStorage.getItem('ssb_user');
    if (!userStr) {
      router.push('/login');
      return;
    }
    
    try {
      const userData = JSON.parse(userStr);
      if (userData.role !== 'parent') {
        router.push('/login');
        return;
      }
      setUser(userData);
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    // load initial bus positions
    const raw = localStorage.getItem('ssb_bus_positions');
    if (raw) setBuses(JSON.parse(raw));

    // messages
    const rawMsgs = localStorage.getItem('ssb_messages');
    if (rawMsgs) {
      const all = JSON.parse(rawMsgs);
      const mine = all.filter(m => m.to === user?.username || m.to === 'parent' || m.to === 'all');
      setMessages(mine);
    }

    const onStorage = (e) => {
      if (e.key === 'ssb_bus_positions') {
        try {
          const arr = JSON.parse(e.newValue || '[]');
          setBuses(arr);

          // check near arrival (within 0.5 km)
          if (user && arr && arr.length) {
            const alerts = arr.map(b => {
              const d = haversineDistance(user._lat || 10.8231, user._lng || 106.6297, b.lat, b.lng);
              return { bus: b, distanceKm: d };
            }).filter(a => a.distanceKm <= 0.5);
            setNearAlerts(alerts);
          }
        } catch (err) {}
      }
      if (e.key === 'ssb_messages') {
        try {
          const all = JSON.parse(e.newValue || '[]');
          const mine = all.filter(m => m.to === user?.username || m.to === 'parent' || m.to === 'all');
          setMessages(mine);
        } catch (err) {}
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [user]);

  useEffect(() => {
    // recompute nearAlerts on buses change if we already have user
    if (!user || !buses || buses.length === 0) return;
    const alerts = buses.map(b => {
      const d = haversineDistance(user._lat || 10.8231, user._lng || 106.6297, b.lat, b.lng);
      return { bus: b, distanceKm: d };
    }).filter(a => a.distanceKm <= 0.5);
    setNearAlerts(alerts);
  }, [buses, user]);

  if (!user) return <div>Loading...</div>;

  return (
    <main className="container-fluid mt-4">
      {/* ensure bus positions exist and simulation runs (non-destructive) */}
      <BusRealtime enableSimulation={true} />
      <div className="row">
        <div className="col-md-8">
          <div style={{ height: '500px', width: '100%' }}>
            <MapView markers={buses} />
          </div>
        </div>
        <div className="col-md-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Thông tin học sinh</h5>
              <p><strong>Họ tên:</strong> {user.studentName || 'Chưa cập nhật'}</p>
              <p><strong>Phụ huynh:</strong> {user.name}</p>
            </div>
          </div>

          <div className="card mb-3">
            <div className="card-body">
              <h6>Xe bus gần bạn</h6>
              {nearAlerts.length === 0 && <p>Không có xe đến gần.</p>}
              <ul className="list-unstyled">
                {nearAlerts.map(a => (
                  <li key={a.bus.id} className="mb-2">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <strong>{a.bus.name}</strong>
                        <div className="text-muted">Cách bạn: {(a.distanceKm*1000).toFixed(0)} m</div>
                      </div>
                      <span className="badge bg-warning">Sắp đến</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h6>Tin nhắn</h6>
              {messages.length === 0 && <p>Không có tin nhắn.</p>}
              <ul className="list-group">
                {messages.map((m, idx) => (
                  <li key={idx} className="list-group-item">
                    <div><strong>{m.from}</strong> <small className="text-muted">{new Date(m.time).toLocaleString()}</small></div>
                    <div>{m.text}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}