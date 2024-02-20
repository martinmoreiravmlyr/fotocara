import React, { useRef, useEffect } from 'react';

const ScratchCard = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const revealImage = (e) => {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2);
      
      // Configura el desenfoque
      ctx.shadowBlur = 20;
      ctx.shadowColor = 'rgba(0,0,0,1)';

      ctx.fill();

      // Restablecer para evitar efectos indeseados fuera del círculo
      ctx.shadowBlur = 0;
    };

    canvas.addEventListener('mousemove', revealImage);

    return () => canvas.removeEventListener('mousemove', revealImage);
  }, []);

  return (
    <div id="image-wrapper" style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></canvas>
      <img src={imageUrl} alt="Imagen de fondo" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </div>
  );
};

export default ScratchCard;
