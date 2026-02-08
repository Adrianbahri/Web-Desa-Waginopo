import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();

  // Helper untuk scroll ke atas saat pindah halaman
  const handleTopScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-950 text-white pt-20 pb-10 px-6 border-t-8 border-green-700">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 border-b border-white/5 pb-16 mb-10">
        
        {/* LOGO & DESKRIPSI */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <img 
              src="https://upload.wikimedia.org/wikipedia/id/0/0d/Logo_Kabupaten_Wakatobi_Sulawesi_Tenggara.png" 
              className="w-12 h-12 object-contain" 
              alt="Logo Wakatobi" 
            />
            <h2 className="text-2xl font-black uppercase tracking-tighter">Desa Waginopo</h2>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Portal pelayanan digital terpadu Masyarakat Desa Waginopo, Kecamatan Wangi-Wangi, Kabupaten Wakatobi, Sulawesi Tenggara.
          </p>
        </div>
        
        {/* NAVIGASI CEPAT (UPDATE RUTE) */}
        <div>
          <h4 className="font-bold mb-8 text-yellow-400 uppercase text-[11px] tracking-[0.2em]">Navigasi Cepat</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li>
              <Link to="/" onClick={handleTopScroll} className="hover:text-white transition">Beranda</Link>
            </li>
            <li>
              <Link to="/profil" onClick={handleTopScroll} className="hover:text-white transition">Profil Desa</Link>
            </li>
            <li>
              <Link to="/transparansi" onClick={handleTopScroll} className="hover:text-white transition">Transparansi Anggaran</Link>
            </li>
            <li>
              <Link to="/berita/semua" onClick={handleTopScroll} className="hover:text-white transition">Kabar Waginopo</Link>
            </li>
          </ul>
        </div>

        {/* KONTAK */}
        <div>
          <h4 className="font-bold mb-8 text-yellow-400 uppercase text-[11px] tracking-[0.2em]">Kontak</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li className="flex gap-4"><span>📍</span> Kantor Desa Waginopo, Wangi-Wangi</li>
            <li className="flex gap-4"><span>📧</span> info@waginopo.online</li>
          </ul>
        </div>

        {/* SOSIAL MEDIA */}
        <div>
          <h4 className="font-bold mb-8 text-yellow-400 uppercase text-[11px] tracking-[0.2em]">Ikuti Kami</h4>
          <div className="flex gap-3">
            {[
              { name: 'IG', url: 'https://www.instagram.com/kknt115_desawaginopo.wakatobi' },
              { name: 'YT', url: 'https://www.instagram.com/kknt115_desawaginopo.wakatobi' }, // Ganti jika punya URL Youtube spesifik
              { name: 'FB', url: '#' } // Placeholder jika ada FB
            ].map((sc) => (
              <a 
                key={sc.name} 
                href={sc.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center hover:bg-green-700 transition-all font-bold text-xs text-white"
              >
                {sc.name}
              </a>
            ))}
          </div>
        </div>
      </div>
      
      {/* COPYRIGHT */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-bold uppercase tracking-[0.3em]">
        <p>© {new Date().getFullYear()} Mahasiswa KKNT 115 Universitas Hasanuddin.</p>
        <div className="mt-6 md:mt-0 flex gap-8">
           <span className="opacity-50">Desa Waginopo, Wakatobi</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;