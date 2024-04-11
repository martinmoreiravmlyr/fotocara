import React, { useEffect, useRef } from 'react';

const CameraComponent = ({ toggleCamera, setCapturedImage, setLastAction }) => {
  const videoRef = useRef(null);
  const streamRef = useRef(null); // Ref to hold the stream

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Request the highest possible resolution and front-facing camera
      navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 768 },
          height: { ideal: 768 },
          facingMode: "user"
        }
      })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        streamRef.current = stream; // Store the stream for later use
      })
      .catch((error) => {
        console.error("Error accessing the camera", error);
      });
    }

    // Cleanup function to stop the camera when the component unmounts
    return () => stopCamera(); // Cleanup
  }, []);

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  const capturePhoto = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const context = canvas.getContext('2d');
    context.imageSmoothingQuality = 'high'; // Ensure high-quality image smoothing
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
    // Adjust JPEG quality to balance quality and file size
    const imageQuality = 0.7; // Start with 0.7 and adjust as needed
    const imageSrc = canvas.toDataURL('image/jpeg', imageQuality);
    setCapturedImage(imageSrc);
    setLastAction('camera');
  
    setTimeout(() => {
      toggleCamera();
      stopCamera();
    }, 500);
};
  
  
  return (
    <div>
      <div style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'black', zIndex: 1}}>
        <video ref={videoRef} style={{width: '100%', height: '100%', objectFit: 'cover'}} autoPlay></video>
        <img src="images/person.png" alt="Face Outline" className='face-recog' />
        <button onClick={capturePhoto} className="botonfoto poppins-light">
          <span className="material-icons">photo_camera</span>
        </button>
      </div>
    </div>
  );
};

export default CameraComponent;
