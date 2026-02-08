import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DOMPurify from 'dompurify';

const slides = [
  { id: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bajo_Village%2C_Wakatobi.jpg/1280px-Bajo_Village%2C_Wakatobi.jpg" },
  { id: 2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sousu_Beach%2C_Wakatobi.jpg/1280px-Sousu_Beach%2C_Wakatobi.jpg" },
  { id: 3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Banana_nudibranch%2C_blade%2C_wakatobi%2C_2018_%2845763919052%29.jpg/1280px-Banana_nudibranch%2C_blade%2C_wakatobi%2C_2018_%2845763919052%29.jpg" }
];

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const NewsSkeleton = () => (
  <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse">
    <div className="h-64 bg-gray-200"></div>
    <div className="p-8">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
      <div className="space-y-2 mb-8">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="h-4 bg-gray-200 rounded w-1/4 pt-6 mt-auto"></div>
    </div>
  </div>
);

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://waginopowakatobi.online/cms/wp-json/wp/v2/posts?_embed&per_page=3')
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data dari server');
        return res.json();
      })
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden scroll-smooth">
      <Navbar />

      <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slides[current].img}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 w-full h-full object-cover"
              alt="Pemandangan Desa Waginopo"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-green-900/90 z-10"></div>
        </div>

        <div className="relative z-20 text-center px-4 md:px-6 w-full max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-yellow-400 font-bold tracking-[0.2em] uppercase text-xs md:text-sm mb-4 block">
              Portal Resmi Pemerintahan
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-none mb-6 drop-shadow-2xl tracking-tight">
              DESA WAGINOPO
            </h1>
            <p className="text-sm md:text-lg text-green-100 mb-10 leading-relaxed max-w-2xl mx-auto drop-shadow-md font-medium">
              Mewujudkan Waginopo yang Mandiri, Sejahtera, dan Berbudaya di Jantung Wakatobi.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/profil" className="w-full sm:w-auto bg-yellow-500 text-green-900 px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-yellow-400 transition-all shadow-xl active:scale-95 text-center">
                Jelajahi Profil
              </Link>
              <a href="#berita" className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 rounded-full font-bold text-base md:text-lg hover:bg-white/20 transition-all text-center">
                Kabar Terbaru
              </a>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-28 flex gap-2 z-30">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-1.5 transition-all duration-500 rounded-full shadow-lg ${index === current ? "w-10 bg-yellow-400" : "w-3 bg-white/50 hover:bg-white"}`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="py-12 bg-white relative z-20 -mt-10 mx-4 md:mx-10 rounded-3xl shadow-xl border border-gray-100">
         <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center px-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="py-2 md:py-0">
               <h3 className="text-3xl md:text-4xl font-black text-green-700">1.105</h3>
               <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Hektar Wilayah</p>
            </div>
            <div className="py-2 md:py-0">
               <h3 className="text-3xl md:text-4xl font-black text-green-700">748</h3>
               <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Jiwa Penduduk</p>
            </div>
            <div className="py-2 md:py-0">
               <h3 className="text-3xl md:text-4xl font-black text-green-700">2</h3>
               <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">Dusun</p>
            </div>
         </div>
      </section>

      <section id="berita" className="py-24 px-6 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-4">
            <div className="text-center md:text-left">
              <span className="text-green-600 font-bold tracking-wider uppercase text-sm">Update Terkini</span>
              <h2 className="text-4xl font-black text-gray-900 mt-2">Kabar Waginopo</h2>
            </div>
            <Link to="/berita/semua" className="hidden md:block text-green-700 font-bold hover:underline">
              Lihat Semua Berita &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {loading ? (
              <><NewsSkeleton /><NewsSkeleton /><NewsSkeleton /></>
            ) : error ? (
              <div className="col-span-3 text-center py-20 text-red-500 bg-red-50 rounded-2xl border border-red-100">
                <p className="font-bold">Gagal memuat berita.</p>
                <p className="text-sm">{error}</p>
              </div>
            ) : (
              posts.slice(0, 3).map((post) => (
                <Link 
                  to={`/berita/${post.slug}`} 
                  key={post.id} 
                  className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 h-full block cursor-pointer"
                >
                  <div className="relative overflow-hidden h-64">
                    <img 
                      src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      alt={stripHtml(post.title.rendered)}
                    />
                    <div className="absolute top-5 left-5">
                      <span className="bg-white/90 backdrop-blur text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm">
                        {post._embedded?.['wp:term']?.[0]?.[0]?.name || "Berita"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-8 flex-grow flex flex-col">
                    <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                       <span>📅 {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                    </div>
                    
                    <h3 
                      className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight mb-4 line-clamp-2"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(post.title.rendered) 
                      }}
                    />
                    
                    <div 
                      className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(post.excerpt.rendered) 
                      }} 
                    />
                    
                    <div className="mt-auto pt-6 border-t border-gray-50 flex justify-between items-center">
                      <span className="text-xs font-black text-green-900 group-hover:text-green-700 uppercase tracking-[0.15em] flex items-center gap-2">
                        Baca Selengkapnya
                      </span>
                      <motion.div 
                        whileHover={{ x: 5 }}
                        className="text-green-600"
                      >
                        →
                      </motion.div>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
          
          <div className="mt-12 text-center md:hidden">
            <Link to="/berita/semua" className="inline-block px-6 py-3 bg-gray-200 text-gray-700 rounded-full font-bold text-sm">
              Lihat Semua Berita
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default HomePage;