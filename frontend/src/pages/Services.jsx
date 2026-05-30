import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <Layout>
      {/* Header with Background */}
      <div className="relative bg-blue-950 py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img src="http://localhost:8000/images/warehouse.png" alt="Warehouse Background" className="w-full h-full object-cover" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center text-white">
          <span className="inline-block bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider px-3 py-1 rounded-full mb-4">Layanan Pengiriman Logistik Cerdas</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6">Solusi Layanan Logistik</h1>
          <p className="text-blue-100 max-w-2xl mx-auto text-lg leading-relaxed">
            Solusi penanganan komprehensif yang dirancang sesuai kebutuhan rantai pasok Anda. Kami memastikan kargo Anda tiba dengan selamat dan efisien, ke mana pun tujuannya.
          </p>
        </div>
      </div>

      {/* 6 Cards Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 -mt-10 relative z-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Solusi Logistik Berstandar Internasional</h2>
          <p className="text-gray-500 max-w-3xl mx-auto">
            Kami menawarkan berbagai paket layanan logistik dengan prioritas pada penanganan khusus, pengiriman cepat, keamanan, dan standar kepuasan yang tinggi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Pengiriman Ekspres</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Layanan pengiriman super cepat untuk kebutuhan mendesak, kami mengutamakan kecepatan tanpa mengorbankan keamanan pengiriman.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Layanan Logistik Kargo</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Penanganan khusus untuk pengiriman barang berukuran besar dan berat dengan armada lengkap dan rute distribusi yang dioptimalkan.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Layanan Pengiriman Antar Kota</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Koneksi antar kota di seluruh provinsi dengan jadwal yang teratur. Memastikan pasokan logistik selalu terpenuhi tepat waktu.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Pengiriman Hari yang sama</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Pengiriman dalam kota dengan jaminan tiba hanya dalam hitungan jam. Sangat cocok untuk bisnis ritel dan dokumen mendesak.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Layanan Distribusi Gudang</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kami menyediakan layanan pergudangan dan manajemen inventory untuk membantu rantai logistik dari hulu ke hilir.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Layanan Pengiriman untuk Bisnis</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Layanan pengiriman rutin dalam skala besar atau kerja sama jangka panjang (B2B) untuk mendukung ekspansi bisnis.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Bagaimana Proses Pengiriman Kami Bekerja</h2>
            <p className="text-gray-500">Proses kerja kami yang efisien dalam 6 langkah dirancang untuk memastikan transparansi dan keandalan, mulai dari proses pemesanan hingga paket diterima langsung oleh penerima.</p>
          </div>

          <div className="relative flex flex-col md:flex-row justify-between items-center px-4 py-8 overflow-x-auto">
            <div className="absolute left-8 right-8 top-1/2 h-0.5 bg-gray-200 hidden md:block -z-10"></div>

            <div className="flex flex-col items-center mb-8 md:mb-0 relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-900 font-bold mb-3 z-10">1</div>
              <span className="text-sm font-bold text-blue-950">Pemesanan</span>
            </div>

            <div className="flex flex-col items-center mb-8 md:mb-0 relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-900 font-bold mb-3 z-10">2</div>
              <span className="text-sm font-bold text-blue-950">Penjemputan</span>
            </div>

            <div className="flex flex-col items-center mb-8 md:mb-0 relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-blue-900 font-bold mb-3 z-10">3</div>
              <span className="text-sm font-bold text-blue-950">Penyortiran</span>
            </div>

            <div className="flex flex-col items-center mb-8 md:mb-0 relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full border-2 border-orange-500 bg-white flex items-center justify-center text-orange-500 font-bold mb-3 z-10">4</div>
              <span className="text-sm font-bold text-orange-500">Transit</span>
            </div>

            <div className="flex flex-col items-center mb-8 md:mb-0 relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full border-2 border-blue-900 bg-white flex items-center justify-center text-gray-400 font-bold mb-3 z-10">5</div>
              <span className="text-sm font-bold text-gray-400">Last Mile</span>
            </div>

            <div className="flex flex-col items-center relative bg-gray-50 px-2">
              <div className="w-12 h-12 rounded-full bg-blue-950 flex items-center justify-center text-white font-bold mb-3 z-10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
              </div>
              <span className="text-sm font-bold text-gray-400">Disampaikan</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alur Kerja */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <div className="bg-blue-50 rounded-2xl p-8 relative">
              <img src="http://localhost:8000/images/truck.png" alt="Truck Delivery" className="w-full h-auto rounded-xl" />
              <div className="absolute -bottom-6 -right-6 bg-[#0f467e] text-white p-8 rounded-2xl shadow-2xl max-w-sm">
                <p className="text-lg italic font-medium mb-5 leading-relaxed tracking-wide">"Presisi di setiap proses, transparansi di setiap kilometer."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-1.5 bg-orange-500 rounded-full"></div>
                  <span className="text-orange-500 font-bold tracking-widest text-sm uppercase">NABILA STANDARD</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-extrabold text-blue-950 mb-6 leading-tight">Alur Kerja Cerdas dengan Keandalan Terbaik</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sistem pemrosesan pesanan kami dirancang untuk memastikan bahwa tidak ada barang bawaan Anda yang tertinggal. Dengan teknologi optimasi rute, pembaruan real-time, kami menghemat waktu dan meningkatkan efisiensi.
            </p>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 mb-1">Tersedia Di Mana Saja</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Jangkauan layanan kami meliputi semua wilayah Indonesia dengan mitra di seluruh nusantara.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-blue-950 mb-1">Sistem Pelacakan Cerdas</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">Status barang dimonitor dan dilaporkan kepada Anda pada setiap checkpoint, memberikan ketenangan penuh.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cakupan Nasional */}
      <div className="bg-gray-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold mb-6">Cakupan Nasional</h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Kami menjangkau titik tersulit sekalipun dengan infrastruktur andalan yang tersebar di wilayah strategis dari Sabang sampai Merauke, melayani kebutuhan antar pulau.
              </p>
              <div className="grid grid-cols-2 gap-8 mb-12">
                <div>
                  <h4 className="font-bold text-orange-500 mb-4 text-sm uppercase tracking-wider">Jawa & Bali</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>&bull; Jakarta</li>
                    <li>&bull; Bandung, Jawa Barat</li>
                    <li>&bull; Semarang, Jawa Tengah</li>
                    <li>&bull; Surabaya</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-4 text-sm uppercase tracking-wider">Sumatera</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>&bull; Medan</li>
                    <li>&bull; Palembang</li>
                    <li>&bull; Padang</li>
                    <li>&bull; Lampung</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-4 text-sm uppercase tracking-wider">Kalimantan</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>&bull; Pontianak</li>
                    <li>&bull; Balikpapan</li>
                    <li>&bull; Banjarmasin</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold text-orange-500 mb-4 text-sm uppercase tracking-wider">Sulawesi</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li>&bull; Makassar</li>
                    <li>&bull; Manado</li>
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-700 pt-8 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-2xl font-bold">500+</p>
                  <p className="text-xs text-gray-400">Provinsi/Kota</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">34</p>
                  <p className="text-xs text-gray-400">Pulau</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">100%</p>
                  <p className="text-xs text-gray-400">Asuransi Penuh</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-blue-900/20 rounded-2xl blur-3xl"></div>
              <div className="bg-blue-950 border border-blue-800 rounded-2xl p-10 relative z-10 w-full max-w-md text-center shadow-2xl">
                <div className="w-16 h-16 mx-auto mb-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                </div>
                <h4 className="text-xl font-bold mb-3">Jaringan Distribusi Interaktif</h4>
                <p className="text-gray-400 text-sm mb-8 leading-relaxed">Klik di bawah untuk melihat peta cakupan layanan dan lokasi cabang kami secara lengkap.</p>
                <Link to="/coverage-map" className="inline-block bg-white text-blue-950 font-bold px-8 py-3 rounded-md hover:bg-gray-100 transition-colors">
                  Buka Peta Global
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Box */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-blue-900 rounded-3xl p-12 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-extrabold mb-4">Butuh solusi logistik khusus untuk bisnis Anda?</h2>
          <p className="text-blue-200 mb-8 max-w-2xl mx-auto">Tim ahli kami siap merancang strategi pengiriman yang sesuai secara optimal dengan kebutuhan unik bisnis Anda.</p>
          <div className="flex justify-center gap-4">
            <a href="https://wa.me/6282340074645?text=Halo%20Tim%20Sales%20CV%20Nabila%20Trans,%20saya%20tertarik%20dengan%20solusi%20logistik%20khusus%20untuk%20bisnis%20saya." target="_blank" rel="noreferrer" className="bg-orange-500 text-white font-bold px-8 py-3 rounded-md hover:bg-orange-600 transition-colors">
              Hubungi Sales Kami
            </a>
            <Link to="/rates" className="bg-blue-800 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-700 border border-blue-700 transition-colors">
              Hitung Biaya
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
