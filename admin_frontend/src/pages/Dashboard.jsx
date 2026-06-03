import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Package, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    delivered: 0,
    picked_up: 0,
    in_transit: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
        const token = localStorage.getItem('adminToken');
        const response = await axios.get(`${API_URL}/admin/dashboard-stats`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        toast.error('Gagal memuat statistik');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const statCards = [
    { 
      title: 'Total Pengiriman', 
      value: loading ? '...' : stats.total, 
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    { 
      title: 'Sedang Proses', 
      value: loading ? '...' : stats.active, 
      icon: <TrendingUp className="w-6 h-6 text-amber-600" />,
      bg: 'bg-amber-50',
      text: 'text-amber-600'
    },
    { 
      title: 'Dalam Perjalanan', 
      value: loading ? '...' : stats.in_transit, 
      icon: <Clock className="w-6 h-6 text-purple-600" />,
      bg: 'bg-purple-50',
      text: 'text-purple-600'
    },
    { 
      title: 'Selesai (Delivered)', 
      value: loading ? '...' : stats.delivered, 
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
      text: 'text-green-600'
    }
  ];

  return (
    <AdminLayout title="Dashboard Utama">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
            <div className={`p-4 rounded-full ${stat.bg} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className={`text-2xl font-bold ${stat.text}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang di Nabila Trans Admin! 👋</h2>
        <p className="text-blue-100 max-w-2xl">
          Pantau dan kelola semua pengiriman paket, rute perjalanan, dan performa layanan Nabila Trans dari satu tempat terpusat.
        </p>
      </div>
    </AdminLayout>
  );
}
