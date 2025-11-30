import React from 'react';

import PopularCard from './PopularCard.jsx/PopularCards';
import HeroSection from './HeroSection/HeroSection';
import WhyUS from './WhyUS/WhyUS';
import TopInstructor from './TopInstructor/TopInstructor';

const popularCardPromise = fetch('popularCourseData.json').then(res => res.json())
const instructorPromise = fetch('topInstructor.json').then(res => res.json());

const Home = () => {
    return (
        <div>
            <HeroSection></HeroSection>
            <PopularCard popularCardPromise={popularCardPromise}></PopularCard>
            <WhyUS></WhyUS>
            <TopInstructor instructorPromise={instructorPromise}></TopInstructor>
        </div>
    );
};

export default Home;