import React from 'react';

function HeaderComponent() {
  return (
    <header style={{ padding: '40px', textAlign: 'left', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
      <img src="/images/logo_cap.svg" alt="Escudo de Peñarol" />
    </header>
  );
}

export default HeaderComponent;
