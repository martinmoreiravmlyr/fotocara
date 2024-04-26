import React from 'react';

function IntroComponent({ nextStep }) {
  return (
    <div className='containersteps'>
      <div className='contenedorstep'>
        <h1>Transformate en un jugador de Peñarol y presentá la nueva del Manya en tus redes</h1>
        <button onClick={nextStep} className="next poppins-light" >Comenzar</button>

        <div className='sponsorscontainer'>
          <div className='sponsors'>
            <a href="https://www.pumastore.com.uy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-puma.png" alt="Puma" />
            </a>
            <a href="https://www.antel.com.uy" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-antel.png" alt="Antel" />
            </a>
            <a href="https://www.bbva.com" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-bbva.png" alt="BBVA" />
            </a>
            <a href="https://sarubbi.com.uy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-sarubi.png" alt="Sarubbi" />
            </a>
            <a href="https://nunez.com.uy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-nuñez.png" alt="Nuñez" />
            </a>
            <a href="https://www.medicauruguaya.com.uy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-medica.png" alt="Medica Uruguaya" />
            </a>
            <a id="rexonasponsor" href="https://www.rexona.com/uy/" target="_blank" rel="noopener noreferrer">
              <img src="/images/logos-cap/logos-cap-rexona.png" alt="Rexona" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroComponent;
