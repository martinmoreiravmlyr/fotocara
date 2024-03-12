import React, { useRef, useEffect } from 'react';

const ScratchCard = ({ imageUrl }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    canvas.width = rect.width;
    canvas.height = rect.height;

    const image = new Image();
    image.src = imageUrl;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      coverWithBlackLayer();
    };

    const coverWithBlackLayer = () => {
      // Cubrir la imagen con una capa negra completa
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    };

    const redraw = (mouseX = null, mouseY = null) => {
      // Redibuja la imagen de fondo y la capa negra
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      coverWithBlackLayer();

      if (mouseX !== null && mouseY !== null) {
        // Crear el efecto de "ver a través" usando un círculo transparente
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 50, 0, Math.PI * 2, true);
        ctx.fill();

        // Restablecer la operación de composición para futuros dibujos
        ctx.globalCompositeOperation = 'source-over';
      }
    };

    const handleMouseMove = (e) => {
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      redraw(mouseX, mouseY);
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', coverWithBlackLayer); // Restablece la capa negra cuando el mouse sale del canvas

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', coverWithBlackLayer);
    };
  }, [imageUrl]);

  return (
    <div id="image-wrapper" style={{ position: 'relative', width: '100%', height: '100%' }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}></canvas>
    </div>
  );
};

export default ScratchCard;
