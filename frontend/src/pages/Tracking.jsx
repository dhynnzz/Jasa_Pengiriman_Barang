import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import LiveTrackingMap from '../components/LiveTrackingMap';
import axios from 'axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function Tracking() {
  const [resi, setResi] = useState('');
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [shipment, setShipment] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setSearchAttempted(true);
    setIsLoading(true);
    setError('');
    setShipment(null);
    
    // Simulate slight delay for UX
    toast.loading('Mencari resi...', { id: 'search-toast' });

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
      const response = await axios.get(`${API_URL}/tracking/${resi}`);
      if (response.data.success) {
        setShipment(response.data.data);
        toast.success('Resi ditemukan!', { id: 'search-toast' });
      } else {
        const errMsg = response.data.message || 'Resi tidak ditemukan.';
        setError(errMsg);
        toast.error(errMsg, { id: 'search-toast' });
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('Resi tidak ditemukan. Pastikan Anda memasukkan nomor dengan benar.');
        toast.error('Resi tidak ditemukan!', { id: 'search-toast' });
      } else {
        console.error("API error:", err);
        setError("Gagal terhubung ke server backend. Periksa koneksi Anda.");
        toast.error('Gagal terhubung ke server.', { id: 'search-toast' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Lacak Paket" description="Pantau status dan pergerakan paket Anda secara live melalui fitur tracking Nabila Trans." />
      <div className="bg-gray-50 min-h-screen pb-20">
        {/* Header & Search */}
        <div className="bg-blue-950 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-3xl font-bold text-white mb-8">Lacak Pengiriman Anda</h1>
            <div className="bg-white rounded-lg p-2 flex items-center shadow-lg">
              <form onSubmit={handleSearch} className="w-full flex">
                <div className="flex-grow flex items-center px-4">
                  <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  <input
                    type="text"
                    value={resi}
                    onChange={(e) => setResi(e.target.value)}
                    placeholder="NBL-8829441029"
                    className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 font-bold"
                    required
                  />
                </div>
                <button type="submit" disabled={isLoading} className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50">
                  {isLoading ? (
                    <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  )}
                  {isLoading ? 'Mencari...' : 'Cari'}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {error ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto px-4 mt-8 text-center text-red-600 bg-red-50 p-4 rounded-lg border border-red-200">
            {error}
          </motion.div>
        ) : isLoading ? (
          <div className="max-w-3xl mx-auto px-4 mt-8 py-12 text-center text-gray-500">
            <svg className="animate-spin w-10 h-10 text-orange-500 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            <p className="font-semibold text-blue-950">Mencari data pengiriman...</p>
          </div>
        ) : shipment ? (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10"
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="lg:col-span-2 space-y-6">
                {/* Status Header */}
                <div className="bg-blue-100 rounded-xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center border border-blue-200">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                      <svg className="w-7 h-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-extrabold text-blue-950">{shipment.status}</h2>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Sesuai Jadwal</span>
                      </div>
                      <p className="text-gray-500 text-sm">Perkiraan Kedatangan: {shipment.estimated_time}</p>
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Lokasi Saat Ini</p>
                    <p className="text-lg font-bold text-blue-950">{shipment.current_location}</p>
                  </div>
                </div>

                {/* Driver Card */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row justify-between items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <img src="https://i.pravatar.cc/150?img=33" alt="Driver" className="w-full h-full object-cover" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-0.5">Pengemudi yang ditugaskan</p>
                      <h4 className="font-bold text-blue-950">{shipment.driver_name}</h4>
                      <div className="flex items-center gap-1 text-orange-400 text-xs mt-1">
                        &#9733;&#9733;&#9733;&#9733;&#9733; <span className="text-gray-400 ml-1">4.8 (214)</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    <a href="tel:+6282340074645" className="flex-1 md:flex-none bg-blue-950 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-blue-900 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                      Panggilan
                    </a>
                    <a href="https://wa.me/6282340074645" target="_blank" rel="noreferrer" className="flex-1 md:flex-none bg-green-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-600 flex items-center justify-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                      Mengobrol
                    </a>
                  </div>
                </div>

                {/* Progress */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <div className="flex justify-between items-end mb-6">
                    <div>
                      <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Kemajuan</p>
                      <h3 className="text-3xl font-extrabold text-blue-950">{shipment.progress_percentage}% <span className="text-lg text-gray-500 font-medium">Selesai</span></h3>
                    </div>
                    <div className="bg-blue-50 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 border border-blue-100">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      2 Hari 4 Jam tersisa
                    </div>
                  </div>

                  <div className="relative mb-10 mt-10">
                    {/* Progress Bar line */}
                    <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-gray-200 rounded-full -translate-y-1/2"></div>
                    <div className="absolute top-1/2 left-0 h-1.5 bg-orange-500 rounded-full -translate-y-1/2" style={{ width: `${shipment.progress_percentage}%` }}></div>

                    {/* Steps */}
                    <div className="relative flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow"></div>
                        <p className="text-[10px] font-bold text-blue-950 uppercase mt-3">Pesan</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">20 Oktober, 09:00 AM</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow"></div>
                        <p className="text-[10px] font-bold text-blue-950 uppercase mt-3">Penjemputan</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">21 Oktober, 02:30 PM</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-orange-500 rounded-full border-4 border-white shadow flex items-center justify-center -translate-y-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        </div>
                        <p className="text-[10px] font-bold text-orange-500 uppercase mt-2">Dalam Perjalanan</p>
                        <p className="text-[9px] text-gray-400 mt-0.5">Sedang Berlangsung</p>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-4 h-4 bg-gray-300 rounded-full border-4 border-white shadow"></div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase mt-3">Disampaikan</p>
                        <p className="text-[9px] text-gray-300 mt-0.5">Tertunda</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Mockup */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-blue-950 flex items-center gap-2 shadow-sm border border-gray-100">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    PEMBARUAN LANGSUNG TERSEDIA
                  </div>
                  <div className="w-full h-64 relative z-0 bg-slate-100">
                    <LiveTrackingMap />
                  </div>
                  <div className="absolute bottom-4 left-4 z-10 bg-blue-950 text-white px-4 py-3 rounded-lg shadow-lg max-w-xs pointer-events-none">
                    <p className="text-[10px] font-bold text-blue-300 uppercase mb-1">Tujuan Berikutnya</p>
                    <p className="text-sm font-bold">Gudang Utama Surabaya</p>
                    <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      240 KM Inbound
                    </p>
                  </div>
                </div>

                {/* History Timeline */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <h3 className="text-xl font-bold text-blue-950 mb-8">Riwayat Pengiriman</h3>
                  <div className="relative pl-4 border-l-2 border-gray-100 space-y-10">

                    {shipment.histories.map((history, idx) => (
                      <div className="relative" key={idx}>
                        <div className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full ${history.active ? 'bg-orange-500 ring-4 ring-orange-50' : 'bg-blue-950'}`}></div>
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-blue-950 text-base">{history.status_title}</h4>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap ml-4">{history.occurred_at}</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed mb-2">{history.description}</p>
                        {history.location && (
                          <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            {history.location}
                          </p>
                        )}
                      </div>
                    ))}

                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Detail Pengiriman */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">Detail Pengiriman</h4>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Berat Total</p>
                        <p className="font-bold text-blue-950">{shipment.weight}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Dimensi</p>
                        <p className="font-bold text-blue-950">{shipment.dimensions}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Jenis Pengiriman</p>
                        <p className="font-bold text-blue-950">{shipment.service_type}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 flex-shrink-0">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Asuransi</p>
                        <p className="font-bold text-green-600">{shipment.insurance}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Informasi Rute */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <h4 className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-6">Informasi Rute</h4>
                  <div className="space-y-6 relative">
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-100"></div>

                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-10 h-10 bg-blue-950 rounded-full flex items-center justify-center text-white flex-shrink-0 border-4 border-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Titik Penjemputan</p>
                        <p className="font-bold text-blue-950 mb-1">{shipment.origin}</p>
                        <p className="text-xs text-gray-500">{shipment.origin_address}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 relative z-10">
                      <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white flex-shrink-0 border-4 border-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                      </div>
                      <div>
                        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider mb-0.5">Alamat Penerima</p>
                        <p className="font-bold text-blue-950 mb-1">{shipment.destination}</p>
                        <p className="text-xs text-gray-500 leading-relaxed">{shipment.destination_address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Support Card */}
                <div className="bg-blue-950 rounded-xl p-8 text-center shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-900 rounded-full opacity-50"></div>
                  <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white mx-auto mb-4 relative z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2 relative z-10">Butuh Bantuan?</h4>
                  <p className="text-blue-200 text-sm mb-6 relative z-10 leading-relaxed">
                    Tim dukungan kami tersedia 24/7 untuk setiap pertanyaan mengenai paket Anda.
                  </p>
                  <Link to="/help" className="block w-full text-center bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600 transition-colors relative z-10">
                    Pusat Dukungan
                  </Link>
                </div>

              </div>
            </div>
          </motion.div>
        ) : searchAttempted ? (
          <div className="max-w-3xl mx-auto px-4 mt-8 text-center text-gray-600">
            Resi <span className="font-bold text-blue-950">{resi}</span> tidak ditemukan. Pastikan Anda memasukkan nomor dengan benar. Untuk demo, coba "NBL-8829441029".
          </div>
        ) : (
          <div className="max-w-3xl mx-auto px-4 mt-8 text-center text-gray-500 text-sm">
            Masukkan nomor resi Anda untuk melihat detail pelacakan. <br />(Demo tracking: <strong>NBL-8829441029</strong>)
          </div>
        )}
      </div>
    </Layout>
  );
}
