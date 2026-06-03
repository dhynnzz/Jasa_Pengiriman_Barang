import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, Clock, CheckCircle, IndianRupee, Plus, Printer, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Dashboard() {
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    delivered: 0,
    in_transit: 0,
    today_revenue: 0,
    month_revenue: 0,
    recent_shipments: [],
    chart_data: []
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

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number || 0);
  };

  const statCards = [
    { 
      title: 'Total Pengiriman', 
      value: loading ? '...' : stats.total, 
      icon: <Package className="w-6 h-6 text-blue-600" />,
      bg: 'bg-blue-50',
      text: 'text-blue-600'
    },
    { 
      title: 'Pendapatan Hari Ini', 
      value: loading ? '...' : formatRupiah(stats.today_revenue), 
      icon: <IndianRupee className="w-6 h-6 text-green-600" />,
      bg: 'bg-green-50',
      text: 'text-green-600'
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
      icon: <CheckCircle className="w-6 h-6 text-indigo-600" />,
      bg: 'bg-indigo-50',
      text: 'text-indigo-600'
    }
  ];

  return (
    <AdminLayout title="Dashboard Utama">
      {/* Welcome & Quick Actions */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Selamat Datang di Nabila Trans Admin! 👋</h2>
          <p className="text-blue-100 max-w-xl">
            Pantau dan kelola semua pengiriman paket, pendapatan, dan performa layanan dari satu tempat terpusat.
          </p>
        </div>
        
        <div className="md:w-72 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-center gap-3">
          <Link to="/shipments" className="w-full flex items-center justify-center px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            <Plus className="w-4 h-4 mr-2" /> Buat Resi Baru
          </Link>
          <Link to="/partnerships" className="w-full flex items-center justify-center px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            <Users className="w-4 h-4 mr-2" /> Cek Kemitraan Baru
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center transition-transform hover:-translate-y-1">
            <div className={`p-4 rounded-full ${stat.bg} mr-4`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">{stat.title}</p>
              <h3 className={`text-xl font-bold ${stat.text}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Chart Section */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-6">Tren Pengiriman (7 Hari Terakhir)</h3>
          <div className="h-72 w-full">
            {loading ? (
              <div className="w-full h-full flex items-center justify-center text-gray-400">Memuat grafik...</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                  />
                  <Line type="monotone" dataKey="pengiriman" stroke="#2563EB" strokeWidth={3} dot={{r: 4, fill: '#2563EB', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Financial Summary */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-600" /> Ringkasan Keuangan
            </h3>
            
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-1">Pendapatan Bulan Ini</p>
                <p className="text-2xl font-bold text-gray-800">
                  {loading ? '...' : formatRupiah(stats.month_revenue)}
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                <p className="text-sm text-gray-500 font-medium mb-1">Pendapatan Hari Ini</p>
                <p className="text-xl font-bold text-blue-600">
                  {loading ? '...' : formatRupiah(stats.today_revenue)}
                </p>
              </div>
            </div>
          </div>
          <Link to="/reports" className="mt-6 text-center text-sm font-medium text-blue-600 hover:text-blue-700">
            Lihat Laporan Lengkap &rarr;
          </Link>
        </div>
      </div>

      {/* Recent Shipments */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-800">Pengiriman Terbaru</h3>
          <Link to="/shipments" className="text-sm font-medium text-blue-600 hover:text-blue-700">Lihat Semua</Link>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 rounded-t-lg">
              <tr>
                <th className="px-4 py-3 rounded-tl-lg font-medium">No. Resi</th>
                <th className="px-4 py-3 font-medium">Pengirim</th>
                <th className="px-4 py-3 font-medium">Penerima</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 rounded-tr-lg font-medium text-right">Tarif</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center">Memuat data...</td>
                </tr>
              ) : stats.recent_shipments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-4 text-center">Belum ada pengiriman</td>
                </tr>
              ) : stats.recent_shipments.map((shipment) => (
                <tr key={shipment.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-blue-600">{shipment.tracking_number}</td>
                  <td className="px-4 py-3 text-gray-800">{shipment.sender_name}</td>
                  <td className="px-4 py-3 text-gray-800">{shipment.receiver_name}</td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {shipment.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 text-right">
                    {formatRupiah(shipment.total_price)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
