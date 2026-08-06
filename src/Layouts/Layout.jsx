import React from 'react';
import Navbar from '../Components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../Components/Footer';
import { useTheme } from '../Components/Context/ThemeContext';

const Layout = () => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`flex flex-col min-h-screen transition-colors duration-300 ${
            isDarkMode 
                ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-gray-100' 
                : 'bg-gradient-to-br from-purple-50 via-white to-purple-50 text-gray-900'
        }`}>
            <header className=' w-10/12 mx-auto mt-14'>
                <Navbar />
            </header>
            <main className=''>
                <Outlet />
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default Layout;