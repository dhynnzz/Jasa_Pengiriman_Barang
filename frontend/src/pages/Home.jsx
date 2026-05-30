import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function Home() {
  const testimonials = [
    {
      text: "\"CV Nabila Trans memberikan solusi logistik lengkap dalam satu layanan terpadu. Mereka selalu memastikan pelanggan kami mendapatkan informasi terbaru, dan kami berhasil mengurangi hingga 83% tiket keluhan.\"",
      name: "Asep Ganteng",
      role: "Direktur PT Jaya Abadi",
      img: "https://i.pravatar.cc/150?img=11"
    },
    {
      text: "\"Pengiriman super cepat dan CS sangat responsif. Sangat merekomendasikan layanan Nabila Trans untuk keperluan bisnis berskala besar maupun kecil.\"",
      name: "Budi Santoso",
      role: "Owner Toko Laris",
      img: "https://i.pravatar.cc/150?img=12"
    },
    {
      text: "\"Sistem pelacakan live-nya sangat membantu kami memantau pergerakan barang. Harga terjangkau dengan kualitas pelayanan bintang 5.\"",
      name: "Siti Rahma",
      role: "Manager Operasional",
      img: "https://i.pravatar.cc/150?img=9"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gray-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full lg:w-1/2"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-semibold tracking-wide mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 mr-2"></span>
                Next-Gen Logistics
              </span>
              <h1 className="text-4xl lg:text-5xl font-extrabold text-blue-950 leading-tight mb-6">
                Layanan Pengiriman Cepat, Aman, dan Terpercaya di Seluruh Indonesia
              </h1>
              <p className="text-gray-600 text-lg mb-8 leading-relaxed max-w-lg">
                Permudah logistik Anda dengan solusi pengiriman berbasis teknologi kami. Kami menghadirkan konsistensi layanan yang setara dengan tenaga profesional terbaik.
              </p>
              <div className="flex items-center gap-4">
                <Link to="/tracking" className="bg-orange-500 text-white px-8 py-3 rounded-md font-semibold hover:bg-orange-600 transition-colors shadow-lg flex items-center gap-2">
                  Lacak Paket
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
                <div className="flex items-center gap-3 text-white/80 text-sm">
                  <div className="flex -space-x-2">
                    <img className="w-8 h-8 rounded-full border-2 border-blue-900" src="https://i.pravatar.cc/100?img=1" alt="User"/>
                    <img className="w-8 h-8 rounded-full border-2 border-blue-900" src="https://i.pravatar.cc/100?img=2" alt="User"/>
                    <img className="w-8 h-8 rounded-full border-2 border-blue-900" src="https://i.pravatar.cc/100?img=3" alt="User"/>
                  </div>
                  <span>Dipercaya 10k+ Pelanggan</span>
                </div>
              </div>
              </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              whileHover={{ rotateY: 5, rotateX: -5, scale: 1.02 }}
              className="w-full lg:w-1/2 relative group perspective-1000 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-purple-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
              <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl relative transform transition-transform duration-700 group-hover:-translate-y-2 group-hover:rotate-1">
                <img src="http://localhost:8000/images/truck.png" alt="Logistic Truck" className="w-full h-auto object-cover rounded-2xl shadow-inner mix-blend-overlay opacity-90" />
                
                {/* Floating UI Elements */}
                <div className="absolute -left-6 top-1/4 bg-white rounded-xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Status</p>
                    <p className="text-sm font-bold text-gray-900">Delivered</p>
                  </div>
                </div>
                
                <div className="absolute -right-6 bottom-1/4 bg-white rounded-xl p-4 shadow-xl border border-gray-100 flex items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-bold">Estimasi</p>
                    <p className="text-sm font-bold text-gray-900">2 Hari</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Stats - Overlapping the Hero Section */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={{
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
          hidden: {}
        }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 -mt-20 mb-12"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            { value: "10k+", label: "Pengantaran", color: "text-blue-950" },
            { value: "500+", label: "Kota Cakupan Layanan", color: "text-orange-500" },
            { value: "99%", label: "Keberhasilan Pengiriman", color: "text-blue-950" },
            { value: "24/7", label: "Support Team", color: "text-orange-500" }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
              }}
              whileHover={{ y: -10, scale: 1.02 }} 
              className="bg-white/90 backdrop-blur-md border border-white/50 rounded-2xl p-6 flex flex-col justify-center shadow-xl transition-transform"
            >
              <h3 className={`text-3xl font-extrabold ${stat.color} mb-2`}>{stat.value}</h3>
              <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-extrabold text-blue-950 leading-tight mb-4">
            Dirancang untuk bekerja cerdas, bukan hanya bergerak cepat
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Solusi logistik komprehensif kami dirancang untuk mengoptimalkan setiap proses pengiriman, mengevaluasi distribusi barang, serta memastikan pengiriman yang lebih cepat dan konsisten.
          </p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Card 1 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Express Delivery</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Layanan pengiriman super cepat untuk kebutuhan mendesak. Kami mengutamakan kecepatan tanpa mengorbankan keamanan pengiriman.
            </p>
            <Link to="/services" className="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
          {/* Card 2 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-300">
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Layanan Kargo Berat</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Penanganan khusus untuk pengiriman barang berukuran besar dan berat dengan solusi rute yang disesuaikan.
            </p>
            <Link to="/services" className="text-blue-900 font-semibold text-sm flex items-center gap-1 hover:text-blue-800">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
          {/* Card 3 */}
          <motion.div variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }} whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 transition-all duration-300">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">Same Day</h3>
            <p className="text-gray-600 text-sm leading-relaxed mb-6">
              Pengiriman dalam kota dengan jaminan tiba hanya dalam hitungan jam. Sangat cocok untuk bisnis lokal dan pengiriman dokumen penting.
            </p>
            <Link to="/services" className="text-orange-500 font-semibold text-sm flex items-center gap-1 hover:text-orange-600">
              Learn more
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Services Overview */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl font-extrabold text-blue-950 mb-4">Pengalaman Pengiriman Modern</h2>
            <p className="text-gray-600 text-lg">Platform kami menyederhanakan siklus pengiriman dengan otomatisasi dan jaringan handal yang terintegrasi penuh.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Kecepatan Optimal</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Pengiriman hari yang sama dan hari berikutnya dengan rute algoritma cerdas yang meminimalkan waktu transit.</p>
              <Link to="/services" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1">
                Pelajari <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Keamanan Ekstra</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Setiap paket diasuransikan dengan fasilitas pelacakan kondisi secara live untuk keamanan penuh.</p>
              <Link to="/services" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1">
                Pelajari <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-blue-950 mb-3">Jangkauan Luas</h3>
              <p className="text-gray-600 leading-relaxed mb-6">Mengirim ke pelosok negeri hingga luar pulau dengan dukungan jaringan hub logistik raksasa.</p>
              <Link to="/services" className="text-orange-500 font-semibold hover:text-orange-600 flex items-center gap-1">
                Pelajari <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Delight Customers */}
      <div className="bg-gray-900 py-24 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">Delight your customers</h2>
              <p className="text-gray-400 text-lg mb-12 leading-relaxed">
                Fokus kami pada penanganan masalah sejak dini memastikan setiap kendala dapat diselesaikan sebelum berkembang lebih besar, sehingga pelanggan Anda tetap mendapatkan informasi tanpa Anda harus repot menangani semuanya sendiri.
              </p>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Real-time tracking</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Melacak status pengiriman secara real-time dengan pembaruan langsung dan data lokasi yang akurat.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Keamanan Penanganan Barang</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Layanan dukungan premium dan pengaturan khusus yang disesuaikan dengan standar keamanan Anda.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Tarif Pengiriman Kompetitif</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Mengidentifikasi peluang konsolidasi pengiriman untuk memastikan kapasitas yang lebih stabil dengan biaya yang lebih efektif.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-6 h-6 rounded-full bg-orange-500/20 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1">Expert team</h4>
                    <p className="text-gray-400 text-sm leading-relaxed">Tim operasional kami siap melayani 24/7 untuk mendukung setiap pengiriman, awalnya: tim logistik profesional yang bekerja khusus untuk bisnis Anda.</p>
                  </div>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2 flex items-center"
            >
              <div className="w-full overflow-hidden pb-10">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  spaceBetween={30}
                  slidesPerView={1}
                  autoplay={{ delay: 5000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  className="w-full"
                >
                  {testimonials.map((t, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="bg-blue-950 border border-blue-900/50 rounded-2xl p-10 w-full relative mb-12">
                        <div className="absolute -top-4 -left-4 w-8 h-8 text-blue-500 opacity-50">
                          <svg fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" /></svg>
                        </div>
                        <p className="text-xl lg:text-2xl font-medium leading-relaxed mb-8">
                          {t.text}
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center overflow-hidden">
                            <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h5 className="font-bold text-white text-sm">{t.name}</h5>
                            <p className="text-blue-400 text-xs">{t.role}</p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-900 py-24 text-center text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-extrabold mb-6 leading-tight">Anda fokus mengembangkan bisnis.<br />Biarkan kami menangani logistiknya.</h2>
          <p className="text-blue-200 text-lg mb-10 max-w-xl mx-auto">
            Serahkan proses penawaran harga, pelacakan, dan koordinasi pengiriman kepada kami—tanpa kerumitan dalam pengelolaannya. Siap mengirim paket Anda.
          </p>
          <Link to="/partnership" className="inline-block bg-orange-500 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg">
            Ajukan Penawaran Sekarang
          </Link>
        </div>
      </div>
    </Layout>
  );
}
