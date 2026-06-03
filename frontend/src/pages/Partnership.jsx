import React, { useState } from 'react';
import { Store, Handshake, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Partnership() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    place_status: 'Sudah (Milik Sendiri)'
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      await axios.post(`${API_URL}/partnerships`, formData);
      toast.success('Pengajuan berhasil dikirim! Tim kami akan menghubungi Anda.');
      setFormData({
        name: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        place_status: 'Sudah (Milik Sendiri)'
      });
    } catch (error) {
      toast.error('Gagal mengirim pengajuan. Silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20">
      {/* Hero Section */}
      <div className="bg-blue-950 text-white py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute right-0 top-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6">Mulai Bisnis Menguntungkan Bersama <span className="text-orange-500">Nabila Trans</span></h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10 leading-relaxed">
            Bergabunglah menjadi Agen Nabila Trans dan jadilah bagian dari jaringan logistik terpercaya dengan potensi penghasilan tak terbatas.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full text-lg shadow-lg shadow-orange-500/30 transition-transform transform hover:-translate-y-1 flex items-center mx-auto">
            Daftar Sekarang <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Mengapa Menjadi Agen Kami?</h2>
          <p className="text-gray-600">Keuntungan eksklusif yang hanya Anda dapatkan bersama Nabila Trans</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 text-center hover:border-blue-500 transition-colors">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <TrendingUp className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Komisi Tinggi</h3>
            <p className="text-gray-600">Dapatkan persentase pembagian hasil yang menguntungkan untuk setiap paket yang Anda terima.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 text-center hover:border-orange-500 transition-colors">
            <div className="w-16 h-16 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Handshake className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Dukungan Penuh</h3>
            <p className="text-gray-600">Kami menyediakan tim support khusus, pelatihan sistem, dan materi promosi gratis.</p>
          </div>
          
          <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-100 border border-gray-100 text-center hover:border-green-500 transition-colors">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Store className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sistem Mudah</h3>
            <p className="text-gray-600">Dilengkapi dengan aplikasi agen yang sangat mudah digunakan tanpa perlu keahlian khusus.</p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-blue-950 mb-4">Form Pengajuan Agen</h2>
              <p className="text-gray-600">Isi data diri Anda, tim kami akan segera menghubungi Anda.</p>
            </div>
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Sesuai KTP" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nomor WhatsApp</label>
                  <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="0812..." />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="email@anda.com" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Calon Lokasi Agen</label>
                <textarea required rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Jalan, RT/RW, Kelurahan..."></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Kota/Kabupaten</label>
                  <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent" placeholder="Misal: Malang" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Apakah sudah memiliki tempat/ruko?</label>
                  <select value={formData.place_status} onChange={e => setFormData({...formData, place_status: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white">
                    <option value="Sudah (Milik Sendiri)">Sudah (Milik Sendiri)</option>
                    <option value="Sudah (Sewa)">Sudah (Sewa)</option>
                    <option value="Belum">Belum</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-colors text-lg disabled:opacity-50">
                  {loading ? 'Mengirim...' : 'Kirim Pengajuan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
