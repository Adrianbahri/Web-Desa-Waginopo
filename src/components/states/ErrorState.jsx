import React from 'react';

const ErrorState = ({
    title = 'Terjadi Kesalahan',
    message,
    className = ''
}) => {
    return (
        <div className={`text-center py-20 text-red-500 bg-red-50 rounded-2xl border border-red-100 ${className}`}>
            <div className="text-4xl mb-4">⚠️</div>
            <p className="font-bold text-xl">{title}</p>
            {message && <p className="text-sm mt-2 opacity-80">{message}</p>}
        </div>
    );
};

export default ErrorState;
