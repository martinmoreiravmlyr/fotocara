import React from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../json/lottie.json";



const LogoLoader = () => {
  return (
    <div id='loadercontainer'>
        <Lottie animationData={groovyWalkAnimation} loop={true} />
    </div>    
  );
};

export default LogoLoader;
