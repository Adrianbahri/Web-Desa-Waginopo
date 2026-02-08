import React from 'react';

const NewsSkeleton = ({ count = 3 }) => {
    return (
        <>
            {Array.from({ length: count }).map((_, index) => (
                <div
                    key={index}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 animate-pulse"
                >
                    <div className="h-64 bg-gray-200"></div>
                    <div className="p-8">
                        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
                        <div className="space-y-2 mb-8">
                            <div className="h-3 bg-gray-200 rounded w-full"></div>
                            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                            <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                        </div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 pt-6 mt-auto"></div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default NewsSkeleton;
