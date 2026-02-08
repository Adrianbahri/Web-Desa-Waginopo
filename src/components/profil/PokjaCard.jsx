import React from 'react';

const PokjaCard = ({ pokja }) => (
    <div className="bg-white p-5 rounded-2xl border border-teal-100 shadow-sm hover:shadow-md transition-all h-full">
        <div className="text-center mb-4">
            <h4 className="text-xl font-black text-teal-800 border-b-2 border-teal-500 inline-block pb-1">
                POKJA {pokja.id}
            </h4>
        </div>
        <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-500 font-bold">Ketua</span>
                <span className="font-semibold text-gray-800 text-right text-xs md:text-sm">{pokja.ketua}</span>
            </div>
            <div className="flex justify-between border-b border-gray-100 pb-1">
                <span className="text-gray-500 font-bold">Sekretaris</span>
                <span className="font-semibold text-gray-800 text-right text-xs md:text-sm">{pokja.sekretaris}</span>
            </div>
        </div>
    </div>
);

export default PokjaCard;
