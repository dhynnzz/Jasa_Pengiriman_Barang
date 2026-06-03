import { useState } from 'react';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function Partnership() {
  const [formData, setFormData] = useState({
    nama: '',
    perusahaan: '',
    telepon: '',
    email: '',
    industri: 'E-Commerce / Toko Online',
    volume: '< 100 paket / bulan',
    pesan: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setIsSuccess(false);

    // Format pesan WhatsApp yang akan dikirim Fonnte ke Admin
    const message = `Halo Admin NabilaTrans, ada pengajuan kemitraan baru!
    
*Data Pengaju:*
- Nama: ${formData.nama}
- Perusahaan: ${formData.perusahaan}
- No. WhatsApp: ${formData.telepon}
${formData.email ? `- Email: ${formData.email}\n` : ''}- Industri: ${formData.industri}
- Estimasi Volume: ${formData.volume}

*Pesan Tambahan:*
${formData.pesan || '-'}

Segera hubungi kembali calon mitra ini.`;

    // Nomor Admin yang akan menerima pesan dari bot Fonnte
    const adminNumber = '6282340074645';

    try {
      const data = new FormData();
      data.append('target', adminNumber);
      data.append('message', message);

      // MASUKKAN TOKEN FONNTE ANDA DI SINI
      const FONNTE_TOKEN = '9Q9XEvfmiwixkjvD9Je4';

      const response = await axios.post('https://api.fonnte.com/send', data, {
        headers: {
          'Authorization': FONNTE_TOKEN
        }
      });

      if (response.data.status) {
        setIsSuccess(true);
        // Reset form
        setFormData({
          nama: '', perusahaan: '', telepon: '', email: '', industri: 'E-Commerce / Toko Online', volume: '< 100 paket / bulan', pesan: ''
        });
      } else {
        setErrorMsg('Gagal mengirim pesan: ' + (response.data.reason || 'Unknown Error'));
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Terjadi kesalahan jaringan saat menghubungi Fonnte API.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <SEO title="Kemitraan" description="Bergabunglah menjadi mitra bisnis logistik bersama Nabila Trans. Ajukan penawaran dengan mudah." />
      <div className="bg-slate-50 min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold text-blue-950 tracking-tight mb-6">
              Solusi Logistik Bisnis <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Tanpa Batas</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              Tingkatkan efisiensi bisnis Anda dengan layanan pengiriman khusus B2B. Dapatkan tarif eksklusif, prioritas layanan, dan penjemputan gratis setiap hari.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

            {/* Benefit Section */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{ visible: { transition: { staggerChildren: 0.15 } }, hidden: {} }}
              className="space-y-8"
            >
              <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Tarif Eksklusif Perusahaan</h3>
                    <p className="text-gray-600 text-sm">Diskon khusus untuk volume tinggi yang akan menekan biaya operasional logistik Anda secara signifikan.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Dedicated Account Manager</h3>
                    <p className="text-gray-600 text-sm">Satu titik kontak untuk semua kebutuhan pengiriman, komplain, dan solusi harian Anda. Respon VIP 24/7.</p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, x: -50 }, visible: { opacity: 1, x: 0 } }} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 relative overflow-hidden group hover:shadow-md transition-shadow">
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-green-50 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
                <div className="relative z-10 flex gap-4">
                  <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-950 mb-2">Penjemputan Rutin (Free Pickup)</h3>
                    <p className="text-gray-600 text-sm">Tim kami menjemput paket langsung dari gudang/toko Anda setiap hari sesuai jadwal tanpa syarat batas minimal yang merepotkan.</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Smart Form Section */}
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-gray-100 relative"
            >
              <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <svg className="w-32 h-32 text-blue-900" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" /></svg>
              </div>

              <div className="relative z-10">
                <h2 className="text-2xl font-bold text-blue-950 mb-2">Ajukan Penawaran</h2>
                <p className="text-sm text-gray-500 mb-8">Isi detail di bawah ini, dan sistem kami akan menyiapkan draf pesan WhatsApp untuk Tim Sales kami secara otomatis.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Nama Lengkap</label>
                      <input
                        type="text"
                        name="nama"
                        required
                        value={formData.nama}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Misal: Budi Santoso"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Nama Perusahaan</label>
                      <input
                        type="text"
                        name="perusahaan"
                        required
                        value={formData.perusahaan}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="PT Maju Mundur"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Nomor WhatsApp Anda</label>
                      <input
                        type="tel"
                        name="telepon"
                        required
                        value={formData.telepon}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Contoh: 081234567890"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email <span className="text-gray-400 font-normal">(Opsional)</span></label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 focus:bg-white"
                        placeholder="Contoh: budi@ptmaju.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Jenis Industri</label>
                    <select
                      name="industri"
                      value={formData.industri}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="E-Commerce / Toko Online">E-Commerce / Toko Online</option>
                      <option value="Manufaktur / Pabrik">Manufaktur / Pabrik</option>
                      <option value="Distributor / Grosir">Distributor / Grosir</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Estimasi Volume Pengiriman</label>
                    <select
                      name="volume"
                      value={formData.volume}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="< 100 paket / bulan">&lt; 100 paket / bulan</option>
                      <option value="100 - 500 paket / bulan">100 - 500 paket / bulan</option>
                      <option value="500 - 1000 paket / bulan">500 - 1000 paket / bulan</option>
                      <option value="> 1000 paket / bulan">&gt; 1000 paket / bulan</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Pesan Tambahan (Opsional)</label>
                    <textarea
                      name="pesan"
                      value={formData.pesan}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all bg-gray-50 focus:bg-white resize-none"
                      placeholder="Jelaskan kebutuhan spesifik rute atau barang Anda..."
                    ></textarea>
                  </div>

                  {isSuccess && (
                    <div className="p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm font-medium text-center">
                      ✅ Pengajuan berhasil dikirim! Tim Sales kami akan segera menghubungi Anda.
                    </div>
                  )}

                  {errorMsg && (
                    <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm font-medium text-center">
                      ❌ {errorMsg}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-900 text-white font-bold py-4 rounded-xl hover:bg-blue-800 transition-colors shadow-lg flex items-center justify-center gap-2 mt-4 disabled:bg-blue-400"
                  >
                    {isLoading ? (
                      <svg className="animate-spin w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    ) : (
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    )}
                    {isLoading ? 'Mengirim Pengajuan...' : 'Kirim Pengajuan Sekarang'}
                  </button>
                  <p className="text-center text-xs text-gray-400 mt-3">Data Anda akan langsung masuk ke sistem WhatsApp Admin kami secara otomatis.</p>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
