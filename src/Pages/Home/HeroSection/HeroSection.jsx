import React from "react";
import { FaCirclePlay } from "react-icons/fa6";
import heroImg from '../../../assets/hero-img.png'

const HeroSection = () => {
  return (
    <div className="flex flex-col-reverse sm:flex-row justify-around items-center bg-[#49BBBD] p-6">
      <div className="text-center sm:text-left">
        <h1 className="text-[54px] font-bold text-white mb-[30px]">
          <span className="text-[#F48C06]">Studying</span> Online is now <br />
          much easier
        </h1>
        <p className="text-2xl text-white mb-[30px]">
          E-School is an interesting platform that will teach <br /> you in a more interactive way
        </p>
        <div className="flex flex-col sm:flex-row items-center">
          <button className="btn btn-primary mr-5 mb-3 sm:mb-0">Join For Free</button>
          <a href="https://youtu.be/bf2tFixliMA" target="_blank" rel="noopener noreferrer" className="flex items-center ml-0  text-white">
            <FaCirclePlay className="h-[30px] w-[30px] mr-2" />
            <span>Watch how it works</span>
          </a>
        </div>
      </div>
      <div>
        <img className="w-full sm:w-auto max-h-[500px] sm:max-h-[800px] sm:relative sm:-bottom-6.5" src={heroImg} alt="Hero" />
      </div>
    </div>
  );
};

export default HeroSection;
