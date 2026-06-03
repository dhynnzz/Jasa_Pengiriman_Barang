import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Handshake, MapPin, Phone, Mail, CheckCircle, XCircle, Trash2, Clock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Partnerships() {
  const [partnerships, setPartnerships] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartnerships();
  }, []);

  const fetchPartnerships = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/partnerships`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPartnerships(response.data);
    } catch (error) {
      toast.error('Gagal mengambil data kemitraan');
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus, partnerName, partnerPhone) => {
    if (!window.confirm(`Ubah status pengajuan ini menjadi ${newStatus}?`)) return;
    
    // Optimistic update
    setPartnerships(prev => prev.map(p => p.id === id ? { ...p, status: newStatus } : p));
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.put(`${API_URL}/admin/partnerships/${id}`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Status berhasil diperbarui & Pesan WA otomatis terkirim!');
    } catch (error) {
      toast.error('Gagal memperbarui status');
      fetchPartnerships(); // revert on fail
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus data pengajuan ini secara permanen?')) return;
    
    setPartnerships(prev => prev.filter(p => p.id !== id));
    toast.success('Data dihapus');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/partnerships/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Gagal menghapus data');
      fetchPartnerships();
    }
  };

  return (
    <AdminLayout title="Pengajuan Kemitraan">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Calon Agen</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kontak</th>
                <th className="px-6 py-4 font-medium text-gray-900">Rencana Lokasi</th>
                <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : partnerships.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">Belum ada pengajuan baru</td>
                </tr>
              ) : partnerships.map(p => (
                <tr key={p.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="bg-orange-100 p-2 rounded-full mr-3 text-orange-600">
                        <Handshake className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500">Tempat: {p.place_status}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center"><Phone className="w-3 h-3 mr-1 text-gray-400" />{p.phone}</div>
                      <div className="flex items-center"><Mail className="w-3 h-3 mr-1 text-gray-400" />{p.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start text-gray-700">
                      <MapPin className="w-4 h-4 mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                      <div>
                        <div className="line-clamp-2">{p.address}</div>
                        <div className="text-xs font-medium mt-1 text-gray-900">{p.city}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center w-max ${
                      p.status === 'Disetujui' ? 'bg-green-100 text-green-800' :
                      p.status === 'Ditolak' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {p.status === 'Disetujui' && <CheckCircle className="w-3 h-3 mr-1" />}
                      {p.status === 'Ditolak' && <XCircle className="w-3 h-3 mr-1" />}
                      {p.status === 'Pending' && <Clock className="w-3 h-3 mr-1" />}
                      {p.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button 
                        onClick={() => updateStatus(p.id, 'Disetujui', p.name, p.phone)}
                        title="Setujui"
                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => updateStatus(p.id, 'Ditolak', p.name, p.phone)}
                        title="Tolak"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <XCircle className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        title="Hapus"
                        className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 rounded-lg">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
