// Dữ liệu tạm
const drivers = [
  { id: 1, name: 'Trần Công', phone: '0901xxxx', bus: '51B-00001' },
  { id: 2, name: 'Lê Bình', phone: '0902xxxx', bus: '51B-00002' },
];

"use client";

import { useEffect, useState } from 'react';

export default function Drivers() {
  const [driversData, setDriversData] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('/api/drivers');
        const d = await res.json();
        if (mounted) setDriversData(d);
      } catch (e) {
        // fallback
      }
    }
    load();
    return () => (mounted = false);
  }, []);

  return (
    <main className="app-container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0">Danh sách tài xế</h2>
          <small className="muted">Quản lý thông tin tài xế và liên hệ</small>
        </div>
        <div>
          <button className="btn btn-outline-primary me-2">Import</button>
          <button className="btn btn-primary">Thêm tài xế</button>
        </div>
      </div>

      <div className="card">
        <div className="card-body p-3">
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 60 }}>STT</th>
                  <th>Tên tài xế</th>
                  <th>Liên hệ</th>
                  <th>Xe đảm nhiệm</th>
                  <th className="text-end">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {driversData.map((d, idx) => (
                  <tr key={d.id}>
                    <td>{idx + 1}</td>
                    <td>{d.name}</td>
                    <td>{d.phone}</td>
                    <td>{d.bus}</td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-outline-primary me-2">Sửa</button>
                      <button className="btn btn-sm btn-outline-danger">Xóa</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
