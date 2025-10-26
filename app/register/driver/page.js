"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DriverRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!username || !password || !name || !phone) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    try {
      // Get existing users or initialize empty array
      const users = JSON.parse(localStorage.getItem('ssb_users') || '[]');
      
      // Check if username exists
      if (users.some(u => u.username === username)) {
        setError('Tên đăng nhập đã tồn tại');
        return;
      }

      // Create new user with driver role
      const newUser = {
        username,
        password, // In a real app, this should be hashed
        role: 'driver',
        name,
        phone,
        driverId: Date.now() // Generate a unique ID
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('ssb_users', JSON.stringify(users));

      // Log user in
      localStorage.setItem('ssb_user', JSON.stringify({
        username,
        role: 'driver',
        driverId: newUser.driverId,
        name
      }));

      router.push('/driver');
    } catch (e) {
      setError('Đã có lỗi xảy ra');
    }
  };

  return (
    <main className="container mt-4">
      <h2>Đăng ký tài khoản Tài xế</h2>
      <form onSubmit={submit} style={{ maxWidth: 420 }}>
        <div className="mb-3">
          <label className="form-label">Tên đăng nhập</label>
          <input className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Mật khẩu</label>
          <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Họ tên</label>
          <input className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="mb-3">
          <label className="form-label">Số điện thoại</label>
          <input className="form-control" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button className="btn btn-primary" type="submit">Đăng ký</button>
        <Link href="/login" className="btn btn-link">Đã có tài khoản? Đăng nhập</Link>
      </form>
    </main>
  );
}