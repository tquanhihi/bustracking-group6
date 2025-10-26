"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminPage() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    // restrict to admin
    try {
      const userStr = localStorage.getItem('ssb_user');
      if (!userStr) {
        router.push('/login');
        return;
      }
      const user = JSON.parse(userStr);
      if (!user || user.role !== 'admin') {
        router.push('/login');
        return;
      }
    } catch (e) {
      router.push('/login');
      return;
    }

    // load or init demo data
    try {
      const u = JSON.parse(localStorage.getItem('ssb_users') || 'null');
      if (u) setUsers(u);
      else {
        const demoUsers = [
          { username: 'parent1', role: 'parent', name: 'Nguyễn Văn A', studentName: 'Học sinh A' },
          { username: 'parent2', role: 'parent', name: 'Trần Thị B', studentName: 'Học sinh B' },
          { username: 'driver1', role: 'driver', name: 'Lê Văn C', driverId: 1 },
          { username: 'driver2', role: 'driver', name: 'Phạm Thị D', driverId: 2 },
          { username: 'admin', role: 'admin', name: 'Quản trị' }
        ];
        localStorage.setItem('ssb_users', JSON.stringify(demoUsers));
        setUsers(demoUsers);
      }

      const b = JSON.parse(localStorage.getItem('ssb_buses') || 'null');
      if (b) setBuses(b);
      else {
        const demoBuses = [
          { id: 1, plate: '29A-000.01', name: 'Bus 01' },
          { id: 2, plate: '29A-000.02', name: 'Bus 02' }
        ];
        localStorage.setItem('ssb_buses', JSON.stringify(demoBuses));
        setBuses(demoBuses);
      }

      const r = JSON.parse(localStorage.getItem('ssb_routes') || 'null');
      if (r) setRoutes(r);
      else {
        const demoRoutes = [
          { id: 1, name: 'Tuyến A', stops: ['Stop 1', 'Stop 2'] },
          { id: 2, name: 'Tuyến B', stops: ['Stop 3', 'Stop 4'] }
        ];
        localStorage.setItem('ssb_routes', JSON.stringify(demoRoutes));
        setRoutes(demoRoutes);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  return (
    <main className="app-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Admin - Quản lý</h2>
          <small className="muted">Tổng quan hệ thống và các thao tác quản trị</small>
        </div>
        <div>
          <Link href="/schedules" className="btn btn-primary me-2">Quản lý Lịch trình</Link>
          <Link href="/assignments" className="btn btn-outline-primary">Phân công</Link>
        </div>
      </div>

      <div className="row g-3">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Người dùng</h5>
              <ul className="list-group list-group-flush">
                {users.map(u => (
                  <li className="list-group-item" key={u.username}>{u.username} - <span className="muted">{u.role}</span> - {u.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Xe buýt</h5>
              <ul className="list-group list-group-flush">
                {buses.map(b => (
                  <li className="list-group-item" key={b.id}>{b.name} - <span className="muted">{b.plate}</span></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Tuyến</h5>
              <ul className="list-group list-group-flush">
                {routes.map(r => (
                  <li className="list-group-item" key={r.id}>{r.name} - <span className="muted">{r.stops.length} stops</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
