import React from 'react';
import Banner from './Banner';
import Skills from './Skills';
import Projects from './Projects';
import About from './About';

const Home = () => {
    return (
        <div>
            <Banner />
            <About />
            <Skills />
            <Projects />
        </div>
    );
};

export default Home;