import React from 'react';

const LoadingState = ({ message = 'Memuat...' }) => {
    return (
        <div className="h-screen flex items-center justify-center font-bold text-gray-600">
            <div className="text-center">
                <div className="w-12 h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default LoadingState;
