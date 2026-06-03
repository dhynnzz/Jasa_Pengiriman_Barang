import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Download, Calendar, IndianRupee, Package, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Reports() {
  const [data, setData] = useState({
    summary: { total_shipments: 0, total_revenue: 0 },
    chart_data: [],
    transactions: []
  });
  const [loading, setLoading] = useState(true);
  
  const currentDate = new Date();
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());

  useEffect(() => {
    fetchReport();
  }, [selectedMonth, selectedYear]);

  const fetchReport = async () => {
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/reports`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { month: selectedMonth, year: selectedYear }
      });
      if (response.data.success) {
        setData(response.data);
      }
    } catch (error) {
      toast.error('Gagal memuat laporan');
    } finally {
      setLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number || 0);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute:'2-digit'
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <AdminLayout title="Laporan Keuangan & Operasional">
      
      {/* Filter Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6 flex flex-col sm:flex-row justify-between items-center print:hidden">
        <div className="flex items-center space-x-4 mb-4 sm:mb-0">
          <div className="flex items-center bg-gray-50 px-3 py-2 rounded-lg border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-500 mr-2" />
            <select 
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
            >
              <option value={1}>Januari</option>
              <option value={2}>Februari</option>
              <option value={3}>Maret</option>
              <option value={4}>April</option>
              <option value={5}>Mei</option>
              <option value={6}>Juni</option>
              <option value={7}>Juli</option>
              <option value={8}>Agustus</option>
              <option value={9}>September</option>
              <option value={10}>Oktober</option>
              <option value={11}>November</option>
              <option value={12}>Desember</option>
            </select>
            <span className="mx-2 text-gray-300">|</span>
            <select 
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="bg-transparent border-none text-sm font-medium text-gray-700 focus:ring-0 cursor-pointer"
            >
              {[2025, 2026, 2027, 2028].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <button onClick={fetchReport} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100">
            <Filter className="w-5 h-5" />
          </button>
        </div>
        
        <button 
          onClick={handlePrint}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          <Download className="w-4 h-4 mr-2" />
          Cetak Laporan (PDF)
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64 text-gray-500">Memuat laporan...</div>
      ) : (
        <div className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-green-100 font-medium mb-1">Total Pendapatan (Bulan Ini)</p>
                  <h3 className="text-3xl font-bold">{formatRupiah(data.summary.total_revenue)}</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <IndianRupee className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-blue-100 font-medium mb-1">Total Resi Terbit (Bulan Ini)</p>
                  <h3 className="text-3xl font-bold">{data.summary.total_shipments} Paket</h3>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-bold text-gray-800 mb-6">Grafik Pendapatan Harian</h3>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.chart_data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#6B7280', fontSize: 12}} dy={10} />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#6B7280', fontSize: 12}}
                    tickFormatter={(value) => `Rp ${value / 1000}k`}
                  />
                  <Tooltip 
                    cursor={{fill: '#F3F4F6'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                    formatter={(value) => formatRupiah(value)}
                  />
                  <Bar dataKey="pendapatan" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-800">Rincian Transaksi Bulanan</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-4 font-medium text-gray-900">Tanggal</th>
                    <th className="px-6 py-4 font-medium text-gray-900">No. Resi</th>
                    <th className="px-6 py-4 font-medium text-gray-900">Rute</th>
                    <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                    <th className="px-6 py-4 font-medium text-gray-900 text-right">Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                  {data.transactions.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        Tidak ada transaksi pada bulan ini.
                      </td>
                    </tr>
                  ) : (
                    data.transactions.map((trx) => (
                      <tr key={trx.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{formatDate(trx.created_at)}</td>
                        <td className="px-6 py-4 font-medium text-blue-600">{trx.tracking_number}</td>
                        <td className="px-6 py-4">
                          <div className="text-xs text-gray-500">{trx.origin || 'Asal'}</div>
                          <div className="text-gray-800 font-medium">{trx.destination || 'Tujuan'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                            {trx.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900 text-right">
                          {formatRupiah(trx.total_price)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
