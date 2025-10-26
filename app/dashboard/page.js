"use client";

import { useEffect, useState } from 'react';
import AuthGuard from '../../components/AuthGuard';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [stats, setStats] = useState({ buses: 0, drivers: 0, schedules: 0 });

  useEffect(() => {
    async function load() {
      try {
        const [bRes, dRes] = await Promise.all([fetch('/api/buses'), fetch('/api/drivers')]);
        const buses = await bRes.json();
        const drivers = await dRes.json();
        setStats({ buses: buses.length, drivers: drivers.length, schedules: 10 });
      } catch (e) {
        // ignore
      }
    }
    load();
  }, []);

  const data = {
    labels: ['Xe buýt', 'Tài xế', 'Lịch trình'],
    datasets: [
      {
        label: 'Số lượng',
        data: [stats.buses, stats.drivers, stats.schedules],
        backgroundColor: ['#0d6efd', '#198754', '#ffc107'],
      },
    ],
  };

  return (
    <AuthGuard>
      <main className="container mt-4">
        <h2>Bảng điều khiển hệ thống Bus Tracking</h2>
        <p>Thống kê tổng quan về hệ thống</p>

        <div style={{ maxWidth: 720 }}>
          <Bar data={data} />
        </div>
      </main>
    </AuthGuard>
  );
}
