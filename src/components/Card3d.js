import React, { useState, useRef } from 'react';

const Card3d = ({ dataImage }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const boundingBox = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left - boundingBox.width / 2) / boundingBox.width;
    const y = (e.clientY - boundingBox.top - boundingBox.height / 2) / boundingBox.height;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const cardStyle = {
    transform: `perspective(1000px) rotateY(${position.x * 20}deg) rotateX(${position.y * -20}deg)`
  };

  const cardBgImage = {
    backgroundImage: `url(${dataImage})`
  };

  return (
    <div 
      className="card-wrap3d" 
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      ref={cardRef}
      style={cardStyle}
    >
      <div className="card3d grayscale">
        <div className="card-bg3d" style={cardBgImage}></div>
        <div className="card-info3d">
          {/* Add slots or children here if needed */}
        </div>
      </div>
    </div>
  );
};

export default Card3d;
