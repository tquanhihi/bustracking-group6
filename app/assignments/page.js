"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AssignmentsPage() {
  const [routes, setRoutes] = useState([]);
  const [buses, setBuses] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [assignments, setAssignments] = useState([]);

  const [routeId, setRouteId] = useState('');
  const [busId, setBusId] = useState('');
  const [driverUsername, setDriverUsername] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // load or init demo data
    try {
      const rRaw = localStorage.getItem('ssb_routes');
      if (rRaw) setRoutes(JSON.parse(rRaw));
      else {
        const demoRoutes = [
          { id: 1, name: 'Tuyến A' },
          { id: 2, name: 'Tuyến B' }
        ];
        localStorage.setItem('ssb_routes', JSON.stringify(demoRoutes));
        setRoutes(demoRoutes);
      }

      const bRaw = localStorage.getItem('ssb_buses');
      if (bRaw) setBuses(JSON.parse(bRaw));
      else {
        const demoBuses = [
          { id: 1, name: 'Bus 01', plate: '29A-000.01' },
          { id: 2, name: 'Bus 02', plate: '29A-000.02' }
        ];
        localStorage.setItem('ssb_buses', JSON.stringify(demoBuses));
        setBuses(demoBuses);
      }

      const uRaw = localStorage.getItem('ssb_users');
      if (uRaw) {
        const uu = JSON.parse(uRaw).filter(x => x.role === 'driver');
        setDrivers(uu);
      } else {
        // ensure drivers exist
        const demoUsers = [
          { username: 'driver1', role: 'driver', name: 'Lê Văn C', driverId: 1 },
          { username: 'driver2', role: 'driver', name: 'Phạm Thị D', driverId: 2 }
        ];
        localStorage.setItem('ssb_users', JSON.stringify(demoUsers));
        setDrivers(demoUsers);
      }

      const aRaw = localStorage.getItem('ssb_assignments');
      if (aRaw) setAssignments(JSON.parse(aRaw));
    } catch (e) {
      // ignore
    }
  }, []);

  const saveAssignments = (next) => {
    setAssignments(next);
    try { localStorage.setItem('ssb_assignments', JSON.stringify(next)); } catch (e) {}
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setMessage('');
    if (!routeId || !busId || !driverUsername) {
      setMessage('Vui lòng chọn tuyến, xe và tài xế');
      return;
    }

    const route = routes.find(r => String(r.id) === String(routeId));
    const bus = buses.find(b => String(b.id) === String(busId));
    const driver = drivers.find(d => d.username === driverUsername);

    if (!route || !bus || !driver) {
      setMessage('Dữ liệu không hợp lệ');
      return;
    }

    // Prevent duplicate assignment for same route
    const exists = assignments.find(a => a.routeId === route.id && a.busId === bus.id && a.driverUsername === driver.username);
    if (editingId === null && exists) {
      setMessage('Phân công này đã tồn tại');
      return;
    }

    if (editingId !== null) {
      // update
      const next = assignments.map(a => a.id === editingId ? {
        ...a,
        routeId: route.id,
        routeName: route.name,
        busId: bus.id,
        busName: bus.name,
        driverUsername: driver.username,
        driverName: driver.name,
        updatedAt: Date.now()
      } : a);
      saveAssignments(next);
      setMessage('Cập nhật phân công thành công');
    } else {
      const item = {
        id: Date.now(),
        routeId: route.id,
        routeName: route.name,
        busId: bus.id,
        busName: bus.name,
        driverUsername: driver.username,
        driverName: driver.name,
        createdAt: Date.now()
      };
      saveAssignments([item, ...assignments]);
      setMessage('Phân công thành công');
    }

    // reset
    setEditingId(null);
    setRouteId('');
    setBusId('');
    setDriverUsername('');
  };

  const onEdit = (id) => {
    const a = assignments.find(x => x.id === id);
    if (!a) return;
    setEditingId(id);
    setRouteId(a.routeId);
    setBusId(a.busId);
    setDriverUsername(a.driverUsername);
    setMessage('Đang chỉnh sửa phân công');
  };

  const onDelete = (id) => {
    if (!confirm('Xóa phân công này?')) return;
    const next = assignments.filter(a => a.id !== id);
    saveAssignments(next);
  };

  return (
    <main className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Phân công tài xế & xe cho tuyến</h2>
        <Link href="/admin" className="btn btn-outline-secondary">Quay lại Admin</Link>
      </div>

      <form onSubmit={onSubmit} style={{ maxWidth: 720 }} className="mb-4">
        <div className="row g-2">
          <div className="col-md-4">
            <label className="form-label">Tuyến</label>
            <select className="form-select" value={routeId} onChange={e => setRouteId(e.target.value)}>
              <option value="">-- Chọn tuyến --</option>
              {routes.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Xe</label>
            <select className="form-select" value={busId} onChange={e => setBusId(e.target.value)}>
              <option value="">-- Chọn xe --</option>
              {buses.map(b => <option key={b.id} value={b.id}>{b.name} ({b.plate || ''})</option>)}
            </select>
          </div>

          <div className="col-md-4">
            <label className="form-label">Tài xế</label>
            <select className="form-select" value={driverUsername} onChange={e => setDriverUsername(e.target.value)}>
              <option value="">-- Chọn tài xế --</option>
              {drivers.map(d => <option key={d.username} value={d.username}>{d.name} ({d.username})</option>)}
            </select>
          </div>
        </div>

        <div className="mt-3">
          <button className="btn btn-primary me-2" type="submit">{editingId ? 'Cập nhật' : 'Gán tài xế & xe'}</button>
          {editingId && <button type="button" className="btn btn-secondary" onClick={() => { setEditingId(null); setRouteId(''); setBusId(''); setDriverUsername(''); setMessage('Hủy chỉnh sửa'); }}>Hủy</button>}
        </div>
        {message && <div className="mt-3 alert alert-info">{message}</div>}
      </form>

      <section>
        <h4>Danh sách phân công</h4>
        {assignments.length === 0 && <p>Chưa có phân công nào.</p>}
        <div className="list-group">
          {assignments.map(a => (
            <div key={a.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <div><strong>{a.routeName}</strong></div>
                <div className="text-muted">Xe: {a.busName} — Tài xế: {a.driverName} ({a.driverUsername})</div>
              </div>
              <div>
                <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(a.id)}>Chỉnh sửa</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(a.id)}>Xóa</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
