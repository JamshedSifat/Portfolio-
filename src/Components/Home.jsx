import React from 'react';
import Hero3D from './Hero3D/Hero3D';
import Skills from './Skills';
import Projects from './Projects';
import About from './About';

const Home = () => {
    return (
        <div>
            <Hero3D />
            <About />
            <Skills />
            <Projects />
        </div>
    );
};

export default Home;
