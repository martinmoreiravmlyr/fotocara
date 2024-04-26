import React, { useState } from 'react';
import './App.css';
import CameraComponent from './components/CameraComponent';
import LogoLoader from './components/LogoLoader';
import ImageShow from './components/ImageShow';
import IntroComponent from './components/IntroComponent';
import SocioComponent from './components/SocioComponent';
import HeaderComponent from './components/HeaderComponent';
import TermsAndConditions from './components/TermsAndConditions'; // Importa el nuevo componente de políticas de privacidad
import { FormProvider } from './components/providers/FormContext';
import PasswordLayer from './components/PasswordLayer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';


function App() {
  const [type, setType] = useState('password'); // Comienza con el componente de introducción
  const [showCamera, setShowCamera] = useState(false); // Nuevo estado para controlar la visibilidad de CameraComponent
  const [loading, setLoading] = useState(false); // Nuevo estado para controlar la visibilidad de LogoLoader
  const [capturedImage, setCapturedImage] = useState(null);
  const [lastAction, setLastAction] = useState('');

  // Función para deshabilitar el click derecho
  // useEffect(() => {
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
      <Router> {/* Agrega el componente Router */}
        <div>
          <HeaderComponent />
          {loading && <LogoLoader />}
          <div>
          <Routes>
            <Route path="/politicas-de-privacidad" element={<TermsAndConditions />} />
            <Route path="/" element={
              <div>
                {type === 'password' && <PasswordLayer setType={setType} />}
                {type === 'intro' && <IntroComponent nextStep={nextStep} />}
                {type === 'socio' && <SocioComponent nextStep={nextStep} toggleCamera={toggleCamera} capturedImage={capturedImage} setLastAction={setLastAction} lastAction={lastAction} setLoading={setLoading} />}
                {showCamera && <CameraComponent toggleCamera={toggleCamera} setCapturedImage={setCapturedImage} setLastAction={setLastAction} />}
                {type === 'step1' && <div><ImageShow setType={setType}/></div>}
                {type === 'error' && 
                  <div className="error">
                    <h1>Algo salio mal.</h1>
                    <button onClick={() => setType('intro')} className="next poppins-light">Reiniciar</button>
                  </div>}
                <Link to="/politicas-de-privacidad">Políticas de Privacidad</Link>
              </div>
            } />
          </Routes>
          </div>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;