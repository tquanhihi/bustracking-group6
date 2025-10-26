"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RoleRouterClient() {
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem('ssb_user');
      if (!raw) {
        router.push('/login');
        return;
      }
      const user = JSON.parse(raw);
      if (!user || !user.role) {
        router.push('/login');
        return;
      }
      if (user.role === 'admin') router.push('/admin');
      else if (user.role === 'driver') router.push('/driver');
      else if (user.role === 'parent') router.push('/parent');
      else router.push('/login');
    } catch (e) {
      router.push('/login');
    }
  }, [router]);

  return null;
}
