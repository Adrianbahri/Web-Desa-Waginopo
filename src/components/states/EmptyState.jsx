import React from 'react';

const EmptyState = ({
    icon = '📭',
    title = 'Tidak ada data',
    message = 'Data tidak tersedia saat ini.'
}) => {
    return (
        <div className="text-center py-24 text-gray-400">
            <div className="text-6xl mb-4">{icon}</div>
            <p className="text-2xl font-bold text-gray-600">{title}</p>
            <p className="text-gray-400 mt-2">{message}</p>
        </div>
    );
};

export default EmptyState;
