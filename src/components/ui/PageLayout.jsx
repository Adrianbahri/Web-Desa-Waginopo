import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';

const PageLayout = ({ children, className = '' }) => {
    return (
        <div className={`min-h-screen font-sans text-gray-900 overflow-x-hidden ${className}`}>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default PageLayout;
