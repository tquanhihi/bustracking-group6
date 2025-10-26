// Dữ liệu tạm
const parents = [
  { id: 1, name: 'Nguyễn Văn A', student: 'Bé A', route: 'Tuyến 1' },
  { id: 2, name: 'Trần Thị B', student: 'Bé B', route: 'Tuyến 2' },
];

"use client";

import { useEffect, useState } from 'react';

export default function Parents() {
  const [parentsData, setParentsData] = useState([]);

  useEffect(() => {
    setParentsData([
      { id: 1, name: 'Nguyễn Văn A', student: 'Bé A', route: 'Tuyến 1' },
      { id: 2, name: 'Trần Thị B', student: 'Bé B', route: 'Tuyến 2' },
    ]);
  }, []);

  return (
    <main className="container mt-4">
      <h2>Phụ huynh đăng ký nhận thông tin</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên phụ huynh</th>
              <th>Học sinh</th>
              <th>Tuyến</th>
            </tr>
          </thead>
          <tbody>
            {parentsData.map((p, idx) => (
              <tr key={p.id}>
                <td>{idx + 1}</td>
                <td>{p.name}</td>
                <td>{p.student}</td>
                <td>{p.route}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
