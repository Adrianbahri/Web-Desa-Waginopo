import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PageLayout from '../components/ui/PageLayout';
import PageHeader from '../components/ui/PageHeader';
import NewsCard from '../components/news/NewsCard';
import NewsSkeleton from '../components/news/NewsSkeleton';
import ErrorState from '../components/states/ErrorState';
import EmptyState from '../components/states/EmptyState';

const ITEMS_PER_PAGE = 9;

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
    <PageLayout className="bg-gray-50">
      <PageHeader
        title="Arsip Berita"
        subtitle="Temukan semua informasi, pengumuman, dan kegiatan terkini yang terjadi di Desa Waginopo."
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto relative group mt-6"
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
      </PageHeader>

      <section className="py-16 px-6 container mx-auto min-h-[600px]">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <NewsSkeleton count={3} />
          </div>
        ) : error ? (
          <ErrorState title="Gagal Terhubung" message={error} className="mx-auto max-w-2xl" />
        ) : displayPosts.length === 0 ? (
          <EmptyState
            icon="📭"
            title="Berita tidak ditemukan"
            message="Coba gunakan kata kunci lain."
          />
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
                    <NewsCard post={post} variant="compact" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Pagination */}
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
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === number
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
    </PageLayout>
  );
};

export default BeritaSemua;