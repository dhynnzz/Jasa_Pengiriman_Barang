import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, IndianRupee } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import toast from 'react-hot-toast';

export default function Rates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState(null);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    regular_price: 0,
    express_price: 0,
    cargo_price: 0,
    estimated_time: ''
  });

  const fetchRates = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/rates`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRates(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data tarif');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const openAddModal = () => {
    setIsEditMode(false);
    setFormData({
      origin: '',
      destination: '',
      regular_price: 0,
      express_price: 0,
      cargo_price: 0,
      estimated_time: ''
    });
    setIsAddModalOpen(true);
  };

  const openEditModal = (rate) => {
    setIsEditMode(true);
    setSelectedRateId(rate.id);
    setFormData({
      origin: rate.origin,
      destination: rate.destination,
      regular_price: rate.regular_price,
      express_price: rate.express_price,
      cargo_price: rate.cargo_price,
      estimated_time: rate.estimated_time || ''
    });
    setIsAddModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      if (isEditMode) {
        await axios.put(`${API_URL}/admin/rates/${selectedRateId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Tarif berhasil diupdate!');
      } else {
        await axios.post(`${API_URL}/admin/rates`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success('Tarif berhasil ditambahkan!');
      }
      
      setIsAddModalOpen(false);
      fetchRates();
    } catch (error) {
      toast.error('Gagal menyimpan tarif');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus tarif ini?')) return;
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      await axios.delete(`${API_URL}/admin/rates/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Tarif berhasil dihapus');
      fetchRates();
    } catch (error) {
      toast.error('Gagal menghapus tarif');
    }
  };

  const filteredRates = rates.filter(r => 
    r.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Manajemen Tarif (Rates)">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari kota asal atau tujuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <Plus className="w-5 h-5 mr-2" />
            Tambah Tarif Baru
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">Rute</th>
                <th className="px-6 py-4 font-medium text-gray-900">Reguler (/Kg)</th>
                <th className="px-6 py-4 font-medium text-gray-900">Express (/Kg)</th>
                <th className="px-6 py-4 font-medium text-gray-900">Cargo (/Kg)</th>
                <th className="px-6 py-4 font-medium text-gray-900">Estimasi</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : filteredRates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">Belum ada data tarif ditemukan.</td>
                </tr>
              ) : (
                filteredRates.map((rate) => (
                  <tr key={rate.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-gray-900">{rate.origin}</span>
                        <span className="text-xs text-gray-400">ke {rate.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Rp {rate.regular_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Rp {rate.express_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      Rp {rate.cargo_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {rate.estimated_time || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openEditModal(rate)} title="Edit Tarif" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(rate.id)} title="Hapus Tarif" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah/Edit Tarif */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsAddModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    {isEditMode ? 'Edit Tarif Pengiriman' : 'Tambah Tarif Baru'}
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Kota Asal</label>
                        <input type="text" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: Jakarta" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Kota Tujuan</label>
                        <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: Bandung" />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Harga Reguler</label>
                        <input type="number" min="0" required value={formData.regular_price} onChange={e => setFormData({...formData, regular_price: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Harga Express</label>
                        <input type="number" min="0" required value={formData.express_price} onChange={e => setFormData({...formData, express_price: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="0" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Harga Cargo</label>
                        <input type="number" min="0" required value={formData.cargo_price} onChange={e => setFormData({...formData, cargo_price: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="0" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Estimasi Waktu Tiba</label>
                      <input type="text" value={formData.estimated_time} onChange={e => setFormData({...formData, estimated_time: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: 1-2 Hari" />
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl border-t border-gray-200">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    {isEditMode ? 'Update Tarif' : 'Simpan Tarif'}
                  </button>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                    Batal
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
