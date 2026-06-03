import Layout from '../components/Layout';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <Layout>
      <SEO title="Tentang Kami" description="Sejarah dan visi misi Nabila Trans dalam menyediakan layanan logistik terpercaya di Jawa dan Bali." />
      <div className="bg-gray-50 pb-24">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full lg:w-1/2"
            >
              <span className="text-blue-600 font-bold text-xs uppercase tracking-wider mb-4 block">Sejarah Kami</span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-950 leading-tight mb-6">
                Didorong oleh Keandalan, Ditentukan oleh Kepercayaan.
              </h1>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                CV Nabila Trans didirikan pada tahun 2017 di Pasuruan dengan armada hanya dua unit truk. Seiring berjalannya waktu, dedikasi kami terhadap kualitas layanan menjadikan kami salah satu mitra logistik terkemuka.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Inovasi teknologi, standar keamanan tingkat tinggi, dan dedikasi tim lapangan kami memastikan setiap barang sampai dengan aman.
              </p>
              <p className="text-blue-900 font-medium italic border-l-4 border-orange-500 pl-4 py-1">
                "Kepuasan pelanggan adalah pondasi keberlanjutan bisnis kami."
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-full lg:w-1/2 relative group"
            >
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute inset-0 bg-blue-100 rounded-2xl transform translate-x-4 translate-y-4"
              ></motion.div>
              <img src="/images/warehouse.png" alt="Tim CV Nabila Trans" className="rounded-2xl shadow-xl w-full h-[400px] object-cover relative z-10 transition-transform duration-500 group-hover:scale-[1.02]" />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-6 left-6 z-20 bg-blue-950/90 backdrop-blur-md text-white p-4 rounded-lg shadow-lg"
              >
                <p className="font-bold text-lg">Sejak 2017</p>
                <p className="text-xs text-blue-200">Melayani sepenuh hati</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-white py-24 border-y border-gray-100 overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Perjalanan Pertumbuhan Kami</h2>
              <p className="text-gray-500">Dari skala lokal menuju operasional logistik nasional.</p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{ visible: { transition: { staggerChildren: 0.3 } }, hidden: {} }}
              className="relative"
            >
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-orange-200"></div>

              {/* 2017 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center w-full mb-12 relative z-10 group cursor-pointer">
                <div className="w-5/12 text-right pr-8 transition-transform group-hover:-translate-x-2">
                  <h4 className="font-bold text-blue-950 text-xl mb-2">Permulaan</h4>
                  <p className="text-sm text-gray-500">Mulai beroperasi di Pasuruan dengan fokus pengiriman barang dalam kota dan provinsi.</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow group-hover:scale-150 transition-transform"></div>
                </div>
                <div className="w-5/12 pl-8">
                  <span className="text-4xl font-extrabold text-orange-200 group-hover:text-orange-500 transition-colors">2017</span>
                </div>
              </motion.div>

              {/* 2020 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center w-full mb-12 relative z-10 group cursor-pointer">
                <div className="w-5/12 text-right pr-8">
                  <span className="text-4xl font-extrabold text-orange-200 group-hover:text-orange-500 transition-colors">2020</span>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow group-hover:scale-150 transition-transform"></div>
                </div>
                <div className="w-5/12 pl-8 transition-transform group-hover:translate-x-2">
                  <h4 className="font-bold text-blue-950 text-xl mb-2">Ekspansi Armada</h4>
                  <p className="text-sm text-gray-500">Penambahan 50 unit armada baru dan pembukaan hub transit pertama di Cikarang.</p>
                </div>
              </motion.div>

              {/* 2023 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center w-full mb-12 relative z-10 group cursor-pointer">
                <div className="w-5/12 text-right pr-8 transition-transform group-hover:-translate-x-2">
                  <h4 className="font-bold text-blue-950 text-xl mb-2">Integrasi Teknologi</h4>
                  <p className="text-sm text-gray-500">Meluncurkan sistem pelacakan (tracking) digital terpadu untuk transparansi pelanggan.</p>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow group-hover:scale-150 transition-transform"></div>
                </div>
                <div className="w-5/12 pl-8">
                  <span className="text-4xl font-extrabold text-orange-200 group-hover:text-orange-500 transition-colors">2023</span>
                </div>
              </motion.div>

              {/* 2025 */}
              <motion.div variants={{ hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } }} className="flex justify-between items-center w-full relative z-10 group cursor-pointer">
                <div className="w-5/12 text-right pr-8">
                  <span className="text-4xl font-extrabold text-orange-200 group-hover:text-orange-500 transition-colors">2025</span>
                </div>
                <div className="w-2/12 flex justify-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-full border-4 border-white shadow group-hover:scale-150 transition-transform"></div>
                </div>
                <div className="w-5/12 pl-8 transition-transform group-hover:translate-x-2">
                  <h4 className="font-bold text-blue-950 text-xl mb-2">Jaringan Nasional</h4>
                  <p className="text-sm text-gray-500">Melayani rute pengiriman strategis dengan jangkauan lebih dari 50 kota di Jawa dan Bali.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Visi & Misi */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-blue-950 text-white rounded-3xl p-12 shadow-xl relative overflow-hidden">
              <div className="w-14 h-14 bg-blue-900 rounded-xl flex items-center justify-center mb-8 relative z-10">
                <svg className="w-7 h-7 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold mb-4 relative z-10">Visi Kami</h3>
              <p className="text-blue-100 text-lg leading-relaxed relative z-10">
                Menjadi penyedia logistik terdepan di Jawa dan Bali yang menggerakkan pergerakan ekonomi melalui jaringan andal, efisien, dan berkelanjutan.
              </p>
            </div>

            <div className="bg-orange-500 text-white rounded-3xl p-12 shadow-xl relative overflow-hidden">
              <div className="absolute bottom-0 right-0 p-8 opacity-10">
                <svg className="w-32 h-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </div>
              <div className="w-14 h-14 bg-orange-600 rounded-xl flex items-center justify-center mb-8 relative z-10">
                <svg className="w-7 h-7 text-orange-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-3xl font-extrabold mb-4 relative z-10">Misi Kami</h3>
              <ul className="text-orange-50 text-lg leading-relaxed space-y-3 relative z-10 list-disc pl-5">
                <li>Memberikan solusi logistik tepat waktu dengan tingkat keamanan yang tinggi.</li>
                <li>Mengintegrasikan inovasi teknologi demi kemudahan pelanggan.</li>
                <li>Mengembangkan kompetensi tim untuk pelayanan prima.</li>
                <li>Berkontribusi positif pada lingkungan dan sosial masyarakat.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Nilai-nilai */}
        <div className="bg-white py-24 border-y border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Nilai-Nilai yang Kami Jalankan</h2>
              <p className="text-gray-500">Prinsip dasar yang memandu setiap langkah operasional kami.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h4 className="font-bold text-blue-950 text-lg mb-2">Integritas</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Berlaku jujur, transparan, dan dapat dipercaya dalam setiap kesepakatan.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <h4 className="font-bold text-blue-950 text-lg mb-2">Inovatif</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Terus mencari cara yang lebih efisien menggunakan teknologi terbaru.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h4 className="font-bold text-blue-950 text-lg mb-2">Keandalan</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Berkomitmen penuh agar setiap layanan dieksekusi tanpa kendala berarti.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 text-center hover:-translate-y-2 transition-transform duration-300">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" /></svg>
                </div>
                <h4 className="font-bold text-blue-950 text-lg mb-2">Kepuasan Pelanggan</h4>
                <p className="text-sm text-gray-500 leading-relaxed">Menempatkan kesuksesan pelanggan sebagai prioritas nomor satu.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Armada */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-blue-950 mb-6">Armada Serbaguna Kami</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Dedikasi kami untuk keandalan tidak akan terwujud tanpa sarana fisik terbaik. Kami mengoperasikan lebih dari 500 unit kendaraan mulai dari van kecil hingga truk tronton besar yang diservis rutin dan dilengkapi sistem pemantauan GPS terpusat.
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Armada Truk Ekspedisi & Trailer</h4>
                    <p className="text-xs text-gray-500">Kapasitas hingga 20 Ton untuk pengiriman antar pulau.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Truk Box Engkel & CDD</h4>
                    <p className="text-xs text-gray-500">Sangat fleksibel untuk distribusi dalam provinsi & luar kota menengah.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-950 text-sm">Van & Blind Van</h4>
                    <p className="text-xs text-gray-500">Manuver cepat di area perkotaan untuk pengiriman same-day.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative group">
              <img src="/images/gambar3.jfif" alt="Armada Nabila Trans" className="rounded-2xl shadow-xl w-full h-auto" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="bg-blue-950 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-x divide-blue-800">
              <div className="px-4">
                <p className="text-4xl font-bold mb-2">9+</p>
                <p className="text-blue-300 text-sm uppercase tracking-wider">Tahun Pengalaman</p>
              </div>
              <div className="px-4">
                <p className="text-4xl font-bold mb-2">1.2M+</p>
                <p className="text-blue-300 text-sm uppercase tracking-wider">Kiriman Sukses</p>
              </div>
              <div className="px-4">
                <p className="text-4xl font-bold mb-2">1</p>
                <p className="text-blue-300 text-sm uppercase tracking-wider">Kantor Pusat</p>
              </div>
              <div className="px-4 border-r-0 lg:border-r border-blue-800">
                <p className="text-4xl font-bold mb-2">50+</p>
                <p className="text-blue-300 text-sm uppercase tracking-wider">Armada Operasional</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Box */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="bg-orange-500 rounded-3xl p-12 text-center text-white shadow-xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2zm0 4.236l6.382 12.764H5.618L12 6.236z" /></svg>
            </div>
            <h2 className="text-3xl font-extrabold mb-4 relative z-10">Bergabunglah dengan jaringan logistik kami yang terus berkembang</h2>
            <p className="text-orange-100 mb-8 max-w-xl mx-auto relative z-10">
              Kami mencari mitra-mitra inovatif dan handal yang punya visi sejalan untuk menggerakkan logistik lokal ke arah yang lebih efisien dan modern.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Link to="/partnership" className="bg-blue-950 text-white font-bold px-8 py-3 rounded-md hover:bg-blue-900 transition-colors">
                Buka Kerja Sama
              </Link>
              <Link to="/help" className="bg-white text-orange-500 font-bold px-8 py-3 rounded-md hover:bg-gray-50 transition-colors">
                Hubungi Dukungan
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
