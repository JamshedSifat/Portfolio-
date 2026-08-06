import React from 'react';
import { useTheme } from '../Components/Context/ThemeContext';
import Marquee from 'react-fast-marquee';

const Skills = () => {
    const { isDarkMode } = useTheme();

    const skills = [
        { 
            name: 'HTML5', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
        },
        { 
            name: 'CSS3', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
        },
        { 
            name: 'Tailwind CSS', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg',
        },
        { 
            name: 'JavaScript', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
        },
        { 
            name: 'React', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
        },
        { 
            name: 'Node.js', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
        },
        { 
            name: 'Express.js', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg',
        },
        { 
            name: 'MongoDB', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg',
        },
        { 
            name: 'Git', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
        },
        { 
            name: 'GitHub', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg',
        },
        { 
            name: 'Firebase', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg',
        },
        { 
            name: 'VS Code', 
            icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg',
        }
    ];

    return (
        <div id="skills" className={`min-h-screen py-20 px-4 relative overflow-hidden ${
            isDarkMode ? 'bg-gray-900' : 'bg-white'
        }`}>
            {/* Animated Water Wave Background */}
           

            {/* Content Container */}
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-16 space-y-4 animate-fade-in">
                    <div className="inline-block">
                        <div className="relative">
                            <div className={`absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-lg blur opacity-30 transition duration-1000`}></div>
                            <h1 className={`relative text-5xl md:text-6xl lg:text-7xl font-bold ${
                                isDarkMode ? 'text-white' : 'text-gray-900'
                            }`}>
                                Technology I Work{' '}
                                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 bg-clip-text text-transparent">
                                    With
                                </span>
                            </h1>
                        </div>
                    </div>
                    
                    <p className={`text-xl md:text-2xl ${
                        isDarkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                        Modern Tools to Build{' '}
                        <span className={`font-semibold ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                            Amazing Experiences
                        </span>
                    </p>
                </div>

                {/* Skills Marquee */}
               <div className="relative animate-fade-in-delay py-8">
    <Marquee
        gradient={false}
        speed={50}
        pauseOnHover={true}
        className="py-4"
    >
        {skills.map((skill, index) => (
            <div key={index} className="mx-3">
                {/* Card */}
                <div className="relative p-6 rounded-2xl bg-black">
                    <div className="flex flex-col items-center gap-3 w-28">
                        {/* Icon */}
                        <div className="w-20 h-20 p-3 rounded-xl flex items-center justify-center bg-gray-900">
                            <img 
                                src={skill.icon} 
                                alt={skill.name}
                                className={`w-full h-full object-contain ${
                                    (skill.name === 'Express.js' || skill.name === 'GitHub') ? 'invert' : ''
                                }`}
                            />
                        </div>

                        {/* Skill Name */}
                        <h3 className="text-center font-bold text-sm text-white">
                            {skill.name}
                        </h3>
                    </div>
                </div>
            </div>
        ))}
    </Marquee>
</div>

              
                  
               
            </div>
        </div>
    );
};

export default Skills;