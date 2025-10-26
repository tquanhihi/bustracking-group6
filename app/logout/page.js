"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      localStorage.removeItem('ssb_user');
      // Chuyển về trang chủ và reload trang
      window.location.href = '/';
    } catch (e) {}
  }, []);

  return (
    <main className="container mt-4">
      <h2>Đăng xuất</h2>
      <p>Bạn đã được đăng xuất. Đang chuyển hướng về trang chính...</p>
    </main>
  );
}
