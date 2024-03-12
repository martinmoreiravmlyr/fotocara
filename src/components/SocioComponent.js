import React, { useState, useEffect } from 'react';

function SocioComponent({ nextStep, toggleCamera, capturedImage }) {
  const [esSocio, setEsSocio] = useState('');

  const [numeroSocio, setNumeroSocio] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');

  const [botonHabilitado, setBotonHabilitado] = useState(false);


  useEffect(() => {
    const verificarCampos = () => {
      if (esSocio === 'si') {
        return esSocio && numeroSocio && nombre && apellido && ci && email && edad && genero;
      } else {
        return nombre && apellido && ci && email && edad && genero;
      }
    };

    setBotonHabilitado(verificarCampos());
  }, [esSocio, numeroSocio, nombre, apellido, ci, email, edad, genero]);


  return (
    <div className='containersteps'>
      <div className='contenedorstep'>
        <h1>Este año la nueva del Manya la presentás vos.</h1>
        <p className='poppins-light'>Ingresá tus datos, sacá una foto de tu cara o subila desde tu equipo y conocé la nueva camiseta del Manya.</p>

        <div>
          <p className='poppins-light blanco'>¿Sos socio?</p> 

          <div className='genero'>
            <div className="radio-container">
              <input
                type="radio"
                name="esSocio"
                value="si"
                onChange={(e) => setEsSocio(e.target.value)}
                id="socio_si"
              />
              <label htmlFor="socio_si" className="checkmark"></label>
              <p>Si</p>
            </div>

            <div className="radio-container">
              <input
                type="radio"
                name="esSocio"
                value="no"
                onChange={(e) => setEsSocio(e.target.value)}
                id="socio_no"
              />
              <label htmlFor="socio_no" className="checkmark"></label>
              <p>No</p>
            </div>
          </div>  

          {esSocio === 'si' && (
            <input
              type="text"
              placeholder="Número de Socio"
              className="input-field"
              onChange={(e) => setNumeroSocio(e.target.value)}
            />
          )}

        </div>

        <div className='formchico'>
          <input type="text" placeholder="Nombre" className="input-field" onChange={(e) => setNombre(e.target.value)} />
          <input type="text" placeholder="Apellido" className="input-field" onChange={(e) => setApellido(e.target.value)} />
          <input type="text" placeholder="C.I" className="input-field" onChange={(e) => setCi(e.target.value)} />
          <input type="email" placeholder="Mail" className="input-field" onChange={(e) => setEmail(e.target.value)} />
          <input type="number" placeholder="Edad" className="input-field" onChange={(e) => setEdad(e.target.value)} />


          <p className='poppins-light blanco'>La quiero presentar como</p>  
          <div className='genero'>
            <div className="radio-container">
              <input
                type="radio"
                name="genero"
                value="F"
                onChange={(e) => setGenero(e.target.value)}
                id="genero_f"
              />
              <label htmlFor="genero_f" className="checkmark"></label>
              <p>Jugador</p>
            </div>

            <div className="radio-container">
              <input
                type="radio"
                name="genero"
                value="M"
                onChange={(e) => setGenero(e.target.value)}
                id="genero_m"
              />
              <label htmlFor="genero_m" className="checkmark"></label>
              <p>Jugadora</p>
            </div>
          </div>

          <div className='contenedor-foto'>          
            {capturedImage && <img src={capturedImage} alt="Captured" className='capturedImageMini'/>}  
          </div>

          <div className='contenedor-subir-sacar'>          
            <div>
              <input type="file" accept="image/*" id="fileInput" class="input-file" />
              <label for="fileInput" class="label-file"><span class="material-icons">cloud_upload</span>Subir foto</label>
            </div>

            <div>   
              <button onClick={toggleCamera} className="take-photo buttonline poppins-light"><span class="material-icons">photo_camera</span>Tomar foto</button>
            </div>   
          </div>

          <button 
            onClick={nextStep} 
            id="enviardata" 
            className={`next poppins-light ${!botonHabilitado ? 'disabled' : ''}`}
            disabled={!botonHabilitado}
          >
            Conocé la camiseta
          </button>


        </div>
      </div>
    </div>
  );
}

export default SocioComponent;
