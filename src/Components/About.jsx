import React, { useState, useRef } from 'react';
import { useTheme } from '../Components/Context/ThemeContext';
import { motion, useInView } from 'framer-motion';

const About = () => {
    const { isDarkMode } = useTheme();
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const stats = [
        { number: '5+', label: 'Years Experience', icon: '💼' },
        { number: '50+', label: 'Projects Completed', icon: '🚀' },
        { number: '30+', label: 'Happy Clients', icon: '😊' },
        { number: '15+', label: 'Technologies', icon: '⚡' },
    ];
const experiences = [
    {
        year: '2026 - Present',
        title: 'Frontend Developer',
        company: 'Personal & Academic Projects',
        description: 'Developing responsive and user-friendly web applications with a strong focus on clean UI, performance optimization, and modern frontend development practices.',
        technologies: ['React', 'JavaScript', 'Tailwind CSS', 'Firebase'],
    },
    {
        year: '2025 - Present',
        title: 'Frontend Developer',
        company: 'Self-Learning Journey',
        description: 'Continuously improving frontend expertise while gaining practical experience in backend development using the MERN stack through hands-on projects.',
        technologies: ['Node.js', 'Express.js', 'MongoDB', 'JWT'],
    },
    {
        year: '2025 - Present',
        title: 'Web Application Developer',
        company: 'University & Personal Projects',
        description: 'Designed and developed modern web applications by implementing responsive interfaces, integrating APIs, and following best practices for maintainable and scalable code.',
        technologies: ['React', 'Vite', 'Node.js', 'MongoDB'],
    },
];

    const education = [
    {
        year: '2023 - 2027',
        degree: 'B.S. in Computer Science',
        institution: 'University of Asia Pacific',
        description: 'Pursuing a Bachelor of Science in Computer Science and Engineering (CSE), focusing on software development, problem-solving, and modern web technologies.',
    },
    {
        year: '2022',
        degree: 'HSC',
        institution: 'Cumilla Collectorate School & College',
        description: 'Completed Higher Secondary Certificate (HSC) in Science.',
    },
    {
        year: '2020',
        degree: 'SSC',
        institution: 'BrahmanPara Ocean High School',
        description: 'Completed Secondary School Certificate (SSC) in Science.',
    },
];

    const achievements = [
        '🏆 Best Project Award - Tech Conference 2023',
        '📱 Featured App - Apple App Store (2022)',
        '🌟 Open Source Contributor - 15+ Projects',
        '📝 Published Technical Articles - 25+ Blogs',
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
            },
        },
    };

    return (
        <div id="about" ref={sectionRef} className={`min-h-screen px-4 md:px-8 py-12 md:py-20 relative overflow-hidden ${
            isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
        }`}>
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className={`absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-bl from-purple-500/10 via-pink-500/10 to-blue-500/10 rounded-full blur-3xl animate-blob`}></div>
                <div className={`absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-cyan-500/10 via-teal-500/10 to-emerald-500/10 rounded-full blur-3xl animate-blob animation-delay-2000`}></div>
                
                {/* Floating Particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-1 h-1 rounded-full ${
                                isDarkMode ? 'bg-purple-400/30' : 'bg-purple-400/20'
                            }`}
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0.2, 0.8, 0.2],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 4,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 space-y-6"
                >
                    {/* Decorative Line */}
                    <div className="flex items-center justify-center gap-4">
                        <div className={`h-px w-16 bg-gradient-to-r from-transparent ${
                            isDarkMode ? 'to-purple-500' : 'to-purple-400'
                        }`}></div>
                        <span className={`text-sm font-semibold uppercase tracking-wider ${
                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                        }`}>
                            About Me
                        </span>
                        <div className={`h-px w-16 bg-gradient-to-l from-transparent ${
                            isDarkMode ? 'to-purple-500' : 'to-purple-400'
                        }`}></div>
                    </div>

                    <div className="relative">
                        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Passionate{' '}
                            <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                Developer
                            </span>
                        </h1>
                        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full"></div>
                            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-full blur-md mt-1"></div>
                        </div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ delay: 0.3 }}
                        className={`text-lg md:text-xl max-w-3xl mx-auto ${
                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                        }`}
                    >
                       Frontend Developer passionate about building responsive, modern, and
    user-friendly web applications. Skilled in React, JavaScript, Tailwind CSS,
    and Firebase, with foundational knowledge of backend development using the
    MERN stack.
                    </motion.p>
                </motion.div>

              

                {/* Main Content Grid - Two Columns */}
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12">
                    {/* Left Column - Bio & Experience */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Bio Card */}
                    <div className={`p-6 md:p-8 rounded-2xl ${
    isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
} backdrop-blur-sm shadow-xl`}>
    <h2 className={`text-2xl font-bold mb-4 ${
        isDarkMode ? 'text-white' : 'text-gray-900'
    }`}>
        Who I Am
    </h2>

    <div className="space-y-4 text-sm md:text-base">
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            I'm a passionate Frontend Developer with a strong interest in building
            modern, responsive, and user-friendly web applications. I enjoy
            transforming ideas into interactive digital experiences using modern
            frontend technologies.
        </p>

        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
            My primary expertise is React.js, JavaScript, Tailwind CSS, and
            Firebase. I also have foundational knowledge of backend development
            with Node.js, Express.js, and MongoDB, allowing me to build and
            understand full-stack applications while continuously expanding my
            skills.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isDarkMode
                    ? 'bg-purple-500/20 text-purple-400'
                    : 'bg-purple-100 text-purple-600'
            }`}>
                Problem Solver
            </span>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isDarkMode
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'bg-blue-100 text-blue-600'
            }`}>
                Frontend Developer
            </span>

            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isDarkMode
                    ? 'bg-green-500/20 text-green-400'
                    : 'bg-green-100 text-green-600'
            }`}>
                 Continuous Learner
            </span>
        </div>
    </div>
</div>

                        {/* Experience Timeline */}
                        <div className={`p-6 md:p-8 rounded-2xl ${
                            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                        } backdrop-blur-sm shadow-xl`}>
                            <h2 className={`text-2xl font-bold mb-6 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Experience
                            </h2>
                            <div className="space-y-6">
                                {experiences.map((exp, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                        className="relative pl-6 border-l-2 border-purple-500"
                                    >
                                        <div className="absolute w-3 h-3 bg-purple-500 rounded-full -left-[7px] top-1"></div>
                                        <div className={`text-sm font-semibold ${
                                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                                        }`}>
                                            {exp.year}
                                        </div>
                                        <h3 className={`text-lg font-bold ${
                                            isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {exp.title}
                                        </h3>
                                        <div className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {exp.company}
                                        </div>
                                        <p className={`text-sm mt-1 ${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {exp.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {exp.technologies.map((tech, i) => (
                                                <span key={i} className={`px-2 py-0.5 rounded-full text-xs ${
                                                    isDarkMode 
                                                        ? 'bg-gray-700 text-gray-300' 
                                                        : 'bg-gray-200 text-gray-700'
                                                }`}>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column - Education & Achievements */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="space-y-8"
                    >
                        {/* Education */}
                        <div className={`p-6 md:p-8 rounded-2xl ${
                            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                        } backdrop-blur-sm shadow-xl`}>
                            <h2 className={`text-2xl font-bold mb-6 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                🎓 Education
                            </h2>
                            <div className="space-y-4">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                                        transition={{ delay: 0.5 + index * 0.1 }}
                                        className={`p-4 rounded-xl ${
                                            isDarkMode ? 'bg-gray-700/50' : 'bg-gray-100/50'
                                        }`}
                                    >
                                        <div className={`text-sm font-semibold ${
                                            isDarkMode ? 'text-purple-400' : 'text-purple-600'
                                        }`}>
                                            {edu.year}
                                        </div>
                                        <h3 className={`font-bold ${
                                            isDarkMode ? 'text-white' : 'text-gray-900'
                                        }`}>
                                            {edu.degree}
                                        </h3>
                                        <div className={`text-sm ${
                                            isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                        }`}>
                                            {edu.institution}
                                        </div>
                                        <p className={`text-sm mt-1 ${
                                            isDarkMode ? 'text-gray-300' : 'text-gray-700'
                                        }`}>
                                            {edu.description}
                                        </p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                      

                        {/* Tech Stack Summary */}
                        <div className={`p-6 md:p-8 rounded-2xl ${
                            isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
                        } backdrop-blur-sm shadow-xl`}>
                            <h2 className={`text-2xl font-bold mb-4 ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                🚀 Tech Stack
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {['React', 'Node.js', 'Python', 'MongoDB','Express.js', 'Html','Tailwind CSS', 'Framer Motion'].map((tech, index) => (
                                    <motion.span
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                        transition={{ delay: 0.7 + index * 0.05 }}
                                        className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                                            isDarkMode 
                                                ? 'bg-gray-700 text-purple-400 hover:bg-gray-600' 
                                                : 'bg-purple-100 text-purple-600 hover:bg-purple-200'
                                        } transition-colors duration-300`}
                                    >
                                        {tech}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

               
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0px, 0px) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    );
};

export default About;