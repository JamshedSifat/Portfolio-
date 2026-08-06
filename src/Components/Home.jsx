import React from 'react';
import Banner from './Banner';
import Skills from './Skills';
import Projects from './Projects';
import About from './About';

const Home = () => {
    return (
        <div>
           <section id="home">
            <Banner></Banner>
           </section>
           <About></About>
           <div id="skills">
            <Skills></Skills>
           </div>
           <div id='projects'>
            <Projects></Projects>
           </div>
        </div>
    );
};

export default Home;