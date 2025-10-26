"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem('ssb_user');
      if (!u) {
        router.replace('/login');
        return;
      }
      setReady(true);
    } catch (e) {
      router.replace('/login');
    }
  }, [router]);

  if (!ready) return <div className="container mt-4">Đang kiểm tra đăng nhập...</div>;

  return <>{children}</>;
}
