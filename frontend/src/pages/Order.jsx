import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Package, MapPin, Scale, Shield, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Order() {
  const [formData, setFormData] = useState({
    sender_name: '',
    receiver_name: '',
    origin: '',
    destination: '',
    origin_address: '',
    destination_address: '',
    weight: '',
    dimensions: '',
    service_type: 'Reguler',
    insurance: 'Tidak Ada'
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await axios.post(`${API_URL}/public/shipments`, formData);
      
      setSuccessData(response.data);
      toast.success('Pesanan berhasil dibuat!');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      toast.error('Gagal membuat pesanan. Periksa kembali data Anda.');
    } finally {
      setLoading(false);
    }
  };

  if (successData) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 pb-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10 border border-gray-100"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Pesanan Berhasil Dibuat!</h2>
            <p className="text-gray-600 mb-8 max-w-lg mx-auto">
              Terima kasih telah mempercayakan pengiriman Anda kepada Nabila Trans. Kurir kami akan segera menjemput paket Anda di lokasi.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8 inline-block w-full max-w-md">
              <p className="text-sm text-gray-500 font-medium mb-2 uppercase tracking-wider">Nomor Resi Anda</p>
              <p className="text-4xl font-black text-blue-600 tracking-wider font-mono">{successData.tracking_number}</p>
              <div className="mt-4 flex gap-2 justify-center">
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(successData.tracking_number);
                    toast.success('Nomor resi disalin!');
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Salin Resi
                </button>
                <Link 
                  to="/tracking"
                  className="px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Lacak Sekarang
                </Link>
              </div>
            </div>

            <div>
              <button 
                onClick={() => {
                  setSuccessData(null);
                  setFormData({
                    sender_name: '', receiver_name: '', origin: '', destination: '', 
                    origin_address: '', destination_address: '', weight: '', 
                    dimensions: '', service_type: 'Reguler', insurance: 'Tidak Ada'
                  });
                }}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Kirim paket lainnya
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Kirim Barang Sekarang</h1>
          <p className="text-lg text-gray-600">Isi formulir di bawah ini dan kurir kami akan menjemput paket Anda.</p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="p-8">
            
            {/* Informasi Pengirim & Penerima */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <Package className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-semibold text-gray-900">Informasi Kontak</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Pengirim</label>
                  <input type="text" required value={formData.sender_name} onChange={e => setFormData({...formData, sender_name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Contoh: Budi Santoso" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Penerima</label>
                  <input type="text" required value={formData.receiver_name} onChange={e => setFormData({...formData, receiver_name: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Contoh: Siti Aminah" />
                </div>
              </div>
            </div>

            {/* Informasi Lokasi */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <MapPin className="w-5 h-5 text-orange-500" />
                <h3 className="text-xl font-semibold text-gray-900">Alamat Penjemputan & Tujuan</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kota Asal</label>
                  <input type="text" required value={formData.origin} onChange={e => setFormData({...formData, origin: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Contoh: Jakarta" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kota Tujuan</label>
                  <input type="text" required value={formData.destination} onChange={e => setFormData({...formData, destination: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Contoh: Bandung" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap Asal</label>
                  <textarea required value={formData.origin_address} onChange={e => setFormData({...formData, origin_address: e.target.value})} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Alamat detail rumah/kantor untuk penjemputan"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Lengkap Tujuan</label>
                  <textarea required value={formData.destination_address} onChange={e => setFormData({...formData, destination_address: e.target.value})} rows="3" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none" placeholder="Alamat detail pengiriman paket"></textarea>
                </div>
              </div>
            </div>

            {/* Detail Paket */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <Scale className="w-5 h-5 text-indigo-500" />
                <h3 className="text-xl font-semibold text-gray-900">Detail Paket</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Berat Barang (Kg)</label>
                  <input type="number" step="0.1" required value={formData.weight} onChange={e => setFormData({...formData, weight: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="Contoh: 2.5" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dimensi (cm)</label>
                  <input type="text" required value={formData.dimensions} onChange={e => setFormData({...formData, dimensions: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all" placeholder="P x L x T (Contoh: 20x10x10)" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Jenis Layanan</label>
                  <div className="relative">
                    <select required value={formData.service_type} onChange={e => setFormData({...formData, service_type: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer">
                      <option value="Reguler">Reguler</option>
                      <option value="Express">Express</option>
                      <option value="Cargo">Cargo</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Asuransi */}
            <div className="mb-10">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
                <Shield className="w-5 h-5 text-green-500" />
                <h3 className="text-xl font-semibold text-gray-900">Asuransi</h3>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lindungi kiriman Anda?</label>
                <div className="flex flex-col sm:flex-row gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.insurance === 'Ya' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 bg-white hover:border-blue-300'}`}>
                    <input type="radio" name="insurance" value="Ya" checked={formData.insurance === 'Ya'} onChange={e => setFormData({...formData, insurance: e.target.value})} className="sr-only" />
                    <Shield className={`w-5 h-5 ${formData.insurance === 'Ya' ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className={`font-semibold ${formData.insurance === 'Ya' ? 'text-blue-900' : 'text-gray-600'}`}>Gunakan Asuransi</span>
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.insurance === 'Tidak Ada' ? 'border-gray-800 bg-gray-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                    <input type="radio" name="insurance" value="Tidak Ada" checked={formData.insurance === 'Tidak Ada'} onChange={e => setFormData({...formData, insurance: e.target.value})} className="sr-only" />
                    <span className={`font-semibold ${formData.insurance === 'Tidak Ada' ? 'text-gray-900' : 'text-gray-500'}`}>Tidak Perlu</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t border-gray-100">
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 px-6 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all shadow-lg shadow-blue-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Memproses...
                  </>
                ) : 'Pesan Penjemputan (Order)'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
