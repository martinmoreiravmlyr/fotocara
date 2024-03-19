import React, { useState, useRef } from 'react';

const Card3d = ({ dataImage }) => {
  const cardRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [shineStyle, setShineStyle] = useState({});


  const handleMouseMove = (e) => {
    const boundingBox = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - boundingBox.left - boundingBox.width / 2) / boundingBox.width;
    const y = (e.clientY - boundingBox.top - boundingBox.height / 2) / boundingBox.height;

    // Actualiza la posición para la rotación 3D
    setPosition({ x, y });

    // Calcula el estilo del brillo basado en la posición del mouse
    const angle = Math.atan2(e.clientY - (boundingBox.top + window.scrollY + boundingBox.height / 2), e.clientX - (boundingBox.left + window.scrollX + boundingBox.width / 2)) * 180 / Math.PI - 90;
    setShineStyle({
      background: `linear-gradient(${angle}deg, rgba(255,255,255,${y + 0.5}) 0%,rgba(255,255,255,0) 80%)`
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setShineStyle({});
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
        <div className="card-shine" style={shineStyle}></div>
        <div className="card-bg3d" style={cardBgImage}></div>
        <div className="card-info3d">
        </div>
      </div>
    </div>
  );
};

export default Card3d;
