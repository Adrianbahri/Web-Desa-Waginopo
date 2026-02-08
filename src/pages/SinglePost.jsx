import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import LoadingState from '../components/states/LoadingState';
import { formatDate, sanitizeHtml, sanitizeImageUrl } from '../utils/utils';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`https://waginopowakatobi.online/cms/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_embed`, {
      signal: controller.signal
    })
      .then(res => {
        if (!res.ok) throw new Error('Gagal memuat artikel');
        return res.json();
      })
      .then(data => {
        setPost(data[0] || null);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => controller.abort();
  }, [slug]);

  if (loading) return <LoadingState message="Memuat Artikel..." />;

  if (error || !post) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-red-500 bg-white">
        <div className="text-6xl mb-4">📰</div>
        <p className="text-2xl font-bold">{error || 'Berita Tidak Ditemukan'}</p>
        <Link to="/" className="mt-6 text-green-700 font-bold hover:underline">
          ← Kembali ke Beranda
        </Link>
      </div>
    );
  }

  const featuredImage = sanitizeImageUrl(post._embedded?.['wp:featuredmedia']?.[0]?.source_url);

  return (
    <div className="bg-white min-h-screen">
      <nav className="bg-green-900 text-white py-4 px-6 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="font-bold uppercase tracking-widest text-xs">← Kembali ke Beranda</Link>
          <span className="text-[10px] uppercase tracking-widest opacity-60">Portal Desa Waginopo</span>
        </div>
      </nav>

      <article className="pt-32 pb-20 max-w-4xl mx-auto px-6">
        <header className="mb-12">
          <h1
            className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }}
          />
          <div className="text-gray-400 text-xs uppercase tracking-widest">
            {formatDate(post.date)} • Oleh Admin
          </div>
        </header>

        {featuredImage && (
          <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 h-[300px] md:h-[500px]">
            <img
              src={featuredImage}
              className="w-full h-full object-cover"
              alt=""
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.rendered) }}
        />
      </article>
    </div>
  );
};

export default SinglePost;