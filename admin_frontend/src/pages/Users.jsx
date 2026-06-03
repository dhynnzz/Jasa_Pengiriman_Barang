import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { Users as UsersIcon, Shield, Plus, Edit2, Trash2, Key, Mail, User, Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Admin'
  });

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

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'Admin'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (user) => {
    setIsEditMode(true);
    setSelectedUserId(user.id);
    setFormData({
      name: user.name,
      email: user.email,
      password: '', // Leave empty unless they want to change it
      role: user.role || 'Admin'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      if (isEditMode) {
        await axios.put(`${API_URL}/admin/users/${selectedUserId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Data pengguna berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/admin/users`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Pengguna baru berhasil ditambahkan');
      }
      
      setIsModalOpen(false);
      fetchUsers();
    } catch (error) {
      const errMsg = error.response?.data?.message || 'Gagal menyimpan data pengguna';
      toast.error(errMsg);
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
      fetchUsers();
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
          <button onClick={openAddModal} className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm">
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
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                    <div className="flex justify-center items-center">
                       <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                       Memuat data...
                    </div>
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                   <td colSpan="4" className="px-6 py-8 text-center text-gray-500">Belum ada pengguna terdaftar.</td>
                </tr>
              ) : users.map(user => (
                <tr key={user.id} className="bg-white border-b hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex justify-center items-center font-bold mr-3 shadow-sm">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      {user.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{user.email}</td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold w-max ${
                      user.role === 'Super Admin' ? 'bg-purple-100 text-purple-800' : 
                      user.role === 'Staf' ? 'bg-green-100 text-green-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      <Shield className="w-3 h-3 mr-1" /> {user.role || 'Admin'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(user)} title="Edit Pengguna" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(user.id)} title="Hapus Pengguna" className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
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

      {/* Modal Tambah/Edit Pengguna */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-6 pt-6 pb-6">
                  <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <UsersIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                      {isEditMode ? 'Edit Pengguna' : 'Tambah Pengguna Baru'}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <User className="w-4 h-4 mr-1 text-gray-400" /> Nama Lengkap
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})} 
                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border" 
                        placeholder="Misal: Nabila" 
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <Mail className="w-4 h-4 mr-1 text-gray-400" /> Alamat Email
                      </label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})} 
                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border" 
                        placeholder="admin@nabilatrans.com" 
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <Key className="w-4 h-4 mr-1 text-gray-400" /> Password
                      </label>
                      <div className="relative">
                        <input 
                          type={showPassword ? "text" : "password"}
                          required={!isEditMode}
                          value={formData.password} 
                          onChange={e => setFormData({...formData, password: e.target.value})} 
                          className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 pr-10 border" 
                          placeholder={isEditMode ? "Kosongkan jika tidak ingin mengubah password" : "Minimal 6 karakter"} 
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      {isEditMode && (
                        <p className="mt-1 text-xs text-amber-600 font-medium">*Biarkan kosong jika tidak ingin ganti password.</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1 flex items-center">
                        <Shield className="w-4 h-4 mr-1 text-gray-400" /> Peran (Role)
                      </label>
                      <select 
                        value={formData.role} 
                        onChange={e => setFormData({...formData, role: e.target.value})} 
                        className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border bg-white"
                      >
                        <option value="Admin">Admin</option>
                        <option value="Super Admin">Super Admin</option>
                        <option value="Staf">Staf Operasional</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                {/* Footer Buttons */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    Batal
                  </button>
                  <button type="submit" className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Pengguna'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
