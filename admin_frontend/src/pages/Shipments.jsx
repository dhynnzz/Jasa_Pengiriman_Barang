import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import AdminLayout from '../components/AdminLayout';
import { Plus, Search, Edit2, MapPin, Trash2, Printer, Download } from 'lucide-react';

export default function Shipments() {
  const navigate = useNavigate();
  const [shipments, setShipments] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    service_type: 'Reguler',
    status: 'Picked Up',
    driver_name: '',
    estimated_time: '',
    current_location: ''
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [updateFormData, setUpdateFormData] = useState({
    status: 'In Transit',
    location: '',
    description: ''
  });

  const fetchShipments = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/shipments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShipments(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data resi');
    } finally {
      setLoading(false);
    }
  };

  const fetchDrivers = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      const response = await axios.get(`${API_URL}/admin/drivers`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Filter only active/available drivers if needed, or get all
      setDrivers(response.data);
    } catch (error) {
      console.error('Gagal mengambil data kurir', error);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchDrivers();
  }, []);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      const payload = { ...formData };
      payload.current_location = payload.origin;

      await axios.post(`${API_URL}/admin/shipments`, payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Resi berhasil ditambahkan!');
      setIsAddModalOpen(false);
      fetchShipments();
      
      // Reset form
      setFormData({
        origin: '',
        destination: '',
        service_type: 'Reguler',
        status: 'Picked Up',
        driver_name: '',
        estimated_time: '',
        current_location: ''
      });
    } catch (error) {
      toast.error('Gagal menambahkan resi');
    }
  };

  const openUpdateModal = (shipment) => {
    setSelectedShipment(shipment);
    setUpdateFormData({
      status: shipment.status,
      location: shipment.current_location || '',
      description: ''
    });
    setIsUpdateModalOpen(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      await axios.post(`${API_URL}/admin/shipments/${selectedShipment.id}/history`, updateFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      toast.success('Riwayat perjalanan berhasil diupdate!');
      setIsUpdateModalOpen(false);
      fetchShipments();
    } catch (error) {
      toast.error('Gagal mengupdate riwayat resi');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus resi ini?')) return;
    
    // Hapus dari tampilan seketika (Optimistic Update)
    setShipments(prev => prev.filter(shipment => shipment.id !== id));
    toast.success('Resi berhasil dihapus');
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const token = localStorage.getItem('adminToken');
      
      // Hapus dari database di belakang layar
      await axios.delete(`${API_URL}/admin/shipments/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      toast.error('Gagal menghapus resi di server');
      // Kembalikan data (jika perlu) bisa dilakukan di sini dengan fetch ulang
      fetchShipments();
    }
  };

  const handleExportCSV = () => {
    if (shipments.length === 0) {
      toast.error('Tidak ada data untuk diexport');
      return;
    }

    // Buat header CSV
    const headers = ['No Resi', 'Pengirim', 'Penerima', 'Asal', 'Tujuan', 'Layanan', 'Status', 'Tanggal Dibuat'];
    
    // Buat row data
    const csvRows = shipments.map(s => [
      s.tracking_number,
      s.sender_name || '-',
      s.receiver_name || '-',
      s.origin,
      s.destination,
      s.service_type,
      s.status,
      new Date(s.created_at).toLocaleDateString('id-ID')
    ]);
    
    // Gabungkan
    const csvContent = [
      headers.join(','),
      ...csvRows.map(row => row.map(str => `"${str}"`).join(','))
    ].join('\n');

    // Buat blob dan unduh
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Laporan_Resi_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredShipments = shipments.filter(s => 
    s.tracking_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.destination.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout title="Manajemen Resi (Shipments)">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header Actions */}
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="relative w-full sm:w-96">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Cari nomor resi, asal, tujuan..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
          </div>
          <div className="flex w-full sm:w-auto gap-2">
            <button
              onClick={handleExportCSV}
              className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
            >
              <Download className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
            >
              <Plus className="w-5 h-5 sm:mr-2" />
              <span className="hidden sm:inline">Tambah Resi</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900">No. Resi</th>
                <th className="px-6 py-4 font-medium text-gray-900">Rute</th>
                <th className="px-6 py-4 font-medium text-gray-900">Status</th>
                <th className="px-6 py-4 font-medium text-gray-900">Layanan</th>
                <th className="px-6 py-4 font-medium text-gray-900 text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Memuat data...</td>
                </tr>
              ) : filteredShipments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-8 text-center text-gray-500">Belum ada data resi ditemukan.</td>
                </tr>
              ) : (
                filteredShipments.map((shipment) => (
                  <tr key={shipment.id} className="bg-white border-b hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-blue-600">
                      {shipment.tracking_number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-gray-900">{shipment.origin}</span>
                        <span className="text-xs text-gray-400">ke {shipment.destination}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                        shipment.status === 'In Transit' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {shipment.service_type || '-'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => openUpdateModal(shipment)} title="Update Perjalanan" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
                          <MapPin className="w-4 h-4" />
                        </button>
                        <button onClick={() => navigate(`/print/${shipment.id}`)} title="Cetak Resi" className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                          <Printer className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(shipment.id)} title="Hapus" className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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

      {/* Modal Tambah Resi */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsAddModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleAddSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4" id="modal-title">
                    Tambah Resi Baru
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Asal</label>
                        <input type="text" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Kota Asal" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Tujuan</label>
                        <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Kota Tujuan" />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Layanan</label>
                        <select value={formData.service_type} onChange={e => setFormData({...formData, service_type: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white">
                          <option>Reguler</option>
                          <option>Express</option>
                          <option>Cargo</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Estimasi Tiba</label>
                        <input type="text" value={formData.estimated_time} onChange={e => setFormData({...formData, estimated_time: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: 2-3 Hari" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama Kurir (Opsional)</label>
                      <select value={formData.driver_name} onChange={e => setFormData({...formData, driver_name: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white">
                        <option value="">-- Pilih Kurir --</option>
                        {drivers.map(d => (
                          <option key={d.id} value={d.name}>{d.name} ({d.vehicle_type})</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl border-t border-gray-200">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Simpan Resi
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

      {/* Modal Update Status */}
      {isUpdateModalOpen && selectedShipment && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsUpdateModalOpen(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleUpdateSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="mb-4 pb-4 border-b border-gray-100">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Update Perjalanan
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">Resi: <strong className="text-blue-600">{selectedShipment.tracking_number}</strong></p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status Saat Ini</label>
                      <select required value={updateFormData.status} onChange={e => setUpdateFormData({...updateFormData, status: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border bg-white">
                        <option value="Picked Up">Picked Up</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Lokasi Paket</label>
                      <input type="text" required value={updateFormData.location} onChange={e => setUpdateFormData({...updateFormData, location: e.target.value})} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: Gudang Transit Jakarta" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Keterangan / Deskripsi</label>
                      <textarea required value={updateFormData.description} onChange={e => setUpdateFormData({...updateFormData, description: e.target.value})} rows="3" className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm py-2 px-3 border" placeholder="Misal: Paket sedang disortir untuk dikirim ke tujuan..."></textarea>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse rounded-b-xl border-t border-gray-200">
                  <button type="submit" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">
                    Simpan Riwayat
                  </button>
                  <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
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
