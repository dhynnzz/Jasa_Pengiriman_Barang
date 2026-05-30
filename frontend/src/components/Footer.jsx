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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand & About */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-xl shadow-sm">
                N
              </div>
              <span className="font-bold text-xl text-blue-950">CV Nabila Trans</span>
            </Link>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Solusi logistik cerdas berbasis AI yang didukung tim profesional untuk menyederhanakan operasional pengiriman Anda di seluruh Indonesia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-blue-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>

          {/* Layanan */}
          <div>
            <h4 className="font-bold text-blue-950 mb-6 text-sm">Layanan</h4>
            <ul className="space-y-4">
              <li><Link to="/services" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Pengiriman Ekspres</Link></li>
              <li><Link to="/services" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Logistik Kargo</Link></li>
              <li><Link to="/services" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Pergudangan</Link></li>
            </ul>
          </div>

          {/* Tautan Cepat */}
          <div>
            <h4 className="font-bold text-blue-950 mb-6 text-sm">Tautan Cepat</h4>
            <ul className="space-y-4">
              <li><Link to="/tracking" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Lacak Pengiriman</Link></li>
              <li><Link to="/rates" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Biaya Pengiriman</Link></li>
              <li><Link to="/about" className="text-gray-500 hover:text-blue-600 text-sm transition-colors">Tentang Kami</Link></li>
            </ul>
          </div>

          {/* Informasi Kontak */}
          <div>
            <h4 className="font-bold text-blue-950 mb-6 text-sm">Informasi Kontak</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <span>Gedung Nabila Center, Jalan Jend. Sudirman Gempol, Pasuruan Jawa Timur</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <span>+62 21 8000 1234</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <span>support@nabilatrans.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
            HAK CIPTA &copy; 2023 CV NABILA TRANS - SEMUA HAK CIPTA DILINDUNGI UNDANG-UNDANG
          </p>
          <div className="flex space-x-6 text-gray-400 text-xs font-medium uppercase tracking-wider">
            <Link to="/terms" className="hover:text-blue-600 transition-colors">Ketentuan Layanan</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
