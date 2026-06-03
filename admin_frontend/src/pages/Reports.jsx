import React from 'react';
import AdminLayout from '../components/AdminLayout';
import { BarChart3, TrendingUp, PieChart, Download } from 'lucide-react';

export default function Reports() {
  return (
    <AdminLayout title="Laporan Keuangan & Statistik">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Laporan Bulan Ini</h2>
          <p className="text-sm text-gray-500">Periode: 1 - 30 Juni 2026</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          <Download className="w-4 h-4 mr-2" /> Download Laporan PDF
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-4 bg-blue-50 text-blue-600 rounded-full mr-4">
            <TrendingUp className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Pendapatan</p>
            <h3 className="text-2xl font-bold text-gray-900">Rp 45.250.000</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-4 bg-green-50 text-green-600 rounded-full mr-4">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Total Paket Terkirim</p>
            <h3 className="text-2xl font-bold text-gray-900">1,284 Paket</h3>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
          <div className="p-4 bg-purple-50 text-purple-600 rounded-full mr-4">
            <PieChart className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium">Layanan Terpopuler</p>
            <h3 className="text-2xl font-bold text-gray-900">Reguler (65%)</h3>
          </div>
        </div>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Grafik Pendapatan Mingguan</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <span className="text-gray-400 flex items-center"><BarChart3 className="mr-2" /> (Area Grafik Bar Chart)</span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-4">Distribusi Pengiriman Kota</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed border-gray-200">
            <span className="text-gray-400 flex items-center"><PieChart className="mr-2" /> (Area Grafik Pie Chart)</span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
