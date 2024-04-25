import React, { useState } from 'react';

const PasswordLayer = ({ setType }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const correctPassword = 'lanueva1!'; // Define aquí la contraseña que desees
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (password === correctPassword) {
        setType('intro');  // Cambia el tipo directamente
      } else {
        setError(true);
      }
    };
  
    return (
      <div className="password-layer">
        <form onSubmit={handleSubmit}>
          <label htmlFor="password">Ingrese la contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Ingresar</button>
        </form>
        {error && <p style={{ color: 'red' }}>Contraseña incorrecta</p>}
      </div>
    );
  };
  
  export default PasswordLayer;
  
