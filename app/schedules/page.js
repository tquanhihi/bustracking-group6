"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Schedules() {
  const router = useRouter();
  const [schedules, setSchedules] = useState([]);
  const [name, setName] = useState('');
  const [type, setType] = useState('weekly');
  const [route, setRoute] = useState('Tuyến A');
  const [driver, setDriver] = useState('driver1');
  const [bus, setBus] = useState('Bus 01');

  useEffect(() => {
    // ensure only admin can access schedules page
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

    try {
      const raw = localStorage.getItem('ssb_schedules');
      if (raw) setSchedules(JSON.parse(raw));
    } catch (e) {}
  }, []);

  const add = (e) => {
    e.preventDefault();
    const s = { id: Date.now(), name, type, route, driver, bus, createdAt: Date.now() };
    const next = [s, ...schedules];
    setSchedules(next);
    localStorage.setItem('ssb_schedules', JSON.stringify(next));
    setName('');
  };

  return (
    <main className="app-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Quản lý lịch trình</h2>
          <small className="muted">Tạo và quản lý lịch chạy xe</small>
        </div>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <form onSubmit={add} className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Tên lịch</label>
              <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="col-md-3">
              <label className="form-label">Loại</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="weekly">Hàng tuần</option>
                <option value="monthly">Hàng tháng</option>
              </select>
            </div>
            <div className="col-md-3 d-flex align-items-end">
              <button className="btn btn-primary w-100" type="submit">Tạo lịch</button>
            </div>

            <div className="col-12">
              <label className="form-label">Tuyến</label>
              <input className="form-control" value={route} onChange={(e) => setRoute(e.target.value)} />
            </div>

            <div className="col-md-6">
              <label className="form-label">Tài xế</label>
              <input className="form-control" value={driver} onChange={(e) => setDriver(e.target.value)} />
            </div>
            <div className="col-md-6">
              <label className="form-label">Xe</label>
              <input className="form-control" value={bus} onChange={(e) => setBus(e.target.value)} />
            </div>
          </form>
        </div>
      </div>

      <section>
        <h4>Danh sách lịch</h4>
        <div className="card">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {schedules.map(s => (
                <li className="list-group-item" key={s.id}>{s.name} <span className="muted">- {s.type} - {s.route} - {s.driver} - {s.bus}</span></li>
              ))}
              {schedules.length === 0 && <li className="list-group-item muted">Chưa có lịch nào</li>}
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
