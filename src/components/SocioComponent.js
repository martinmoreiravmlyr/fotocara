import React from 'react';

function SocioComponent({ nextStep }) {
  return (
    <div className='containersteps'>
      <h1 className='poppins-bold'>¿Sos Socio?</h1>
      <p className='poppins-light'>Ingresa tu número de socio</p>
      <input type="text" placeholder="Número de Socio" />
      <button onClick={nextStep} className="next poppins-light" >Continuar</button>
    </div>
  );
}

export default SocioComponent;
