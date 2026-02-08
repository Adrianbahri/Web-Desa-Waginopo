import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const SinglePost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://waginopowakatobi.online/cms/wp-json/wp/v2/posts?slug=${slug}&_embed`)
      .then(res => res.json())
      .then(data => {
        setPost(data[0]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return <div className="h-screen flex items-center justify-center font-bold">Memuat Artikel...</div>;
  if (!post) return <div className="h-screen flex items-center justify-center text-red-500">Berita Tidak Ditemukan.</div>;

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
          <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-6" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div className="text-gray-400 text-xs uppercase tracking-widest">
            {new Date(post.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} • Oleh Admin
          </div>
        </header>

        <div className="rounded-3xl overflow-hidden shadow-2xl mb-12 h-[300px] md:h-[500px]">
           <img src={post._embedded?.['wp:featuredmedia']?.[0]?.source_url} className="w-full h-full object-cover" alt="Featured" />
        </div>
        <div 
          className="prose prose-lg max-w-none text-gray-800 leading-relaxed prose-img:rounded-2xl"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
        />
      </article>
    </div>
  );
};

export default SinglePost;