import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Deteksi Scroll untuk ubah background navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Tutup menu mobile saat pindah halaman
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // UPDATE: Menu 'Kabar Waginopo' mengarah ke /berita/semua
  const navLinks = [
    { name: 'Beranda', path: '/' },
    { name: 'Profil', path: '/profil' },
    { name: 'Transparansi', path: '/transparansi' },
    { name: 'Kabar Waginopo', path: '/berita/semua' }, 
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 border-b border-white/10 
      ${isScrolled || mobileMenuOpen ? 'bg-green-900/95 backdrop-blur-md py-3 shadow-lg' : 'bg-transparent py-5'}`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group z-50 relative">
          <img 
            src="https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_Kabupaten_Wakatobi_Sulawesi_Tenggara.png" 
            alt="Logo Wakatobi" 
            className="w-10 h-10 object-contain drop-shadow-lg group-hover:rotate-12 transition-transform duration-300"
          />
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white leading-none">
              DESA WAGINOPO
            </span>
            <span className="text-[10px] font-bold tracking-widest text-yellow-400 uppercase">
              Kabupaten Wakatobi
            </span>
          </div>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center bg-white/10 p-1.5 rounded-full backdrop-blur-sm border border-white/10">
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300
                ${location.pathname === item.path 
                  ? 'bg-yellow-400 text-green-900 shadow-md transform scale-105' 
                  : 'text-white hover:bg-white/10 hover:text-yellow-200'
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden text-white z-50 relative focus:outline-none"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="w-6 h-6 flex flex-col justify-center gap-1.5">
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2 w-6' : 'w-6'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'w-4 ml-auto'}`}></span>
            <span className={`block h-0.5 bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2 w-6' : 'w-6'}`}></span>
          </div>
        </button>

        {/* MOBILE MENU DROPDOWN */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full bg-green-900 border-b border-white/10 shadow-2xl md:hidden pt-24 pb-10 px-6 flex flex-col gap-4"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-white text-lg font-bold border-b border-white/5 pb-2 hover:text-yellow-400 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <button className="mt-4 bg-yellow-400 text-green-900 py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg">
                Hubungi Kami
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </nav>
  );
};

export default Navbar;