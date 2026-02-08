import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import DOMPurify from 'dompurify';

const ITEMS_PER_PAGE = 9;

const stripHtml = (html) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || "";
};

const BeritaSemua = () => {
  const [allPosts, setAllPosts] = useState([]); 
  const [displayPosts, setDisplayPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch('https://waginopowakatobi.online/cms/wp-json/wp/v2/posts?_embed&per_page=100')
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data dari server');
        return res.json();
      })
      .then(data => {
        setAllPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = allPosts.filter(post => 
      post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);

    setDisplayPosts(currentItems);
  }, [allPosts, searchTerm, currentPage]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const filteredTotal = allPosts.filter(post => 
    post.title.rendered.toLowerCase().includes(searchTerm.toLowerCase())
  ).length;
  const totalPages = Math.ceil(filteredTotal / ITEMS_PER_PAGE);

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar />

      <section className="pt-36 pb-20 bg-green-900 text-white px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-4 tracking-tight"
          >
            Arsip Berita
          </motion.h1>
          <p className="text-green-100 text-lg font-medium mb-10 max-w-2xl mx-auto">
            Temukan semua informasi, pengumuman, dan kegiatan terkini yang terjadi di Desa Waginopo.
          </p>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto relative group"
          >
            <input 
              type="text" 
              placeholder="Ketik judul berita yang dicari..." 
              value={searchTerm}
              onChange={handleSearch}
              className="w-full py-5 pl-8 pr-36 rounded-full text-gray-700 bg-white shadow-2xl border-2 border-transparent focus:border-green-400 focus:outline-none focus:ring-4 focus:ring-green-500/20 transition-all font-medium text-lg placeholder-gray-400"
            />
            <button className="absolute right-2 top-2 bottom-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg flex items-center gap-2 group-focus-within:scale-105">
              <span>Cari</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </motion.div>

        </div>
      </section>

      <section className="py-16 px-6 container mx-auto min-h-[600px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[1,2,3].map(i => (
                <div key={i} className="bg-white rounded-3xl h-96 animate-pulse bg-gray-200"></div>
             ))}
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 bg-red-50 rounded-2xl border border-red-100 mx-auto max-w-2xl">
            <p className="font-bold text-xl">Gagal Terhubung</p>
            <p className="text-sm mt-2 opacity-80">{error}</p>
          </div>
        ) : displayPosts.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-2xl font-bold text-gray-600">Berita tidak ditemukan</p>
            <p className="text-gray-400 mt-2">Coba gunakan kata kunci lain.</p>
          </div>
        ) : (
          <>
            {/* GRID BERITA */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <AnimatePresence mode='wait'>
                {displayPosts.map((post) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    key={post.id}
                  >
                    <Link 
                      to={`/berita/${post.slug}`} 
                      className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 h-full"
                    >
                      <div className="relative overflow-hidden h-56">
                        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                        <img 
                          src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 'https://via.placeholder.com/800x600?text=No+Image'} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                          alt="Thumbnail"
                          loading="lazy"
                        />
                        <div className="absolute top-4 left-4 z-20">
                          <span className="bg-white/95 backdrop-blur text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm border border-green-100">
                            {post._embedded?.['wp:term']?.[0]?.[0]?.name || "Info Desa"}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-7 flex-grow flex flex-col">
                        <div className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-green-500"></span>
                           <span>{new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        
                        {/* 2. SANITASI JUDUL (AMAN DARI SCRIPT) */}
                        <h3 
                          className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-snug mb-3 line-clamp-2"
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(post.title.rendered) 
                          }}
                        />
                        
                        <div 
                          className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium"
                          dangerouslySetInnerHTML={{ 
                            __html: DOMPurify.sanitize(post.excerpt.rendered) 
                          }} 
                        />
                        
                        <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center">
                          <span className="text-xs font-black text-green-800 uppercase tracking-[0.15em] group-hover:underline decoration-2 underline-offset-4">
                            Baca Selengkapnya
                          </span>
                          <span className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-600 group-hover:bg-green-600 group-hover:text-white transition-all">
                            →
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-12">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                </button>

                <div className="flex gap-2 bg-white px-2 py-2 rounded-full shadow-sm border border-gray-100">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                    <button
                      key={number}
                      onClick={() => setCurrentPage(number)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                        currentPage === number 
                          ? 'bg-green-600 text-white shadow-lg scale-105' 
                          : 'text-gray-500 hover:bg-gray-100'
                      }`}
                    >
                      {number}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="w-12 h-12 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-green-50 hover:text-green-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-sm hover:shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                </button>
              </div>
            )}
          </>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default BeritaSemua;