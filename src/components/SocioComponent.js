import React from 'react';

function SocioComponent({ nextStep }) {
  return (
    <div className='containersteps'>
      <h1 className='poppins-bold'>¿Sos Socio?</h1>
      <p className='poppins-light'>Completa los siguientes campos</p>
      
      <input type="text" placeholder="Número de Socio" className="input-field" />
      
      <input type="text" placeholder="Nombre" className="input-field" />
      
      <input type="text" placeholder="C.I" className="input-field" />
      
      <input type="email" placeholder="Mail" className="input-field" />
      
      <select className="input-field">
        <option value="">Género</option>
        <option value="hombre">Hombre</option>
        <option value="mujer">Mujer</option>
        <option value="no binario">No binario</option>
      </select>
      
      <select className="input-field">
        <option value="">Edad</option>
        <option value="mayor">Más de 15</option>
        <option value="menor">Menos de 15</option>
      </select>
      
      <button onClick={nextStep} className="next poppins-light" >Continuar</button>
    </div>
  );
}

export default SocioComponent;
