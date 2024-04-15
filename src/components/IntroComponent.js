import React from 'react';

function IntroComponent({ nextStep }) {
  return (
    <div className='containersteps'>
      <div className='contenedorstep'>
        <h1>Probate la nueva del Manya y presentala vos.</h1>
        <button onClick={nextStep} className="next poppins-light" >Comenzar</button>

        <div className='sponsorscontainer'>
          <p>Sponsors</p>
          <div className='sponsors'>
            <img src="/images/logos-cap/logos-cap-puma.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-antel.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-bbva.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-sarubi.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-nuñez.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-medica.png" alt="Escudo de Peñarol" />
            <img src="/images/logos-cap/logos-cap-rexona.png" alt="Escudo de Peñarol" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default IntroComponent;
