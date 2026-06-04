import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Package } from 'lucide-react';
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
            <Link 
              to="/order"
              className="bg-orange-500 text-white px-6 py-2 rounded-full font-medium text-sm hover:bg-orange-600 transition-colors shadow-md flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Kirim Sekarang
            </Link>
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
          
          <Link 
            to="/order"
            className="mt-4 flex items-center justify-center gap-2 w-full bg-orange-500 text-white px-6 py-3 rounded-md font-medium text-base hover:bg-orange-600 transition-colors shadow-md"
          >
            <Package className="w-5 h-5" />
            Kirim Sekarang
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
