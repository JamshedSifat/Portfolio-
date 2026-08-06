import React from 'react';
import profail from '../assets/Banner.jpg'
import { useTheme } from '../Components/Context/ThemeContext';

const Banner = () => {
    const { isDarkMode } = useTheme();
    
    
    const handleDownloadCV = () => {
        const link = document.createElement('a');
        
       
        link.href = '../../public/jamshedCv.pdf'; 
        link.download = 'Jamshed_Sifat_CV.pdf';
        
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
    };
    
    return (
        <div id="home" className={`min-h-screen flex items-center justify-center relative overflow-hidden px-4 sm:px-6 lg:px-8 ${
            isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
        }`}>
            {/* Animated Background Elements - Responsive sizes */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-10 sm:top-20 left-5 sm:left-10 w-48 sm:w-72 h-48 sm:h-72 rounded-full blur-2xl sm:blur-3xl opacity-20 animate-pulse ${
                    isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
                }`}></div>
                <div className={`absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-56 sm:w-96 h-56 sm:h-96 rounded-full blur-2xl sm:blur-3xl opacity-20 animate-pulse animation-delay-2000 ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
                }`}></div>
                <div className={`absolute top-1/2 left-1/2 w-48 sm:w-64 h-48 sm:h-64 rounded-full blur-2xl sm:blur-3xl opacity-10 animate-pulse animation-delay-4000 ${
                    isDarkMode ? 'bg-pink-500' : 'bg-pink-300'
                }`}></div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 w-full max-w-7xl mx-auto items-center relative z-10 py-8 sm:py-12'>
                {/* Left Side - Text Content */}
                <div className="left-side space-y-4 sm:space-y-6 order-2 lg:order-1 text-center lg:text-left">
                    {/* Greeting with Animation */}
                    <div className="space-y-3 sm:space-y-4">
                        <div className="inline-block animate-wave">
                            <span className="text-3xl sm:text-4xl md:text-5xl">👋</span>
                        </div>
                        
                        <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight animate-fade-in ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Hi, I'm{' '}
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                                Jamshed
                            </span>
                        </h1>
                        
                        <h4 className={`text-base sm:text-xl md:text-2xl lg:text-3xl font-medium animate-fade-in-delay ${
                            isDarkMode ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                            Turning{' '}
                            <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                                Ideas
                            </span>{' '}
                            into{' '}
                            <span className={`font-semibold ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                                Modern Web Apps
                            </span>
                        </h4>
                    </div>

                    {/* Description */}
                    <p className={`text-sm sm:text-base md:text-lg max-w-xl mx-auto lg:mx-0 animate-fade-in-delay-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Full-stack developer passionate about creating beautiful, functional, and user-friendly web experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col xs:flex-row gap-3 sm:gap-4 justify-center lg:justify-start animate-fade-in-delay-3">
                        <a href="#projects" className={`group relative px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg overflow-hidden transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-purple-500/50' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-400/50'
                        } hover:scale-105 transform w-full xs:w-auto text-center`}>
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                        
                        {/* Download CV Button - Functional */}
                        <button 
                            onClick={handleDownloadCV}
                            className={`px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-sm sm:text-base lg:text-lg border-2 transition-all duration-300 hover:scale-105 transform w-full xs:w-auto ${
                                isDarkMode 
                                    ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20' 
                                    : 'border-purple-500 text-purple-600 hover:bg-purple-500/10 hover:shadow-lg hover:shadow-purple-500/20'
                            }`}>
                            Download CV
                        </button>
                    </div>

                    {/* Stats - Responsive */}
                    <div className={`grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 animate-fade-in-delay-4 ${
                        isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
                    }`}>
                        <div className="text-center">
                            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                                10+
                            </div>
                            <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Projects
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                                1+
                            </div>
                            <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Years Exp
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent`}>
                                0
                            </div>
                            <div className={`text-xs sm:text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Happy Clients
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Profile Image - Increased padding for all devices */}
                <div className="right-side flex justify-center items-center order-1 lg:order-2 animate-float 
                    pt-12 pb-6 
                    xs:pt-14 xs:pb-8 
                    sm:pt-16 sm:pb-10 
                    md:pt-20 md:pb-12 
                    lg:pt-24 lg:pb-16 
                    xl:pt-28 xl:pb-20">
                    <div className="relative group">
                        {/* Glowing Border Effect */}
                        <div className={`absolute -inset-1 rounded-full blur-xl sm:blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600' 
                                : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400'
                        } animate-spin-slow`}></div>
                        
                        {/* Profile Image Container - Responsive sizes with extra margin bottom */}
                        <div className={`relative rounded-full overflow-hidden border-4 ${
                            isDarkMode ? 'border-gray-800' : 'border-white'
                        } shadow-2xl transform group-hover:scale-105 transition-all duration-500
                        mb-10 
                        xs:mb-12 
                        sm:mb-14 
                        md:mb-16 
                        lg:mb-20 
                        xl:mb-24`}>
                            <img 
                                src={profail} 
                                alt="Jamshed Profile" 
                                className="w-40 h-40 xs:w-48 xs:h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-cover"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Floating Icons - Responsive */}
                        <div className="absolute -top-2 -right-2 xs:-top-3 xs:-right-3 sm:-top-4 sm:-right-4 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                            <span className="text-lg xs:text-xl sm:text-2xl">⚡</span>
                        </div>
                        
                        <div className="absolute -bottom-2 -left-2 xs:-bottom-3 xs:-left-3 sm:-bottom-4 sm:-left-4 w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow animation-delay-1000">
                            <span className="text-lg xs:text-xl sm:text-2xl">🚀</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator - Hidden on very small screens */}
            <div className="hidden xs:block absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className={`w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 flex justify-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-400'
                }`}>
                    <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mt-2 animate-scroll ${
                        isDarkMode ? 'bg-purple-400' : 'bg-purple-600'
                    }`}></div>
                </div>
            </div>
        </div>
    );
};

export default Banner;