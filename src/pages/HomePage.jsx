import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageLayout from '../components/ui/PageLayout';
import NewsCard from '../components/news/NewsCard';
import NewsSkeleton from '../components/news/NewsSkeleton';
import ErrorState from '../components/states/ErrorState';

const slides = [
  { id: 1, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Bajo_Village%2C_Wakatobi.jpg/1280px-Bajo_Village%2C_Wakatobi.jpg" },
  { id: 2, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Sousu_Beach%2C_Wakatobi.jpg/1280px-Sousu_Beach%2C_Wakatobi.jpg" },
  { id: 3, img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Banana_nudibranch%2C_blade%2C_wakatobi%2C_2018_%2845763919052%29.jpg/1280px-Banana_nudibranch%2C_blade%2C_wakatobi%2C_2018_%2845763919052%29.jpg" }
];

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
    <PageLayout className="bg-white scroll-smooth">
      {/* Hero Section */}
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

      {/* Stats Section */}
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

      {/* News Section */}
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
              <NewsSkeleton count={3} />
            ) : error ? (
              <div className="col-span-3">
                <ErrorState title="Gagal memuat berita." message={error} />
              </div>
            ) : (
              posts.slice(0, 3).map((post) => (
                <NewsCard key={post.id} post={post} />
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
    </PageLayout>
  );
}

export default HomePage;