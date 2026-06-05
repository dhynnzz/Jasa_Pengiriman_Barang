import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { useState } from 'react';

export default function Help() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <Layout>
      <SEO title="Pusat Bantuan" description="Pusat bantuan pelanggan Nabila Trans. Temukan solusi dari pertanyaan umum atau hubungi CS kami." />
      {/* Header Section */}
      <div className="bg-blue-950 pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,100 C30,50 70,50 100,0 L100,100 Z" fill="currentColor" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6">Pusat Bantuan</h1>
          <p className="text-xl text-blue-200 mb-8">Temukan jawaban atas pertanyaan Anda atau hubungi tim dukungan kami.</p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto bg-white rounded-lg p-2 flex items-center shadow-lg">
            <svg className="w-6 h-6 text-gray-400 ml-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Ketik topik bantuan (misal: asuransi, resi, barang hilang)..." className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-700 ml-3 py-2" />
            <button className="bg-orange-500 text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors cursor-pointer">
              Cari
            </button>
          </div>
        </div>
      </div>

      {/* FAQ & Contact Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-blue-950 mb-8">Pertanyaan yang Sering Diajukan (FAQ)</h2>

            <div className="space-y-4">

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer" onClick={() => toggleFaq(0)}>
                <div className="flex items-center justify-between gap-1.5 p-6 text-gray-900">
                  <h2 className="font-bold text-lg text-blue-950">Bagaimana cara melacak paket saya?</h2>
                  <span className="relative h-5 w-5 shrink-0">
                    {openFaq === 0 ? (
                      <svg className="absolute inset-0 h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    ) : (
                      <svg className="absolute inset-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </span>
                </div>
                {openFaq === 0 && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    Anda dapat melacak paket dengan memasukkan Nomor Resi (misal: NBL-MB7XJR8N) di halaman Tracking kami. Sistem akan menampilkan status real-time, lokasi saat ini, serta estimasi waktu kedatangan.
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer" onClick={() => toggleFaq(1)}>
                <div className="flex items-center justify-between gap-1.5 p-6 text-gray-900">
                  <h2 className="font-bold text-lg text-blue-950">Apa saja barang yang dilarang untuk dikirim?</h2>
                  <span className="relative h-5 w-5 shrink-0">
                    {openFaq === 1 ? (
                      <svg className="absolute inset-0 h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    ) : (
                      <svg className="absolute inset-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </span>
                </div>
                {openFaq === 1 && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    Kami tidak menerima pengiriman barang berbahaya, senjata tajam/api, obat-obatan terlarang, bahan mudah meledak/terbakar, hewan hidup, dan barang ilegal lainnya sesuai dengan hukum yang berlaku di Indonesia.
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer" onClick={() => toggleFaq(2)}>
                <div className="flex items-center justify-between gap-1.5 p-6 text-gray-900">
                  <h2 className="font-bold text-lg text-blue-950">Bagaimana jika paket saya mengalami kerusakan?</h2>
                  <span className="relative h-5 w-5 shrink-0">
                    {openFaq === 2 ? (
                      <svg className="absolute inset-0 h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    ) : (
                      <svg className="absolute inset-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </span>
                </div>
                {openFaq === 2 && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    Jika paket Anda tiba dalam kondisi rusak, Anda dapat mengajukan klaim asuransi (jika Anda menggunakan layanan asuransi kami) maksimal 2x24 jam sejak paket diterima. Hubungi layanan pelanggan kami dan sertakan foto bukti kerusakan serta nomor resi.
                  </div>
                )}
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer" onClick={() => toggleFaq(3)}>
                <div className="flex items-center justify-between gap-1.5 p-6 text-gray-900">
                  <h2 className="font-bold text-lg text-blue-950">Apakah saya bisa mengubah alamat tujuan saat paket sudah dikirim?</h2>
                  <span className="relative h-5 w-5 shrink-0">
                    {openFaq === 3 ? (
                      <svg className="absolute inset-0 h-5 w-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" /></svg>
                    ) : (
                      <svg className="absolute inset-0 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                    )}
                  </span>
                </div>
                {openFaq === 3 && (
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    Perubahan alamat tujuan hanya bisa dilakukan sebelum paket masuk ke pusat penyortiran regional (Hub). Hubungi Customer Service kami segera jika Anda perlu merevisi alamat penerima, mungkin akan dikenakan biaya tambahan rute.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Options */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-950 mb-8">Hubungi Kami Langsung</h2>

            <a href="https://wa.me/6282142923433" target="_blank" rel="noreferrer" className="block bg-white rounded-xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">WhatsApp CS</h3>
                  <p className="text-green-600 text-sm font-semibold">Respon Cepat (Online)</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Tim kami siap membantu Anda melalui chat WhatsApp kapan saja.</p>
            </a>

            <a href="tel:+6282142923433" className="block bg-white rounded-xl shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow group">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">Panggilan Suara</h3>
                  <p className="text-blue-600 text-sm font-semibold">+62 821-4292-3433</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm">Bicarakan masalah Anda langsung dengan agen dukungan kami.</p>
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
