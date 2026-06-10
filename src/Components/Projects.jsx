import React, { useState } from 'react';
import { useTheme } from '../Components/Context/ThemeContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [activeIndex, setActiveIndex] = useState(0);

    const projects = [
        {
            id: 1,
            title: 'E-Commerce Platform',
            description: 'Full-stack online shopping platform with payment integration and real-time inventory management.',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
            technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
            category: 'Full Stack',
            liveLink: '#',
            githubLink: '#',
            color: 'from-purple-500 to-pink-500'
        },
        {
            id: 2,
            title: 'Task Management App',
            description: 'Collaborative project management tool with drag-and-drop functionality and team chat.',
            image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
            technologies: ['React', 'Firebase', 'Tailwind CSS'],
            category: 'Frontend',
            liveLink: '#',
            githubLink: '#',
            color: 'from-blue-500 to-cyan-500'
        },
        {
            id: 3,
            title: 'Portfolio Website',
            description: 'Modern, responsive portfolio website with dark mode and smooth animations.',
            image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
            technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
            category: 'Frontend',
            liveLink: '#',
            githubLink: '#',
            color: 'from-green-500 to-emerald-500'
        },
        {
            id: 4,
            title: 'Weather Dashboard',
            description: 'Real-time weather tracking application with interactive maps and forecasts.',
            image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
            technologies: ['React', 'OpenWeather API', 'Chart.js'],
            category: 'Frontend',
            liveLink: '#',
            githubLink: '#',
            color: 'from-orange-500 to-red-500'
        },
        {
            id: 5,
            title: 'Social Media API',
            description: 'RESTful API for social media platform with authentication and real-time updates.',
            image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
            technologies: ['Node.js', 'Express', 'MongoDB', 'Socket.io'],
            category: 'Backend',
            liveLink: '#',
            githubLink: '#',
            color: 'from-pink-500 to-rose-500'
        },
        {
            id: 6,
            title: 'Blog CMS',
            description: 'Content management system for blogs with markdown support and SEO optimization.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
            technologies: ['React', 'Node.js', 'PostgreSQL'],
            category: 'Full Stack',
            liveLink: '#',
            githubLink: '#',
            color: 'from-indigo-500 to-purple-500'
        }
    ];

    return (
        <div className={`min-h-screen px-4 pb-20 relative overflow-hidden ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
         

            {/* Content Container */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 animate-fade-in">
                    <div className="inline-block">
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-30"></div>
                            <h1 className={`relative text-5xl md:text-6xl lg:text-7xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                My{' '}
                                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                    Projects
                                </span>
                            </h1>
                        </div>
                    </div>
                    
                    <p className={`text-xl md:text-2xl ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Check out my{' '}
                        <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                            latest work
                        </span>
                    </p>

                    {/* Project Counter */}
                    <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${
                        isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                    } backdrop-blur-sm shadow-lg`}>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                            {projects.length}
                        </span>
                        <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Projects Completed
                        </span>
                    </div>
                </div>

                {/* Swiper Carousel */}
                <div className="animate-fade-in-delay">
                    <Swiper
                        effect={'coverflow'}
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: false,
                        }}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        navigation={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                        }}
                        modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                        className="project-swiper"
                    >
                        {projects.map((project, index) => (
                            <SwiperSlide key={project.id}>
                                <div className="relative group">
                                    {/* 4-Color Rotating Border */}
                                    <div className={`absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-pink-600 via-blue-600 to-cyan-600 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-500 ${
                                        activeIndex === index ? 'animate-gradient-rotate' : ''
                                    }`}></div>
                                    
                                    {/* Project Card */}
                                    <div className={`relative rounded-3xl overflow-hidden ${
                                        isDarkMode ? 'bg-gray-800' : 'bg-white'
                                    } shadow-2xl transition-all duration-500 transform group-hover:scale-105`}>
                                        {/* Project Image */}
                                        <div className="relative h-64 overflow-hidden">
                                            <img 
                                                src={project.image} 
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                            {/* Gradient Overlay */}
                                            <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`}></div>
                                            
                                            {/* Category Badge */}
                                            <div className="absolute top-4 right-4">
                                                <span className={`px-4 py-2 rounded-full text-xs font-bold backdrop-blur-sm ${
                                                    isDarkMode ? 'bg-white/20 text-white' : 'bg-black/20 text-white'
                                                }`}>
                                                    {project.category}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Project Content */}
                                        <div className="p-6 space-y-4">
                                            {/* Title */}
                                            <h3 className={`text-2xl font-bold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {project.title}
                                            </h3>

                                            {/* Description */}
                                            <p className={`text-sm ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {project.description}
                                            </p>

                                            {/* Technologies */}
                                            <div className="flex flex-wrap gap-2">
                                                {project.technologies.map((tech, i) => (
                                                    <span 
                                                        key={i}
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                            isDarkMode 
                                                                ? 'bg-gray-700 text-purple-400' 
                                                                : 'bg-purple-100 text-purple-600'
                                                        }`}
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex gap-4 pt-4">
                                                {/* Live Demo Button */}
                                                <div className="relative group/btn flex-1">
                                                    <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-full blur opacity-75 group-hover/btn:opacity-100 transition duration-300`}></div>
                                                    <a 
                                                        href={project.liveLink}
                                                        className={`relative flex items-center justify-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 ${
                                                            isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
                                                        } hover:scale-105 transform`}
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                        Live Demo
                                                    </a>
                                                </div>

                                                {/* GitHub Button */}
                                                <a 
                                                    href={project.githubLink}
                                                    className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 hover:scale-110 ${
                                                        isDarkMode 
                                                            ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                                            : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                                                    }`}
                                                >
                                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

             
            </div>
        </div>
    );
};

export default Projects;