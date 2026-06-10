import React from 'react';
import Banner from './Banner';
import Skills from './Skills';
import Projects from './Projects';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <div className="">
            <Skills></Skills>
           </div>
           <div className="">
            <Projects></Projects>
           </div>
        </div>
    );
};

export default Home;