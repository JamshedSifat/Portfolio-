import React from 'react';
// import profail from '../assets/profail.png';
import profail from '../assets/Banner.jpeg'
import { useTheme } from '../Components/Context/ThemeContext';

const Banner = () => {
    const { isDarkMode } = useTheme();
    
    return (
        <div className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
            isDarkMode ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900' : 'bg-gradient-to-br from-purple-50 via-white to-blue-50'
        }`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute top-20 left-10 w-72 h-72 rounded-full blur-3xl opacity-20 animate-pulse ${
                    isDarkMode ? 'bg-purple-500' : 'bg-purple-300'
                }`}></div>
                <div className={`absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse animation-delay-2000 ${
                    isDarkMode ? 'bg-blue-500' : 'bg-blue-300'
                }`}></div>
                <div className={`absolute top-1/2 left-1/2 w-64 h-64 rounded-full blur-3xl opacity-10 animate-pulse animation-delay-4000 ${
                    isDarkMode ? 'bg-pink-500' : 'bg-pink-300'
                }`}></div>
            </div>

            {/* Main Content */}
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 w-11/12 lg:w-10/12 xl:w-9/12 mx-auto items-center relative z-10'>
                {/* Left Side - Text Content */}
                <div className="left-side space-y-6 order-2 lg:order-1 text-center lg:text-left">
                    {/* Greeting with Animation */}
                    <div className="space-y-4">
                        <div className="inline-block animate-wave">
                            <span className="text-5xl">👋</span>
                        </div>
                        
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight animate-fade-in ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Hi, I'm{' '}
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent animate-gradient">
                                Jamshed
                            </span>
                        </h1>
                        
                        <h4 className={`text-xl md:text-2xl lg:text-3xl font-medium animate-fade-in-delay ${
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
                    <p className={`text-base md:text-lg max-w-xl mx-auto lg:mx-0 animate-fade-in-delay-2 ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Full-stack developer passionate about creating beautiful, functional, and user-friendly web experiences.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-delay-3">
                        <button className={`group relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-2xl hover:shadow-purple-500/50' 
                                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:shadow-2xl hover:shadow-purple-400/50'
                        } hover:scale-105 transform`}>
                            <span className="relative z-10">View My Work</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>
                        
                        <button className={`px-8 py-4 rounded-full font-semibold text-lg border-2 transition-all duration-300 hover:scale-105 transform ${
                            isDarkMode 
                                ? 'border-purple-500 text-purple-400 hover:bg-purple-500/10' 
                                : 'border-purple-500 text-purple-600 hover:bg-purple-500/10'
                        }`}>
                            Download CV
                        </button>
                    </div>

                    {/* Stats */}
                    <div className={`grid grid-cols-3 gap-6 pt-8 animate-fade-in-delay-4 ${
                        isDarkMode ? 'border-t border-gray-700' : 'border-t border-gray-200'
                    }`}>
                        <div className="text-center">
                            <div className={`text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                                10+
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Projects
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent`}>
                                1+
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Years Exp
                            </div>
                        </div>
                        <div className="text-center">
                            <div className={`text-3xl font-bold bg-gradient-to-r from-pink-500 to-blue-500 bg-clip-text text-transparent`}>
                                0
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Happy Clients
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Profile Image */}
                <div className="right-side flex justify-center items-center order-1 lg:order-2 animate-float">
                    <div className="relative group">
                        {/* Glowing Border Effect */}
                        <div className={`absolute -inset-1 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 ${
                            isDarkMode 
                                ? 'bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600' 
                                : 'bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400'
                        } animate-spin-slow`}></div>
                        
                        {/* Profile Image Container */}
                        <div className={`relative rounded-full overflow-hidden border-4 ${
                            isDarkMode ? 'border-gray-800' : 'border-white'
                        } shadow-2xl transform group-hover:scale-105 transition-all duration-500`}>
                            <img 
                                src={profail} 
                                alt="Jamshed Profile" 
                                className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 object-cover"
                            />
                            
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        </div>

                        {/* Floating Icons */}
                        <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow">
                            <span className="text-2xl">⚡</span>
                        </div>
                        
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl animate-bounce-slow animation-delay-1000">
                            <span className="text-2xl">🚀</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className={`w-6 h-10 rounded-full border-2 flex justify-center ${
                    isDarkMode ? 'border-gray-600' : 'border-gray-400'
                }`}>
                    <div className={`w-2 h-2 rounded-full mt-2 animate-scroll ${
                        isDarkMode ? 'bg-purple-400' : 'bg-purple-600'
                    }`}></div>
                </div>
            </div>
        </div>
    );
};

export default Banner;