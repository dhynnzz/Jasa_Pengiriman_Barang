import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Package, Search, Plus, LogOut, ChevronRight, CheckCircle, Clock, Truck } from 'lucide-react';

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const [customerUser, setCustomerUser] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newTrackingNumber, setNewTrackingNumber] = useState('');
  const [saving, setSaving] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

  useEffect(() => {
    const token = localStorage.getItem('customer_token');
    const userStr = localStorage.getItem('customer_user');

    if (!token || !userStr) {
      toast.error('Silakan login terlebih dahulu');
      navigate('/customer/login');
      return;
    }

    setCustomerUser(JSON.parse(userStr));
    fetchShipments(token);
  }, [navigate]);

  const fetchShipments = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/customer/shipments`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShipments(response.data.data);
    } catch (error) {
      toast.error('Gagal mengambil data resi');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('customer_token');
    localStorage.removeItem('customer_user');
    navigate('/customer/login');
  };

  const handleSaveResi = async (e) => {
    e.preventDefault();
    if (!newTrackingNumber) return;

    setSaving(true);
    const token = localStorage.getItem('customer_token');
    
    try {
      await axios.post(`${API_URL}/customer/shipments/save`, 
        { tracking_number: newTrackingNumber },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      toast.success('Resi berhasil ditambahkan ke akun Anda!');
      setNewTrackingNumber('');
      fetchShipments(token);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Gagal menyimpan resi');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Memuat dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-gray-800">Portal Pelanggan</h1>
              <p className="text-xs text-gray-500">Halo, {customerUser?.name}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition-colors p-2" title="Keluar">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Left Column: Input Resi */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
              <h2 className="font-bold text-gray-800 mb-2">Simpan Resi Baru</h2>
              <p className="text-sm text-gray-500 mb-4">Lacak resi Anda tanpa perlu mengetik ulang setiap saat.</p>
              
              <form onSubmit={handleSaveResi}>
                <div className="relative mb-4">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl focus:ring-blue-500 focus:border-blue-500 text-sm"
                    placeholder="Contoh: NBL-12345"
                    value={newTrackingNumber}
                    onChange={(e) => setNewTrackingNumber(e.target.value)}
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  disabled={saving}
                  className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  {saving ? 'Menyimpan...' : (
                    <>
                      <Plus className="w-4 h-4 mr-2" /> Simpan ke Akun
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: List Resi */}
          <div className="md:col-span-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
              <h2 className="font-bold text-gray-800 mb-6">Daftar Paket Anda</h2>
              
              {shipments.length === 0 ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium">Belum ada paket tersimpan</p>
                  <p className="text-sm text-gray-400 mt-1">Masukkan nomor resi di sebelah kiri untuk mulai melacak.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {shipments.map((shipment) => (
                    <motion.div 
                      key={shipment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-xl ${shipment.status === 'Delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                          {shipment.status === 'Delivered' ? <CheckCircle className="w-6 h-6" /> : <Truck className="w-6 h-6" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-bold text-gray-800">{shipment.tracking_number}</h3>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                              shipment.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                            }`}>
                              {shipment.status}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{shipment.origin} &rarr; {shipment.destination}</p>
                          <p className="text-xs text-gray-500 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> Diupdate: {new Date(shipment.updated_at).toLocaleDateString('id-ID')}
                          </p>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => navigate('/tracking', { state: { trackingNumber: shipment.tracking_number } })}
                        className="flex items-center justify-center px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors whitespace-nowrap"
                      >
                        Lacak Detail <ChevronRight className="w-4 h-4 ml-1" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
