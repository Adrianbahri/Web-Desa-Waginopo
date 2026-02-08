import React from 'react';
import { motion } from 'framer-motion';

const StructureCard = ({ jabatan, nama, foto, color = "bg-green-700", sub = false }) => (
    <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex flex-col items-center p-3 md:p-4 rounded-2xl border shadow-sm hover:shadow-md transition-all flex-shrink-0 ${sub ? 'w-32 md:w-44' : 'w-40 md:w-56'} bg-white border-gray-100 mx-auto`}
    >
        <div className={`relative mb-3 ${sub ? 'h-14 w-14 md:h-20 md:w-20' : 'h-16 w-16 md:h-24 md:w-24'} rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-50`}>
            {foto ? (
                <img
                    src={foto}
                    alt=""
                    className="w-full h-full object-cover"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        if (e.target.nextSibling) {
                            e.target.nextSibling.classList.remove('hidden');
                            e.target.nextSibling.classList.add('flex');
                        }
                    }}
                />
            ) : null}
            <div className={`absolute inset-0 items-center justify-center text-white font-bold ${sub ? 'text-lg' : 'text-2xl'} ${color} ${foto ? 'hidden' : 'flex'}`}>
                {nama && nama !== "-" ? nama.charAt(0) : "?"}
            </div>
        </div>
        <span className={`font-bold text-gray-800 text-center leading-tight ${sub ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'}`}>
            {nama}
        </span>
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-green-600 font-bold mt-1 text-center bg-green-50 px-2 py-1 rounded-md">
            {jabatan}
        </span>
    </motion.div>
);

export default StructureCard;
