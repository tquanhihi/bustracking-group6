"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    // Simple frontend mock login with roles
    const mockUsers = {
      'parent1': { password: 'parent123', name: 'Nguyễn Văn A', role: 'parent', studentName: 'Học sinh A' },
      'parent2': { password: 'parent123', name: 'Trần Thị B', role: 'parent', studentName: 'Học sinh B' },
      'driver1': { password: 'driver123', name: 'Lê Văn C', role: 'driver', driverId: 1 },
      'driver2': { password: 'driver123', name: 'Phạm Thị D', role: 'driver', driverId: 2 },
      'admin': { password: 'admin123', name: 'Quản trị', role: 'admin' }
    };

    const user = mockUsers[username];
    if (!user || user.password !== password) {
      setError('Tên đăng nhập hoặc mật khẩu không đúng');
      return;
    }

    // Store user info (including role)
    localStorage.setItem('ssb_user', JSON.stringify({
      username,
      name: user.name,
      role: user.role,
      ...(user.role === 'parent' ? { studentName: user.studentName } : {}),
      ...(user.role === 'driver' ? { driverId: user.driverId } : {})
    }));

    // Redirect to home
    window.location.href = '/';
  };

  return (
    <main className="min-h-screen d-flex align-items-center justify-content-center py-5" style={{ background: 'linear-gradient(135deg, #f6f8fc 0%, #e9f0f9 100%)' }}>
      <div className="container">
        <div className="card mx-auto" style={{ maxWidth: '420px' }}>
          <div className="card-body p-4">
            <div className="text-center mb-4">
              <i className="bi bi-bus-front fs-1 text-primary mb-2"></i>
              <h2 className="mb-1">Đăng nhập</h2>
              <p className="text-muted mb-0">Hệ thống quản lý xe buýt trường học</p>
            </div>
            
            <form onSubmit={submit}>
              <div className="mb-3">
                <label className="form-label">
                  <i className="bi bi-person me-2"></i>
                  Tên đăng nhập
                </label>
                <input 
                  className="form-control form-control-lg" 
                  value={username} 
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nhập tên đăng nhập"
                />
              </div>
              <div className="mb-4">
                <label className="form-label">
                  <i className="bi bi-lock me-2"></i>
                  Mật khẩu
                </label>
                <input 
                  type="password" 
                  className="form-control form-control-lg" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Nhập mật khẩu"
                />
              </div>
              
              {error && (
                <div className="alert alert-danger d-flex align-items-center" role="alert">
                  <i className="bi bi-exclamation-triangle me-2"></i>
                  {error}
                </div>
              )}
              
              <button className="btn btn-primary btn-lg w-100 mb-3" type="submit">
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Đăng nhập
              </button>

              <div className="card bg-light border-0">
                <div className="card-body p-3">
                  <h6 className="card-title mb-2">
                    <i className="bi bi-info-circle me-2"></i>
                    Tài khoản demo
                  </h6>
                  <div className="small">
                    <div><strong>Phụ huynh:</strong> parent1/parent123</div>
                    <div><strong>Tài xế:</strong> driver1/driver123</div>
                    <div><strong>Quản trị:</strong> admin/admin123</div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}

