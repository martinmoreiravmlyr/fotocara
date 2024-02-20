import React from 'react';

function IntroComponent({ nextStep }) {
  return (
    <div className='containersteps'>
      <h1 className='poppins-bold'>¿Ya te probaste la nueva camiseta?</h1>
      <button onClick={nextStep} className="next poppins-light" >Comenzar</button>
    </div>
  );
}

export default IntroComponent;
