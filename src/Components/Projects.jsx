import React, { useState, useRef } from 'react';
import { useTheme } from '../Components/Context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Projects = () => {
    const { isDarkMode } = useTheme();
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [showAll, setShowAll] = useState(false);
    const containerRef = useRef(null);

    const allProjects = [
        {
    id: 1,
    title: 'Event Management Platform',
    description: 'A modern event management frontend application featuring separate client and admin dashboards. Users can explore and book events, while administrators can efficiently manage events, bookings, and platform content through a responsive interface.',
    image: 'https://i.pinimg.com/736x/54/4e/54/544e541619bcd1839079c733d61f6471.jpg',
    technologies: [
        'React',
        'JavaScript',
        'Tailwind CSS',
        'Firebase',
        'React Router',
        'Axios'
    ],
    category: 'Frontend',
    liveLink: 'https://anata-events-jet.vercel.app/',
    githubLink: 'https://github.com/JamshedSifat',
    color: 'from-purple-500 to-pink-500',
    gradient: 'purple',
    stats: {
        dashboards: '1',
        responsive: '100%'
    }
},
        {
    id: 2,
    title: 'Smart Healthcare System',
    description: 'A healthcare management web application that enables patients to book doctor appointments, receive medicine reminders, and access essential healthcare services through an intuitive and user-friendly interface.',
    image: 'https://i.pinimg.com/736x/09/21/f2/0921f244ca8cbe7bd5b92175f3a2d833.jpg',
    technologies: [
        'Python',
        'Django',
        'HTML',
        'CSS',
        'Bootstrap',
        'SQLite'
    ],
    category: 'Full Stack',
    liveLink: 'https://smarthealthcaresystems.onrender.com/',
    githubLink: 'https://github.com/JamshedSifat',
    color: 'from-blue-500 to-cyan-500',
    gradient: 'blue',
    stats: {
        modules: '5+',
        features: '6+'
    }
},
        // {
        //     id: 3,
        //     title: 'Portfolio Website',
        //     description: 'Modern, responsive portfolio website with dark mode and smooth animations.',
        //     image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
        //     technologies: ['React', 'Tailwind CSS', 'Framer Motion'],
        //     category: 'Frontend',
        //     liveLink: '#',
        //     githubLink: '#',
        //     color: 'from-green-500 to-emerald-500',
        //     gradient: 'green',
        //     stats: { views: '15K+', projects: '12' }
        // },
        // {
        //     id: 4,
        //     title: 'Weather Dashboard',
        //     description: 'Real-time weather tracking application with interactive maps and forecasts.',
        //     image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&q=80',
        //     technologies: ['React', 'OpenWeather API', 'Chart.js'],
        //     category: 'Frontend',
        //     liveLink: '#',
        //     githubLink: '#',
        //     color: 'from-orange-500 to-red-500',
        //     gradient: 'orange',
        //     stats: { locations: '100+', accuracy: '98%' }
        // },
     
    ];

    // Show only 6 projects initially, all when showAll is true
    const projects = showAll ? allProjects : allProjects.slice(0, 6);

    const getGradientColor = (gradient) => {
        const gradients = {
            purple: 'from-purple-500/20 via-pink-500/20 to-purple-500/20',
            blue: 'from-blue-500/20 via-cyan-500/20 to-blue-500/20',
            green: 'from-green-500/20 via-emerald-500/20 to-green-500/20',
            orange: 'from-orange-500/20 via-red-500/20 to-orange-500/20',
            pink: 'from-pink-500/20 via-rose-500/20 to-pink-500/20',
            indigo: 'from-indigo-500/20 via-purple-500/20 to-indigo-500/20',
            red: 'from-red-500/20 via-yellow-500/20 to-red-500/20',
            yellow: 'from-yellow-500/20 via-orange-500/20 to-yellow-500/20',
            teal: 'from-teal-500/20 via-cyan-500/20 to-teal-500/20',
        };
        return gradients[gradient] || gradients.purple;
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.3,
            },
        },
    };

    const cardVariants = {
        hidden: { 
            opacity: 0, 
            y: 50,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
        exit: {
            opacity: 0,
            y: -50,
            scale: 0.9,
            transition: {
                duration: 0.3,
            },
        },
    };

    const handleViewAll = () => {
        setShowAll(true);
        // Scroll to top of projects section after a brief delay
        setTimeout(() => {
            if (containerRef.current) {
                containerRef.current.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        }, 100);
    };

    const handleShowLess = () => {
        setShowAll(false);
    };

    return (
        <div id="projects" className={`min-h-screen px-4 md:px-8 py-12 md:py-20 relative overflow-hidden ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br ${getGradientColor('purple')} rounded-full blur-3xl opacity-20 animate-blob`}></div>
                <div className={`absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl ${getGradientColor('blue')} rounded-full blur-3xl opacity-20 animate-blob animation-delay-2000`}></div>
            </div>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-6"
                >
                    {/* Top Decorative Line */}
                    <div className="flex items-center justify-center gap-4">
                        <div className={`h-px w-16 bg-gradient-to-r from-transparent ${
                            isDarkMode ? 'to-purple-500' : 'to-purple-400'
                        }`}></div>
                        <span className={`text-sm font-semibold uppercase tracking-wider ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                            Portfolio
                        </span>
                        <div className={`h-px w-16 bg-gradient-to-l from-transparent ${
                            isDarkMode ? 'to-purple-500' : 'to-purple-400'
                        }`}></div>
                    </div>

                    <div className="relative">
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Featured{' '}
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h1>
                        
                        {/* Glowing underline */}
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-md mt-1"></div>
                        </div>
                    </div>

                    <p className={`text-lg md:text-xl max-w-2xl mx-auto ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        {showAll 
                            ? `Exploring all ${allProjects.length} innovative projects through modern technology` 
                            : `Exploring innovative solutions through modern technology and creative design`}
                    </p>

                    {/* Stats Counter */}
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex justify-center gap-8 md:gap-12 pt-4 flex-wrap"
                    >
                        <div className="text-center">
                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent`}>
                                {allProjects.length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Projects</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent`}>
                                {allProjects.filter(p => p.category === 'Frontend').length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Frontend</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent`}>
                                {allProjects.filter(p => p.category === 'Full Stack').length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Full Stack</div>
                        </div>
                        <div className="text-center">
                            <div className={`text-2xl md:text-3xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent`}>
                                {allProjects.filter(p => p.category === 'Backend' || p.category === 'AI/ML' || p.category === 'Blockchain' || p.category === 'Mobile').length}
                            </div>
                            <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Other</div>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Projects Grid */}
                <motion.div 
                    ref={containerRef}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
                >
                    <AnimatePresence mode="wait">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                variants={cardVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                layout
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                                className="relative"
                            >
                                {/* Glowing Border Effect */}
                                <div className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl blur-xl transition-all duration-500 ${
                                    hoveredIndex === index ? 'opacity-75 scale-105' : 'opacity-0 scale-100'
                                }`}></div>

                                {/* Card */}
                                <div className={`relative rounded-2xl overflow-hidden backdrop-blur-sm transition-all duration-500 ${
                                    isDarkMode 
                                        ? 'bg-gray-800/90 hover:bg-gray-800/95' 
                                        : 'bg-white/90 hover:bg-white/95'
                                } shadow-2xl hover:shadow-3xl transform hover:-translate-y-2`}>
                                    
                                    {/* Image Container */}
                                    <div className="relative h-56 overflow-hidden">
                                        <img 
                                            src={project.image} 
                                            alt={project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                                        />
                                        
                                        {/* Gradient Overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-40`}></div>
                                        
                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-md ${
                                                isDarkMode 
                                                    ? 'bg-black/50 text-white' 
                                                    : 'bg-white/90 text-gray-900'
                                            } shadow-lg`}>
                                                {project.category}
                                            </span>
                                        </div>

                                        {/* Gradient Blob Animation */}
                                        <div className={`absolute -bottom-12 -right-12 w-32 h-32 bg-gradient-to-r ${project.color} rounded-full blur-2xl opacity-20 animate-pulse`}></div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        <div className="flex items-start justify-between">
                                            <h3 className={`text-xl font-bold ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {project.title}
                                            </h3>
                                            <div className="flex gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <svg key={i} className={`w-4 h-4 ${
                                                        i < 5 ? 'text-yellow-400' : 'text-gray-300'
                                                    }`} fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>

                                        <p className={`text-sm line-clamp-2 ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {project.description}
                                        </p>

                                        {/* Technologies */}
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.technologies.slice(0, 3).map((tech, i) => (
                                                <span 
                                                    key={i}
                                                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                                                        isDarkMode 
                                                            ? 'bg-gray-700/80 text-purple-400 hover:bg-gray-700' 
                                                            : 'bg-purple-100/80 text-purple-600 hover:bg-purple-100'
                                                    }`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {project.technologies.length > 3 && (
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                                                    isDarkMode 
                                                        ? 'bg-gray-700/80 text-gray-400' 
                                                        : 'bg-gray-100/80 text-gray-600'
                                                }`}>
                                                    +{project.technologies.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stats */}
                                        <div className="flex justify-between pt-3 border-t border-gray-200/20">
                                            {Object.entries(project.stats).slice(0, 2).map(([key, value]) => (
                                                <div key={key} className="text-center">
                                                    <div className={`text-sm font-bold ${
                                                        isDarkMode ? 'text-white' : 'text-gray-900'
                                                    }`}>
                                                        {value}
                                                    </div>
                                                    <div className={`text-xs capitalize ${
                                                        isDarkMode ? 'text-gray-500' : 'text-gray-400'
                                                    }`}>
                                                        {key}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-3 pt-2">
                                            <a 
                                                href={project.liveLink}
                                                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                                                    isDarkMode 
                                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/25' 
                                                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-lg hover:shadow-purple-500/30'
                                                }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Live Demo
                                            </a>
                                            <a 
                                                href={project.githubLink}
                                                className={`flex items-center justify-center w-11 h-11 rounded-full transition-all duration-300 transform hover:scale-110 ${
                                                    isDarkMode 
                                                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                                                        : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                                                }`}
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* View All / Show Less Button */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-center mt-16"
                >
                    {!showAll ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleViewAll}
                            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-xl hover:shadow-purple-500/20' 
                                    : 'bg-white text-gray-900 hover:bg-gray-50 hover:shadow-xl hover:shadow-purple-500/20'
                            } shadow-lg group`}
                        >
                            <span>View All {allProjects.length} Projects</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </motion.button>
                    ) : (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleShowLess}
                            className={`inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gray-800 text-white hover:bg-gray-700 hover:shadow-xl hover:shadow-purple-500/20' 
                                    : 'bg-white text-gray-900 hover:bg-gray-50 hover:shadow-xl hover:shadow-purple-500/20'
                            } shadow-lg group`}
                        >
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                            <span>Show Less</span>
                        </motion.button>
                    )}
                </motion.div>

                {/* Progress indicator when showing all */}
                {showAll && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center mt-4"
                    >
                        <span className={`text-sm ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-500'
                        }`}>
                            Showing {projects.length} of {allProjects.length} projects
                        </span>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default Projects;