import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users as UsersIcon, Shield, Plus, Edit2, Trash2 } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
    } catch (error) {
      toast.error('Gagal mengambil data pengguna');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus pengguna ini secara permanen?')) return;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Pengguna berhasil dihapus');
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menghapus pengguna');
    }
  };

  return (
    <AdminLayout title="Manajemen Pengguna">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
          <div>
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <UsersIcon className="w-5 h-5 mr-2 text-blue-600" /> Daftar Pengguna (Staf & Admin)
            </h2>
            <p className="text-sm text-gray-500 mt-1">Kelola siapa saja yang bisa masuk ke panel admin ini.</p>
          </div>
          <button className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Plus className="w-5 h-5 mr-2" /> Tambah Pengguna
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-white border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Nama Pengguna</th>
                <th className="px-6 py-4 font-medium text-gray-900">Email</th>
                <th className="px-6 py-4 font-medium text-gray-900">Peran (Role)</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : users.map(user => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center font-bold mr-3">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-semibold w-max">
                      <Shield className="w-3 h-3 mr-1" /> {user.role || 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg mr-1"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(user.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
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
