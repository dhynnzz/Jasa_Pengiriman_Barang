import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, ArrowRight, Upload, Map, MapPin } from 'lucide-react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import toast from 'react-hot-toast';

export default function Rates() {
  const [rates, setRates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('Semua');
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedRateId, setSelectedRateId] = useState(null);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    regular_price: '',
    express_price: '',
    cargo_price: '',
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
      regular_price: '',
      express_price: '',
      cargo_price: '',
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

  const handleImport = () => {
    toast('Fitur Upload CSV akan segera hadir!', { icon: '🚧' });
  };

  // Filter Logic (Mock logic for demonstration)
  const jawaCities = ['jakarta', 'bandung', 'surabaya', 'semarang', 'yogyakarta', 'banten'];
  const filteredRates = rates.filter(r => {
    const matchesSearch = r.origin.toLowerCase().includes(searchTerm.toLowerCase()) || r.destination.toLowerCase().includes(searchTerm.toLowerCase());
    let matchesCategory = true;
    
    const isOriginJawa = jawaCities.some(city => r.origin.toLowerCase().includes(city));
    const isDestJawa = jawaCities.some(city => r.destination.toLowerCase().includes(city));

    if (activeFilter === 'Jawa-Bali') {
      matchesCategory = isOriginJawa && isDestJawa;
    } else if (activeFilter === 'Luar Jawa') {
      matchesCategory = !isOriginJawa || !isDestJawa;
    }
    
    return matchesSearch && matchesCategory;
  });

  return (
    <AdminLayout title="Manajemen Tarif (Rates)">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Header Actions & Quick Filters */}
        <div className="p-6 border-b border-gray-100 space-y-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            
            {/* Filter Pills */}
            <div className="flex space-x-2">
              {['Semua', 'Jawa-Bali', 'Luar Jawa'].map((filter) => (
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

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <button
                onClick={openAddModal}
                className="w-full sm:w-auto flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm shadow-sm hover:shadow"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Tarif Baru
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari rute asal atau tujuan..."
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
                <th className="px-6 py-4 font-medium text-gray-900 w-1/3">Detail Rute Pengiriman</th>
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
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <div className="inline-flex items-center text-gray-500">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Memuat data tarif...
                    </div>
                  </td>
                </tr>
              ) : filteredRates.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Map className="w-12 h-12 text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-1">Rute Tidak Ditemukan</h3>
                      <p className="text-gray-500">Belum ada data tarif atau pencarian Anda tidak cocok dengan rute manapun.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredRates.map((rate) => (
                  <tr key={rate.id} className="bg-white border-b hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
                          <span className="font-semibold text-gray-800">{rate.origin}</span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-blue-400" />
                        <div className="flex items-center px-3 py-1.5 bg-blue-50 rounded-lg border border-blue-100 shadow-sm">
                          <MapPin className="w-3.5 h-3.5 text-blue-500 mr-1.5" />
                          <span className="font-semibold text-blue-800">{rate.destination}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      Rp {rate.regular_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      Rp {rate.express_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4 text-gray-700 font-medium">
                      Rp {rate.cargo_price.toLocaleString('id-ID')}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
                        {rate.estimated_time || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openEditModal(rate)} title="Edit Tarif" className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(rate.id)} title="Hapus Tarif" className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors">
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
            <div className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={() => setIsAddModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            
            <div className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-xl sm:w-full border border-gray-100">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-6 pt-6 pb-6">
                  <div className="flex items-center mb-6 border-b border-gray-100 pb-4">
                    <div className="bg-blue-100 p-2 rounded-lg mr-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900" id="modal-title">
                      {isEditMode ? 'Update Rute & Tarif' : 'Tambah Rute Baru'}
                    </h3>
                  </div>
                  
                  <div className="space-y-5">
                    {/* Routing */}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-end gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Kota Asal</label>
                        <input type="text" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border" placeholder="Misal: Jakarta" />
                      </div>
                      <div className="pb-2">
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Kota Tujuan</label>
                        <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border" placeholder="Misal: Bandung" />
                      </div>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 border-b pb-2">Penetapan Harga (/Kg)</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Layanan Reguler</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">Rp</span>
                            </div>
                            <input type="number" min="0" step="1000" required value={formData.regular_price} onChange={e => setFormData({...formData, regular_price: e.target.value})} className="block w-full pl-9 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Kosongkan jika tidak ada" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Layanan Express</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">Rp</span>
                            </div>
                            <input type="number" min="0" step="1000" required value={formData.express_price} onChange={e => setFormData({...formData, express_price: e.target.value})} className="block w-full pl-9 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Kosongkan jika tidak ada" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1">Layanan Cargo</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <span className="text-gray-500 sm:text-sm">Rp</span>
                            </div>
                            <input type="number" min="0" step="1000" required value={formData.cargo_price} onChange={e => setFormData({...formData, cargo_price: e.target.value})} className="block w-full pl-9 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Kosongkan jika tidak ada" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Estimates */}
                    <div>
                       <label className="block text-xs font-semibold text-gray-900 mb-1">Estimasi Waktu Tiba (SLA)</label>
                       <input type="text" value={formData.estimated_time} onChange={e => setFormData({...formData, estimated_time: e.target.value})} className="block w-full border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2.5 px-3 border" placeholder="Misal: 1-2 Hari Kerja" />
                    </div>
                  </div>
                </div>
                
                {/* Footer Buttons */}
                <div className="bg-gray-50 px-6 py-4 rounded-b-2xl border-t border-gray-200 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="w-full inline-flex justify-center items-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 sm:w-auto transition-colors">
                    Batal
                  </button>
                  <button type="submit" className="w-full inline-flex justify-center items-center rounded-lg border border-transparent shadow-sm px-6 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto transition-colors">
                    {isEditMode ? 'Simpan Perubahan' : 'Simpan Tarif Baru'}
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
