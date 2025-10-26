"use client";

import { useEffect, useState } from 'react';

export default function DriverDashboard() {
  const [schedules, setSchedules] = useState([]);
  const [students, setStudents] = useState([]);
  const [picked, setPicked] = useState({});

  useEffect(() => {
    async function load() {
      try {
        const [sRes, stRes] = await Promise.all([fetch('/api/driver-schedules'), fetch('/api/students')]);
        const s = await sRes.json();
        const st = await stRes.json();
        setSchedules(s.filter((x) => x.driverId === 1)); // mock: driverId=1
        setStudents(st.filter((x) => x.driverId === 1));
      } catch (e) {}
    }
    load();
  }, []);

  const togglePicked = (id) => {
    setPicked((p) => {
      const next = { ...p, [id]: !p[id] };
      try {
        localStorage.setItem('ssb_pick_status', JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  };

  const sendAlert = async (type) => {
    try {
      const key = 'ssb_messages';
      const raw = localStorage.getItem(key);
      const arr = raw ? JSON.parse(raw) : [];
      const msg = { from: 'driver1', to: 'all', text: `[${type}] Tài xế báo: ${type}`, time: Date.now() };
      arr.push(msg);
      localStorage.setItem(key, JSON.stringify(arr));
      // also create an alerts store
      const alertsKey = 'ssb_alerts';
      const a = JSON.parse(localStorage.getItem(alertsKey) || '[]');
      a.push({ driverId: 1, type, message: msg.text, time: Date.now() });
      localStorage.setItem(alertsKey, JSON.stringify(a));
      alert('Đã gửi cảnh báo: ' + type);
    } catch (e) {
      alert('Không thể gửi cảnh báo');
    }
  };

  useEffect(() => {
    // load pick status
    try {
      const raw = localStorage.getItem('ssb_pick_status');
      if (raw) setPicked(JSON.parse(raw));
    } catch (e) {}
  }, []);

  return (
    <main className="container mt-4">
      <h2>Giao diện tài xế</h2>
      <section style={{ marginBottom: 20 }}>
        <h4>Lịch làm việc hôm nay</h4>
        <ul>
          {schedules.map((s) => (
            <li key={s.id}>{s.date} - {s.route} @ {s.time}</li>
          ))}
        </ul>
      </section>

      <section style={{ marginBottom: 20 }}>
        <h4>Danh sách học sinh cần đón</h4>
        <table className="table">
          <thead>
            <tr><th>STT</th><th>Tên</th><th>Điểm đón</th><th>Đã đón</th></tr>
          </thead>
          <tbody>
            {students.map((st, idx) => (
              <tr key={st.id}>
                <td>{idx+1}</td>
                <td>{st.name}</td>
                <td>{`${st.pickup.lat.toFixed(4)}, ${st.pickup.lng.toFixed(4)}`}</td>
                <td>
                  <button className="btn btn-sm btn-outline-primary" onClick={() => togglePicked(st.id)}>{picked[st.id] ? 'Đã trả' : 'Đã đón'}</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section>
        <h4>Cảnh báo / Báo cáo</h4>
        <button className="btn btn-warning me-2" onClick={() => sendAlert('incident')}>Gửi cảnh báo sự cố</button>
        <button className="btn btn-danger" onClick={() => sendAlert('delay')}>Báo trễ</button>
      </section>
    </main>
  );
}
