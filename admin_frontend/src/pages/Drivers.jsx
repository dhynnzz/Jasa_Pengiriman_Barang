import React, { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import { User, MapPin, Truck, Plus, Search, Edit2, Trash2, ShieldCheck, Activity, Coffee } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Drivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    vehicle_type: 'Mobil Pick-up',
    plate_number: '',
    status: 'Aktif'
  });

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

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      name: '',
      phone: '',
      vehicle_type: 'Mobil Pick-up',
      plate_number: '',
      status: 'Aktif'
    });
    setIsModalOpen(true);
  };

  const openEditModal = (driver) => {
    setIsEditMode(true);
    setSelectedDriverId(driver.id);
    setFormData({
      name: driver.name,
      phone: driver.phone,
      vehicle_type: driver.vehicle_type,
      plate_number: driver.plate_number,
      status: driver.status
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      if (isEditMode) {
        await axios.put(`${API_URL}/admin/drivers/${selectedDriverId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Data kurir berhasil diperbarui');
      } else {
        await axios.post(`${API_URL}/admin/drivers`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Kurir baru berhasil ditambahkan');
      }
      
      setIsModalOpen(false);
      fetchDrivers();
    } catch (error) {
      toast.error('Gagal menyimpan data kurir');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Hapus kurir ini permanen?')) return;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      await axios.delete(`${API_URL}/admin/drivers/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      toast.success('Kurir berhasil dihapus');
      fetchDrivers();
    } catch (error) {
      toast.error('Gagal menghapus kurir');
    }
  };

  // Filtering Logic
  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          driver.plate_number.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = true;
    if (activeFilter !== 'Semua') {
      matchesCategory = driver.status === activeFilter;
    }
    
    return matchesSearch && matchesCategory;
  });

  // Avatar helper
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  // Color generator based on name length for fun avatars
  const getAvatarColor = (name) => {
    const colors = ['bg-indigo-100 text-indigo-700', 'bg-rose-100 text-rose-700', 'bg-amber-100 text-amber-700', 'bg-emerald-100 text-emerald-700', 'bg-cyan-100 text-cyan-700'];
    return colors[name.length % colors.length];
  };

  return (
    <AdminLayout title="Manajemen Kurir">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Actions & Filters */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {['Semua', 'Aktif', 'Dalam Perjalanan', 'Istirahat'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === filter 
                      ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                      : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>

            <button
              onClick={openAddModal}
              className="w-full lg:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm hover:shadow"
            >
              <Plus className="w-4 h-4 mr-2" />
              Tambah Kurir Baru
            </button>
          </div>

          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nama kurir atau plat nomor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Profil Kurir</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kendaraan & Plat</th>
                <th className="px-6 py-4 font-medium text-gray-900">Kontak</th>
                <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="inline-flex items-center text-gray-500">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Memuat data kurir...
                    </div>
                  </td>
                </tr>
              ) : filteredDrivers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <User className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Tidak Ada Data</h3>
                      <p className="text-gray-500">Belum ada kurir yang terdaftar atau ditemukan.</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDrivers.map(driver => (
                <tr key={driver.id} className="bg-white border-b hover:bg-gray-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold text-sm ${getAvatarColor(driver.name)}`}>
                        {getInitials(driver.name)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">{driver.name}</div>
                        <div className="text-xs text-gray-400">ID: KRR-{driver.id.toString().padStart(4, '0')}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1.5">
                      <div className="flex items-center text-gray-700">
                        <Truck className="w-4 h-4 mr-1.5 text-gray-400" />
                        <span className="font-medium">{driver.vehicle_type}</span>
                      </div>
                      <div className="inline-block border-2 border-gray-800 rounded px-2 py-0.5 w-max bg-gray-50 text-gray-900 font-bold tracking-widest text-xs uppercase shadow-sm">
                        {driver.plate_number}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600 font-medium">
                    {driver.phone}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      driver.status === 'Dalam Perjalanan' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      driver.status === 'Aktif' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {driver.status === 'Dalam Perjalanan' && <Activity className="w-3 h-3 mr-1" />}
                      {driver.status === 'Aktif' && <ShieldCheck className="w-3 h-3 mr-1" />}
                      {driver.status === 'Istirahat' && <Coffee className="w-3 h-3 mr-1" />}
                      {driver.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => openEditModal(driver)} title="Edit Kurir" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(driver.id)} title="Hapus Kurir" className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
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

      {/* Modal Tambah/Edit Kurir */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setIsModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full border border-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-6 pt-6 pb-6">
                  <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                      {isEditMode ? 'Edit Profil Kurir' : 'Tambah Kurir Baru'}
                    </h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nama Lengkap Kurir</label>
                      <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: Budi Santoso" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Telepon / WhatsApp</label>
                      <input type="text" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: 081234567890" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Jenis Kendaraan</label>
                        <select value={formData.vehicle_type} onChange={e => setFormData({...formData, vehicle_type: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white">
                          <option value="Mobil Pick-up">Mobil Pick-up</option>
                          <option value="Mobil Box">Mobil Box</option>
                          <option value="Truk Engkel">Truk Engkel</option>
                          <option value="Truk Tronton">Truk Tronton</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Plat Nomor</label>
                        <input type="text" required value={formData.plate_number} onChange={e => setFormData({...formData, plate_number: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border uppercase" placeholder="B 1234 CD" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Status Kesiapan</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white">
                        <option value="Aktif">Tersedia (Aktif)</option>
                        <option value="Dalam Perjalanan">Dalam Perjalanan (Mengantar)</option>
                        <option value="Istirahat">Istirahat / Off</option>
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
                    {isEditMode ? 'Simpan Perubahan' : 'Tambah Kurir'}
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
