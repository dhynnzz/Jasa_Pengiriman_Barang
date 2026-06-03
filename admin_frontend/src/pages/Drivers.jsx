import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { User, MapPin, Truck, Plus, Search, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/drivers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrivers(response.data);
    } catch (error) {
      toast.error('Gagal mengambil data kurir');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus kurir ini?')) return;
    
    setDrivers(prev => prev.filter(d => d.id !== id));
    toast.success('Kurir dihapus');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/drivers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Gagal menghapus kurir');
      fetchDrivers();
    }
  };

  return (
    <AdminLayout title="Manajemen Kurir & Armada">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama kurir atau plat nomor..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Plus className="w-5 h-5 mr-2" /> Tambah Kurir Baru
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Nama Kurir</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kontak</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kendaraan & Plat</th>
                <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : drivers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Belum ada data kurir</td>
                </tr>
              ) : drivers.map(driver => (
                <tr key={driver.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-2 rounded-full mr-3 text-blue-600">
                        <User className="w-5 h-5" />
                      </div>
                      <div>{driver.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{driver.phone}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center">
                      <Truck className="w-4 h-4 mr-2 text-gray-400" />
                      <span>{driver.vehicle_type} ({driver.plate_number})</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      driver.status === 'Dalam Perjalanan' ? 'bg-blue-100 text-blue-800' :
                      driver.status === 'Aktif' ? 'bg-green-100 text-green-800' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(driver.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
