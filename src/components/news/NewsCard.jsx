import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatDate, sanitizeHtml, sanitizeImageUrl } from '../../utils/utils';

const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/800x600?text=No+Image';

const NewsCard = ({ post, variant = 'default' }) => {
    const rawImageUrl = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
    const imageUrl = sanitizeImageUrl(rawImageUrl) || PLACEHOLDER_IMAGE;
    const category = post._embedded?.['wp:term']?.[0]?.[0]?.name || "Berita";

    if (variant === 'compact') {
        return (
            <Link
                to={`/berita/${encodeURIComponent(post.slug)}`}
                className="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 h-full"
            >
                <div className="relative overflow-hidden h-56">
                    <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
                    <img
                        src={imageUrl}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 relative z-10"
                        alt=""
                        loading="lazy"
                        referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 z-20">
                        <span className="bg-white/95 backdrop-blur text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm border border-green-100">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="p-7 flex-grow flex flex-col">
                    <div className="text-[10px] font-bold text-gray-400 mb-3 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        <span>{formatDate(post.date)}</span>
                    </div>

                    <h3
                        className="text-xl font-bold text-gray-800 group-hover:text-green-700 transition-colors leading-snug mb-3 line-clamp-2"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }}
                    />

                    <div
                        className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 font-medium"
                        dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt.rendered) }}
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
        );
    }

    return (
        <Link
            to={`/berita/${encodeURIComponent(post.slug)}`}
            className="group bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100 h-full block cursor-pointer"
        >
            <div className="relative overflow-hidden h-64">
                <img
                    src={imageUrl}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt=""
                    referrerPolicy="no-referrer"
                />
                <div className="absolute top-5 left-5">
                    <span className="bg-white/90 backdrop-blur text-green-800 text-[10px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-widest shadow-sm">
                        {category}
                    </span>
                </div>
            </div>

            <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 mb-4 uppercase tracking-widest">
                    <span>📅 {formatDate(post.date)}</span>
                </div>

                <h3
                    className="text-xl font-bold text-gray-900 group-hover:text-green-700 transition-colors leading-tight mb-4 line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.title.rendered) }}
                />

                <div
                    className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3"
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.excerpt.rendered) }}
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
    );
};

export default NewsCard;
