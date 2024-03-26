import React, { useState } from 'react';
import './App.css';
import CameraComponent from './components/CameraComponent';
import LogoLoader from './components/LogoLoader';
import ColaImagenes from './components/ColaImagenes';
import ImageShow from './components/ImageShow';
import IntroComponent from './components/IntroComponent';
import SocioComponent from './components/SocioComponent';
import HeaderComponent from './components/HeaderComponent';
import { FormProvider } from './components/providers/FormContext';



function App() {
  const [type, setType] = useState('intro'); // Comienza con el componente de introducción
  const [showCamera, setShowCamera] = useState(false); // Nuevo estado para controlar la visibilidad de CameraComponent
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar la visibilidad de LogoLoader
  const [capturedImage, setCapturedImage] = useState(null);
  const [lastAction, setLastAction] = useState('');


  // useEffect(() => {
  //   // Función para deshabilitar el click derecho
  //   const disableRightClick = (event) => event.preventDefault();
  //   // Agregar listener al montar
  //   document.addEventListener('contextmenu', disableRightClick);
  //   // Remover listener al desmontar
  //   return () => document.removeEventListener('contextmenu', disableRightClick);
  // }, []);


  const nextStep = () => {
    setLoading(true); // Muestra el loader al iniciar la transición
    setType((currentType) => {
      switch (currentType) {
        case 'intro':
          return 'socio';
        case 'socio':
          return 'step1';
        case 'step1':
          return 'step2';
        case 'step2':
          return 'step3';
        default:
          setLoading(false); // Asegúrate de ocultar el loader si vuelves al inicio
          return 'intro';
      }
    });
    // Simula la carga de datos o una transición, luego oculta el loader
    setTimeout(() => setLoading(false), 1000); // Este timeout es solo para simular una carga
  };

  const toggleCamera = () => setShowCamera(!showCamera); // Función para mostrar/ocultar la cámara

  return (
    <FormProvider>
      <div>
        <HeaderComponent />
        {loading && <LogoLoader />}
        <div>
          {type === 'intro' && <IntroComponent nextStep={nextStep} />}
          {type === 'socio' && <SocioComponent nextStep={nextStep} toggleCamera={toggleCamera} capturedImage={capturedImage} setLastAction={setLastAction} lastAction={lastAction} />}
          {showCamera && <CameraComponent toggleCamera={toggleCamera} setCapturedImage={setCapturedImage} setLastAction={setLastAction} />}

          {type === 'step1' && (
          <>
            <ColaImagenes nextStep={nextStep}/>
          </>
          )}
          {type === 'step2' && <div>
            <ImageShow setType={setType}/>
          </div>}
          {type === 'error' && 
            <div className="error">
              <h1>Algo salio mal.</h1>
              <button onClick={() => setType('intro')} className="next poppins-light">Reiniciar</button>
            </div>}
        </div>
      </div>
    </FormProvider>
  );
}

export default App;