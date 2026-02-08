import React from 'react';
import { motion } from 'framer-motion';

const PageHeader = ({ title, subtitle, badge, children }) => {
    return (
        <section className="pt-32 pb-16 bg-green-900 text-white px-6 rounded-b-[3rem] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
            </div>

            <div className="container mx-auto text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    {badge && (
                        <span className="text-yellow-400 font-bold tracking-widest uppercase text-xs mb-3 block">
                            {badge}
                        </span>
                    )}
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black mb-4 tracking-tight"
                    >
                        {title}
                    </motion.h1>
                    {subtitle && (
                        <p className="text-green-100 text-lg font-medium mb-6 max-w-2xl mx-auto">
                            {subtitle}
                        </p>
                    )}
                </motion.div>
                {children}
            </div>
        </section>
    );
};

export default PageHeader;
