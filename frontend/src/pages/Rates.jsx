import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Rates() {
  const [asal, setAsal] = useState('');
  const [tujuan, setTujuan] = useState('');
  const [berat, setBerat] = useState('');
  const [layanan, setLayanan] = useState('Standar');

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const [openFaq, setOpenFaq] = useState(null);

  const hitungBiaya = async () => {
    setIsLoading(true);
    setError('');

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await axios.post(`${API_URL}/calculate-rate`, {
        asal: asal,
        tujuan: tujuan,
        berat: Number(berat),
        layanan: layanan
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;

      if (data.success) {
        setResult(data.data);
      } else {
        setError("Terjadi kesalahan saat menghitung. Coba lagi.");
      }
    } catch (err) {
      console.error("API error:", err);
      setError("Gagal terhubung ke server backend Laravel. Periksa koneksi atau pastikan server berjalan.");
    } finally {
      setIsLoading(false);
    }
  };

  const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(number);
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <SEO title="Cek Tarif Ongkir" description="Hitung biaya pengiriman paket Anda dengan cepat dan mudah bersama Nabila Trans." />
      <div className="bg-gray-50 pb-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center pt-16 pb-10"
        >
          <span className="text-orange-500 font-bold text-sm tracking-widest uppercase mb-2 block">Kalkulator Biaya Pengiriman</span>
          <h1 className="text-4xl font-extrabold text-blue-950 mb-4">Hitung Biaya Pengiriman Anda</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Pastikan efisiensi biaya logistik dengan alat hitung kami yang mudah digunakan. Dapatkan estimasi harga akurat untuk semua tujuan.
          </p>
        </motion.div>

        {/* Calculator Form */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 flex flex-col lg:flex-row gap-10"
          >
            <div className="w-full lg:w-2/3">
              <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl flex gap-3 animate-in fade-in duration-300">
                <svg className="w-6 h-6 text-blue-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <p className="text-sm text-blue-800 leading-relaxed">
                  <strong>Tips Akurasi:</strong> Masukkan alamat selengkap mungkin (contoh: <span className="font-semibold text-blue-900">"Kecamatan Depok, Sleman, DIY"</span> atau <span className="font-semibold text-blue-900">"Jakarta Selatan"</span>) agar sistem dapat melacak rute peta dengan tepat dan memberikan harga paling akurat.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Asal Kota</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <input
                      type="text"
                      value={asal}
                      onChange={(e) => setAsal(e.target.value)}
                      placeholder="Contoh: Jakarta Pusat"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Tujuan Kota</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </span>
                    <input
                      type="text"
                      value={tujuan}
                      onChange={(e) => setTujuan(e.target.value)}
                      placeholder="Contoh: Surabaya"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Berat Barang (kg)</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                    </span>
                    <input
                      type="number"
                      value={berat}
                      onChange={(e) => setBerat(e.target.value)}
                      placeholder="Minimal 1 kg"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-blue-950 uppercase tracking-wider mb-2">Jenis Pengiriman</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                    </span>
                    <select
                      value={layanan}
                      onChange={(e) => setLayanan(e.target.value)}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded-lg pl-10 pr-10 py-3 focus:outline-none focus:border-blue-500 appearance-none"
                    >
                      <option value="Ekonomi">Ekonomi</option>
                      <option value="Standar">Standar (Rekomendasi)</option>
                      <option value="Express">Express</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 pointer-events-none">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={hitungBiaya}
                disabled={isLoading}
                className="w-full bg-blue-900 text-white font-bold py-4 rounded-lg hover:bg-blue-800 transition-colors flex items-center justify-center gap-2 mt-2 disabled:bg-blue-700"
              >
                {!isLoading && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>}
                <span>{isLoading ? 'Menghitung Rute Peta...' : 'Hitung Biaya'}</span>
                {isLoading && <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
              </button>

              {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm text-center">
                  {error}
                </div>
              )}

              {/* Result Box */}
              {result && (
                <div className="mt-6 p-6 bg-green-50 border border-green-200 rounded-xl text-center animate-in fade-in zoom-in duration-300">
                  <h4 className="text-sm font-bold text-green-800 uppercase tracking-wider mb-2">Estimasi Biaya Pengiriman</h4>
                  <div className="text-4xl font-extrabold text-green-600 mb-2">{formatRupiah(result.total)}</div>
                  <p className="text-sm text-green-700 font-medium">{result.rute}</p>
                  <div className="mt-4 inline-block bg-white px-4 py-2 rounded-full border border-green-100 shadow-sm">
                    <p className="text-xs text-green-800">Estimasi Tiba: <span className="font-bold text-green-600">{result.estimasi}</span></p>
                  </div>
                  <p className={`text-xs mt-3 ${result.is_map_success ? 'text-green-600' : 'text-yellow-600'}`}>
                    {result.teks_jarak}
                  </p>
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/3 bg-blue-50/50 rounded-xl p-6 border border-blue-100 flex flex-col gap-6">
              <div>
                <h3 className="font-bold text-blue-950 mb-4">Mengapa Memilih Solusi Kami</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-gray-600">Tarif transparan, tanpa biaya tersembunyi</span>
                  </li>
                  <li className="flex gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-gray-600">Keamanan maksimal, asuransi penuh</span>
                  </li>
                  <li className="flex gap-2">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    <span className="text-sm text-gray-600">Jaringan pengiriman luas di lebih dari 50 kota di Jawa dan Bali</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-amber-500 p-4 rounded-lg shadow-md border border-orange-600 text-white">
                <span className="text-white/90 text-xs font-bold uppercase tracking-wider block mb-1">Promo Khusus!</span>
                <p className="text-xs">Diskon 10% untuk pengiriman pertama Anda menggunakan kode <strong className="bg-white/20 px-1.5 py-0.5 rounded">NBL10</strong>.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-24 overflow-hidden">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{ visible: { transition: { staggerChildren: 0.2 } }, hidden: {} }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center"
          >

            {/* Ekonomi */}
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10 }} className="bg-green-900 rounded-2xl shadow-xl p-8 relative hover:shadow-2xl transition-all duration-300 border-t-4 border-green-400">
              <div className="w-12 h-12 bg-green-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Ekonomi</h3>
              <p className="text-green-200 text-sm mb-6">Layanan hemat yang andal untuk barang tanpa tenggat waktu ketat.</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">Rp 12.500</span>
                <span className="text-green-200 font-medium">/kg</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white font-medium">3-5 Hari Kerja</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white font-medium">Pelacakan standar</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  <span className="text-sm text-white font-medium">Asuransi dasar</span>
                </li>
              </ul>
            </motion.div>

            {/* Standar (Popular) */}
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, y: 50 }, visible: { opacity: 1, scale: 1, y: 0 } }} whileHover={{ scale: 1.05 }} className="bg-blue-950 rounded-2xl shadow-xl p-8 relative transform transition-transform duration-300 border-t-4 border-orange-500 hover:shadow-2xl z-10">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-orange-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Rekomendasi
              </div>
              <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Standar</h3>
              <p className="text-blue-200 text-sm mb-6">Keseimbangan ideal antara biaya dan kecepatan untuk pengiriman reguler.</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">Rp 25.000</span>
                <span className="text-blue-200 font-medium">/kg</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-white font-medium">1-2 Hari Kerja</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-white font-medium">Pelacakan real-time</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-white font-medium">Asuransi komprehensif</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  <span className="text-sm text-white font-medium">Penanganan khusus/packaging</span>
                </li>
              </ul>
            </motion.div>

            {/* Ekspres */}
            <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10 }} className="bg-red-900 rounded-2xl shadow-xl p-8 relative hover:shadow-2xl transition-all duration-300 border-t-4 border-red-500">
              <div className="w-12 h-12 bg-red-800 rounded-full flex items-center justify-center mb-6">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Express</h3>
              <p className="text-red-200 text-sm mb-6">Layanan prioritas untuk pengiriman mendesak, tiba esok hari.</p>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-extrabold text-white">Rp 45.000</span>
                <span className="text-red-200 font-medium">/kg</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white font-medium">Pengiriman Hari Berikutnya</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white font-medium">Prioritas utama</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white font-medium">Asuransi maksimum</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                  <span className="text-sm text-white font-medium">Penanganan ahli</span>
                </li>
              </ul>
            </motion.div>

          </motion.div>
        </div>

        {/* Estimasi Waktu Pengiriman */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <h2 className="text-2xl font-extrabold text-blue-950 mb-2">Estimasi Waktu Pengiriman</h2>
                  <p className="text-gray-500 text-sm">Estimasi waktu rata-rata pengiriman antar kota besar di Jawa dan Bali.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-sm font-bold text-blue-950 mb-2">
                    <span>Jakarta - Surabaya</span>
                    <span className="text-orange-500">1 Hari 12 Jam</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-blue-950 mb-2">
                    <span>Jakarta - Bandung</span>
                    <span className="text-orange-500">1 Hari 3 Jam</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: '20%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-blue-950 mb-2">
                    <span>Semarang - Yogyakarta</span>
                    <span className="text-orange-500">1 Hari 3 Jam</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: '15%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm font-bold text-blue-950 mb-2">
                    <span>Surabaya - Denpasar</span>
                    <span className="text-orange-500">1 Hari 10 Jam</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-900 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-200 relative">
                <img src="/images/map.png" alt="Route Map" className="w-full h-auto" />
                <div className="absolute bottom-6 left-6 text-white text-sm">
                  <p className="font-bold">Jaringan Distribusi Teroptimal</p>
                  <p className="opacity-80">Lebih dari 50 rute utama dengan ratusan jalur pendukung</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Keunggulan Tabel */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Lihat Keunggulannya</h2>
            <p className="text-gray-500">Bandingkan perbedaan jenis layanan kami dan sesuaikan dengan kebutuhan Anda.</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="bg-blue-950 text-white">
                  <th className="py-4 px-6 font-bold text-sm">Kategori Layanan</th>
                  <th className="py-4 px-6 font-bold text-sm">Rata-Rata Tarif/Kg</th>
                  <th className="py-4 px-6 font-bold text-sm">Kecepatan Rata-Rata</th>
                  <th className="py-4 px-6 font-bold text-sm">Kelebihan Utama</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-sm text-green-700">Ekonomi</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Rp 12.500/kg + Rp 200/km</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Waktu Berkendara + 2 Hari</td>
                  <td className="py-4 px-6 font-medium text-sm flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Sangat hemat, cocok untuk pengiriman tidak mendesak
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors group bg-blue-50/30">
                  <td className="py-4 px-6 font-bold text-sm text-blue-900 flex items-center gap-2">
                    Standar <span className="bg-orange-100 text-orange-600 text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Rekomendasi</span>
                  </td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Rp 25.000/kg + Rp 200/km</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Waktu Berkendara + 1 Hari</td>
                  <td className="py-4 px-6 font-medium text-sm flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Keseimbangan terbaik antara biaya dan kecepatan
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-sm text-red-700">Express</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Rp 45.000/kg + Rp 200/km</td>
                  <td className="py-4 px-6 text-gray-600 text-sm">Waktu Berkendara + 6 Jam</td>
                  <td className="py-4 px-6 font-medium text-sm flex items-center gap-2 text-gray-600">
                    <svg className="w-4 h-4 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                    Prioritas tinggi untuk pengiriman sangat mendesak
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-blue-950 text-center mb-10">Pertanyaan yang Sering Diajukan</h2>
          <div className="space-y-4">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all cursor-pointer" onClick={() => toggleFaq(0)}>
              <h4 className="font-bold text-blue-950 text-lg mb-2 flex justify-between items-center">
                Apakah pengiriman menanggung asuransi kerusakan atau kehilangan?
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h4>
              {openFaq === 0 && (
                <p className="text-gray-600 text-sm leading-relaxed mt-4 animate-in fade-in duration-300">
                  Semua pengiriman kami mendapatkan perlindungan asuransi dasar. Namun, jika barang yang dikirim sangat berharga atau rawan rusak (seperti elektronik atau pecah belah), sangat disarankan untuk membeli perlindungan asuransi penuh agar terlindungi 100% sesuai nilai barang.
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all cursor-pointer" onClick={() => toggleFaq(1)}>
              <h4 className="font-bold text-blue-950 text-lg flex justify-between items-center">
                Bagaimana cara menghitung berat volumetrik?
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h4>
              {openFaq === 1 && (
                <p className="text-gray-600 text-sm leading-relaxed mt-4 animate-in fade-in duration-300">
                  Berat volumetrik dihitung berdasarkan dimensi barang (panjang x lebar x tinggi) dibagi 6000. Jika hasil volumetrik lebih besar dari berat aktual, maka ongkos kirim akan dihitung berdasarkan berat volumetrik.
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all cursor-pointer" onClick={() => toggleFaq(2)}>
              <h4 className="font-bold text-blue-950 text-lg flex justify-between items-center">
                Apakah asuransi wajib untuk semua pengiriman?
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h4>
              {openFaq === 2 && (
                <p className="text-gray-600 text-sm leading-relaxed mt-4 animate-in fade-in duration-300">
                  Asuransi tidak wajib, tetapi kami sangat merekomendasikannya untuk barang pecah belah, elektronik, dan barang bernilai tinggi lainnya untuk perlindungan maksimal.
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all cursor-pointer" onClick={() => toggleFaq(3)}>
              <h4 className="font-bold text-blue-950 text-lg flex justify-between items-center">
                Apa batasan berat maksimum untuk pengiriman express?
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === 3 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h4>
              {openFaq === 3 && (
                <p className="text-gray-600 text-sm leading-relaxed mt-4 animate-in fade-in duration-300">
                  Untuk pengiriman express, batasan berat maksimum biasanya 50kg per koli. Jika lebih dari itu, disarankan menggunakan layanan Kargo Besar.
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 transition-all cursor-pointer" onClick={() => toggleFaq(4)}>
              <h4 className="font-bold text-blue-950 text-lg flex justify-between items-center">
                Bagaimana cara sistem menghitung biaya pengiriman?
                <svg className={`w-5 h-5 text-gray-400 transform transition-transform ${openFaq === 4 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
              </h4>
              {openFaq === 4 && (
                <div className="text-gray-600 text-sm leading-relaxed mt-4 animate-in fade-in duration-300">
                  Sistem kami menghitung biaya Anda secara otomatis dan transparan menggunakan rumus:
                  <br /><br />
                  <div className="bg-blue-50 text-blue-900 font-bold p-3 rounded-md text-center mb-2 border border-blue-100">
                    (Tarif Layanan × Berat kg) + (Jarak km × Rp 200)
                  </div>
                  Tarif layanan per kilogram berbeda berdasarkan jenisnya:
                  <ul className="list-disc pl-5 mt-2 space-y-1">
                    <li><strong>Ekonomi:</strong> Rp 12.500/kg</li>
                    <li><strong>Standar:</strong> Rp 25.000/kg</li>
                    <li><strong>Express:</strong> Rp 45.000/kg</li>
                  </ul>
                  Jarak (km) dihitung secara otomatis dan sangat akurat dari kota asal hingga ke kota tujuan Anda dengan memanfaatkan sistem pelacakan peta rute jalan raya sungguhan.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
