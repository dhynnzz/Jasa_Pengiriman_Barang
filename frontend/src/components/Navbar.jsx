import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export default function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Lacak Resi', path: '/track' },
    { name: 'Layanan', path: '/services' },
    { name: 'Jangkauan', path: '/coverage' },
    { name: 'Lokasi Cabang', path: '/branches' },
    { name: 'Kemitraan', path: '/partnership' },
    { name: 'Bantuan', path: '/help' },
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > 100 && latest > previous) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 50);
  });

  return (
    <motion.header 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm' : 'bg-white border-b border-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-900 text-white rounded flex items-center justify-center font-bold text-xl shadow-sm">
                N
              </div>
              <span className="font-bold text-xl text-blue-950">CV Nabila Trans</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex space-x-8">
            <NavLink to="/" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Beranda</NavLink>
            <NavLink to="/services" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Layanan</NavLink>
            <NavLink to="/tracking" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Lacak</NavLink>
            <NavLink to="/rates" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Biaya Pengiriman</NavLink>
            <NavLink to="/partnership" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Kemitraan</NavLink>
            <NavLink to="/about" className={({ isActive }) => `font-medium text-sm transition-colors ${isActive ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-600 hover:text-blue-600'}`}>Tentang</NavLink>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex items-center">
            <a 
              href="https://wa.me/+6282142923433?text=Halo%20Nabila%20Trans,%20saya%20ingin%20menggunakan%20layanan%20pengiriman%20barang." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Kirim Sekarang
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center">
            <button 
              type="button" 
              className="text-gray-500 hover:text-gray-900 focus:outline-none p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <motion.div 
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="md:hidden overflow-hidden bg-white border-t border-gray-100 shadow-lg"
      >
        <div className="px-4 pt-2 pb-6 space-y-1">
          <NavLink to="/" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Beranda</NavLink>
          <NavLink to="/services" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Layanan</NavLink>
          <NavLink to="/tracking" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Lacak</NavLink>
          <NavLink to="/rates" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Biaya Pengiriman</NavLink>
          <NavLink to="/partnership" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Kemitraan</NavLink>
          <NavLink to="/about" className={({ isActive }) => `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'}`}>Tentang</NavLink>
          
          <a 
            href="https://wa.me/6282340074645?text=Halo%20Nabila%20Trans,%20saya%20ingin%20menggunakan%20layanan%20pengiriman%20barang." 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-4 block w-full text-center bg-orange-500 text-white px-6 py-3 rounded-md font-medium text-base hover:bg-orange-600 transition-colors shadow-md"
          >
            Kirim Sekarang
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
