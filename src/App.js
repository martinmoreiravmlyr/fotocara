import React, { useState } from 'react';
import './App.css';
import ScratchCard from './components/ScratchCard'; 
import CameraComponent from './components/CameraComponent';
import ColaImagenes from './components/ColaImagenes';
import ImageShow from './components/ImageShow';
import IntroComponent from './components/IntroComponent';
import SocioComponent from './components/SocioComponent';
import HeaderComponent from './components/HeaderComponent';


function App() {
  const [type, setType] = useState('intro'); // Comienza con el componente de introducción

  const nextStep = () => {
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
          return 'intro'; // Vuelve al inicio después del último paso
      }
    });
  };

  return (
    <div>
      <HeaderComponent /> 
      <div> 
        {type === 'intro' && <IntroComponent nextStep={nextStep} />}
        {type === 'socio' && <SocioComponent nextStep={nextStep} />}
        {type === 'step1' && <CameraComponent nextStep={nextStep} />}
        {type === 'step2' && (
          <>
            <ColaImagenes nextStep={nextStep} />
            <ScratchCard imageUrl="/images/cenashow.jpeg" />
          </>
        )}
        {type === 'step3' && <div><ImageShow /><button onClick={() => setType('intro')}>Restart</button></div>}
        {type === 'error' && <div className="error">Something Went Wrong.<button onClick={() => setType('intro')}>Restart</button></div>}
      </div>
    </div>
  );
}

export default App;
