import React from 'react';

function HeaderComponent() {
  const url = "/";

  return (
    <header>
      <a href={url} title="">
        <img className='escudocap' src="/images/escudo_cap.svg" alt="Escudo de Peñarol" />
      </a>
    </header>
  );
}

export default HeaderComponent;
