import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white pt-16 pb-8 border-t border-gray-100"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-8 mb-8 md:mb-12">
          {/* Brand & About */}
          <div className="col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-xl shadow-sm">
                N
              </div>
              <span className="font-bold text-xl text-blue-950">CV Nabila Trans</span>
            </Link>
            <p className="text-gray-500 text-sm mb-4 md:mb-6 leading-relaxed">
              Mitra logistik terpercaya Anda. Menghadirkan layanan pengiriman barang yang cepat, aman, dan efisien dengan jangkauan luas di seluruh wilayah Jawa dan Bali.
            </p>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="text-blue-950 font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><Link to="/about" className="hover:text-blue-600 transition-colors">Tentang Kami</Link></li>
              <li><Link to="/branches" className="hover:text-blue-600 transition-colors">Lokasi Cabang</Link></li>
              <li><Link to="/partnership" className="hover:text-blue-600 transition-colors">Kemitraan Agen</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 transition-colors">Karir</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 transition-colors">Blog & Berita</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-blue-950 font-bold mb-4">Layanan Pelanggan</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li><Link to="/help" className="hover:text-blue-600 transition-colors">Pusat Bantuan</Link></li>
              <li><Link to="/track" className="hover:text-blue-600 transition-colors">Lacak Paket</Link></li>
              <li><Link to="/#rates" className="hover:text-blue-600 transition-colors">Cek Tarif</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link to="/privacy" className="hover:text-blue-600 transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>

          {/* Informasi Kontak */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold text-blue-950 mb-3 md:mb-6 text-sm">Informasi Kontak</h4>
            <ul className="space-y-2 md:space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <span>Tempel, Legok, Kec. Gempol, Pasuruan, Jawa Timur 67155</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <span>+62 821-4292-3433</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            HAK CIPTA &copy; 2026 CV NABILA TRANS - SEMUA HAK CIPTA DILINDUNGI UNDANG-UNDANG
          </p>
          <div className="flex space-x-6 text-gray-400 text-xs font-medium uppercase tracking-wider">
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Ketentuan Layanan</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
