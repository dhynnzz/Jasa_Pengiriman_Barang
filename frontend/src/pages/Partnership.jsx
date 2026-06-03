import React, { useState } from 'react';
import { Store, Handshake, TrendingUp, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Send, ShieldCheck, Clock } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

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
    <div className="pt-20 pb-20 overflow-hidden bg-gray-50">
      
      {/* 1. Modern Hero Section */}
      <div className="relative bg-blue-950 overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 z-0 opacity-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C20,0 50,50 100,0 L100,100 Z" fill="currentColor" className="text-blue-900" />
            <path d="M0,100 C30,40 70,80 100,0 L100,100 Z" fill="currentColor" className="text-blue-800" />
          </svg>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/30 rounded-full blur-[100px] z-0"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24 lg:py-32">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2 text-center lg:text-left text-white"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-800/50 border border-blue-400/30 text-blue-200 text-sm font-semibold mb-6 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2 animate-pulse"></span>
                Peluang Bisnis Logistik 2026
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
                Mulai Bisnis Logistik Bersama <span className="text-orange-500 relative inline-block">
                  Nabila Trans
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-orange-500 opacity-60" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed">
                Ubah garasi atau toko Anda menjadi mesin penghasil uang. Bergabunglah menjadi titik agen resmi dan raih komisi menjanjikan di setiap pengiriman paket.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a href="#form-daftar" className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-orange-500/30 transition-transform transform hover:-translate-y-1 flex items-center justify-center">
                  Daftar Menjadi Agen <ArrowRight className="ml-2 w-5 h-5" />
                </a>
                <a href="#cara-kerja" className="bg-white/10 hover:bg-white/20 text-white font-bold py-4 px-8 rounded-xl border border-white/20 backdrop-blur-sm transition-colors flex items-center justify-center">
                  Pelajari Cara Kerjanya
                </a>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative"
            >
              <div className="bg-white p-2 rounded-2xl shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 relative z-10">
                <img src="/images/truck-nabila.jpeg" alt="Kurir Nabila Trans" className="w-full h-auto rounded-xl object-cover" style={{maxHeight: '400px'}} />
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-5 rounded-2xl shadow-xl flex items-center gap-4 z-20 animate-bounce" style={{animationDuration: '3s'}}>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">Potensi Pendapatan</p>
                  <p className="text-xl font-extrabold text-gray-900">Rp 5-15 Juta<span className="text-sm font-normal text-gray-500"> /bulan</span></p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* 2. Cara Bergabung (Steps) */}
      <div id="cara-kerja" className="py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2 block">Proses Cepat & Mudah</span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-4">4 Langkah Mulai Berbisnis</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">Tidak ada birokrasi berbelit. Cukup ikuti tahapan sederhana ini untuk secara resmi menjadi mitra agen Nabila Trans.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-1 bg-gray-100 -z-0">
              <div className="h-full bg-orange-200"></div>
            </div>

            {[
              { icon: <Store />, title: '1. Isi Formulir', desc: 'Lengkapi data diri dan lokasi rencana agen Anda di form bawah.' },
              { icon: <MapPin />, title: '2. Verifikasi Lokasi', desc: 'Tim kami akan melakukan survei kelayakan lokasi Anda secara singkat.' },
              { icon: <Handshake />, title: '3. Tanda Tangan', desc: 'Penandatanganan kontrak dan setup aplikasi agen.' },
              { icon: <TrendingUp />, title: '4. Mulai Hasilkan', desc: 'Buka gerai, terima paket, dan nikmati komisinya!' }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="relative z-10 flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 bg-white rounded-full shadow-xl border-4 border-gray-50 flex items-center justify-center mb-6 text-blue-900 group-hover:scale-110 group-hover:border-orange-100 group-hover:text-orange-500 transition-all duration-300">
                  {React.cloneElement(step.icon, { className: 'w-10 h-10' })}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Keunggulan (Benefits) */}
      <div className="py-24 bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/3">
              <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2 block">Benefit Mitra</span>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 mb-6 leading-tight">Mengapa Anda Harus Bergabung?</h2>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                Kami memberikan dukungan maksimal untuk memastikan setiap mitra kami dapat berkembang dengan cepat dan menguntungkan.
              </p>
              <a href="#form-daftar" className="inline-flex items-center text-orange-500 font-bold hover:text-orange-600 transition-colors">
                Ambil peluang ini sekarang <ArrowRight className="ml-2 w-4 h-4" />
              </a>
            </div>

            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: <TrendingUp />, color: 'bg-green-100 text-green-600', title: 'Komisi Tinggi', desc: 'Dapatkan persentase pembagian hasil kompetitif hingga 20% per paket.' },
                { icon: <ShieldCheck />, color: 'bg-blue-100 text-blue-600', title: 'Tanpa Risiko', desc: 'Sistem bagi hasil yang transparan tanpa biaya tersembunyi.' },
                { icon: <Store />, color: 'bg-purple-100 text-purple-600', title: 'Sistem Terintegrasi', desc: 'Aplikasi agen yang mudah digunakan untuk cetak resi dan laporan harian.' },
                { icon: <Handshake />, color: 'bg-orange-100 text-orange-500', title: 'Dukungan Marketing', desc: 'Spanduk, seragam, dan materi promosi disediakan secara gratis oleh pusat.' }
              ].map((b, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm transition-all"
                >
                  <div className={`w-14 h-14 ${b.color} rounded-xl flex items-center justify-center mb-6`}>
                    {React.cloneElement(b.icon, { className: 'w-7 h-7' })}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Form Pendaftaran & Kontak Support */}
      <div id="form-daftar" className="py-24 bg-blue-950 text-white relative">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/50 skew-x-12 translate-x-32"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row text-gray-900">
            
            {/* Left: Contact Info */}
            <div className="w-full lg:w-2/5 bg-blue-50 p-10 lg:p-12 border-r border-blue-100 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-extrabold text-blue-950 mb-4">Butuh Bantuan Pendaftaran?</h3>
                <p className="text-gray-600 mb-10 leading-relaxed">
                  Jika Anda memiliki pertanyaan sebelum mendaftar, tim kemitraan kami siap membantu Anda kapan saja.
                </p>
                
                <ul className="space-y-8">
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Telepon / WhatsApp</p>
                      <p className="text-lg font-bold text-blue-950">+62 821-4292-3433</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Email Kemitraan</p>
                      <p className="text-lg font-bold text-blue-950">partnership@nabilatrans.com</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 shadow-sm flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Jam Operasional Tim</p>
                      <p className="text-lg font-bold text-blue-950">Senin - Jumat, 08:00 - 16:00</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right: The Form */}
            <div className="w-full lg:w-3/5 p-10 lg:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Form Pengajuan Agen</h2>
                <p className="text-gray-500">Lengkapi data berikut untuk mendaftar. Semua kolom wajib diisi.</p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nama Lengkap Pemilik</label>
                    <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors" placeholder="Sesuai KTP" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Nomor WhatsApp Aktif</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors" placeholder="0812xxxx" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Email Aktif</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors" placeholder="email@anda.com" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Alamat Lengkap Calon Lokasi Agen</label>
                  <textarea required rows="3" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors" placeholder="Nama Jalan, RT/RW, Kelurahan, Kecamatan..."></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Kota / Kabupaten Domisili</label>
                    <input required type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors" placeholder="Misal: Kota Malang" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Status Kepemilikan Tempat</label>
                    <select required value={formData.place_status} onChange={e => setFormData({...formData, place_status: e.target.value})} className="w-full bg-gray-50 px-4 py-3.5 rounded-xl border border-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-colors appearance-none">
                      <option value="Sudah (Milik Sendiri)">Milik Sendiri (Ruko/Rumah)</option>
                      <option value="Sudah (Sewa)">Sewa Kontrak (Ruko/Kios)</option>
                      <option value="Belum">Belum Memiliki Tempat</option>
                    </select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100 mt-6">
                  <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-transform transform hover:-translate-y-1 flex items-center justify-center disabled:opacity-50 disabled:hover:translate-y-0 text-lg">
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        Memproses Data...
                      </span>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" /> Kirim Pengajuan Kemitraan
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-4">
                    Data Anda aman dan tidak akan dibagikan kepada pihak ketiga. Dengan menekan tombol, Anda setuju untuk dihubungi oleh tim kami.
                  </p>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
      
    </div>
  );
}
