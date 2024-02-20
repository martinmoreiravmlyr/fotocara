import React, { useEffect, useRef, useState } from 'react';

const CameraComponent = ({ nextStep }) => { // Aceptar nextStep como prop
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          videoRef.current.srcObject = stream;
        })
        .catch((error) => {
          console.error("Error accessing the camera", error);
        });
    }
  }, []);

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const imageSrc = canvas.toDataURL('image/png');
    setCapturedImage(imageSrc);

    nextStep(); // Llamar a nextStep después de capturar la foto
  };

  return (
    <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black'}}>
      <video ref={videoRef} style={{width: '100%', height: '100%', objectFit: 'cover'}} autoPlay></video>
      <img src="images/person.png" alt="Face Outline" className='face-recog' />
      <button onClick={capturePhoto} className="botonfoto poppins-light">
        <span className="material-icons">photo_camera</span>
      </button>
      {capturedImage && <img src={capturedImage} alt="Captured" style={{position: 'absolute', maxWidth: '100%', maxHeight: '100%'}} />}
    </div>
  );
};

export default CameraComponent;
