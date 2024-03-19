import React, { useState, useEffect } from 'react';
import { useFormData } from './providers/FormContext';


function SocioComponent({ nextStep, toggleCamera, capturedImage, setLastAction, lastAction }) {
  const [esSocio, setEsSocio] = useState('');
  const [numeroSocio, setNumeroSocio] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('');
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('');
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Agregamos estados para las validaciones
  const [esSocioValido, setEsSocioValido] = useState(true); // Suponiendo que inicialmente es válido
  const [ciValido, setCiValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [edadValida, setEdadValida] = useState(true);

  const { updateFormData } = useFormData();

  // Validación de campos individuales
  const validarCi = (ci) => {
    const regexCi = /^\d{7}[0-9]$/; // Ajusta esta expresión regular según sea necesario
    return regexCi.test(ci);
  };

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const validarEdad = (edad) => {
    return edad > 0 && edad <= 110; // Asume que la edad debe ser un número entre 1 y 110
  };

  const validarNumeroSocio = (numero) => {
    const regexNumeroSocio = /^\d{6}$/;
    return regexNumeroSocio.test(numero);
  };

  // Modifica tus manejadores de cambio para incluir validaciones
  const handleCiChange = (e) => {
    const ci = e.target.value;
    setCi(ci);
    setCiValido(validarCi(ci));
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    setEmailValido(validarEmail(email));
  };

  const handleEdadChange = (e) => {
    const edad = e.target.value;
    setEdad(edad);
    setEdadValida(validarEdad(edad));
  };

  const handleNumeroSocioChange = (e) => {
    const numero = e.target.value;
    setNumeroSocio(numero);
    setEsSocioValido(validarNumeroSocio(numero));
  };

  // Determina qué imagen mostrar basándose en las propiedades 'capturedImage' y 'uploadedImage'
  const displayImage = lastAction === 'upload' ? uploadedImage : capturedImage;

  useEffect(() => {
    const verificarCampos = () => {
      if (esSocio === 'si') {
        return esSocioValido && numeroSocio && ciValido && emailValido && edadValida && nombre && apellido && ci && email && edad && genero && displayImage;
      } else {
        return ciValido && emailValido && edadValida && nombre && apellido && ci && email && edad && genero && displayImage;
      }
    };

    setBotonHabilitado(verificarCampos());
  }, [esSocio, esSocioValido, numeroSocio, ciValido, emailValido, edadValida, nombre, apellido, ci, email, edad, genero, displayImage]);

  const handleImageUpload = event => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
      setLastAction('upload');
    }
  };

  

  const handleSubmit = (event) => {
    event.preventDefault(); 

    // Compila todos los datos del formulario en un solo objeto
    const datosDelFormulario = {
      esSocio,
      numeroSocio,
      nombre,
      apellido,
      ci,
      email,
      edad,
      genero,
      imagen: displayImage, // o uploadedImage, dependiendo de cómo estés manejando las imágenes
    };

    updateFormData(datosDelFormulario);

    // por ejemplo, enviar los datos al servidor.
    console.log("Datos del formulario:", datosDelFormulario);

    // Si tienes que enviar los datos a un servidor, aquí iría el código
    // fetch('tuEndpointDeAPI', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(datosDelFormulario),
    // })
    // .then(response => response.json())
    // .then(data => console.log('Success:', data))
    // .catch((error) => {
    //   console.error('Error:', error);
    // });

    nextStep();
  };

  return (
    <div className='containersteps'>
      <div className='contenedorstep'>
        <h1>Este año la nueva del Manya la presentás vos.</h1>
        <p className='poppins-light'>Ingresá tus datos, sacá una foto de tu cara o subila desde tu equipo y conocé la nueva camiseta del Manya.</p>

        <form onSubmit={handleSubmit}>

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
                type="number"
                placeholder="Número de Socio"
                className="input-field"
                onChange={handleNumeroSocioChange}
              />
            )}

          </div>

          <div className='formchico'>
            <input type="text" placeholder="Nombre" className="input-field" onChange={(e) => setNombre(e.target.value)} />
            <input type="text" placeholder="Apellido" className="input-field" onChange={(e) => setApellido(e.target.value)} />
            <input type="number" placeholder="C.I (Sin puntos ni guiones)" className="input-field" onChange={handleCiChange}  />
            <input type="email" placeholder="Mail" className="input-field" onChange={handleEmailChange} />
            <input type="number" placeholder="Edad" className="input-field" onChange={handleEdadChange} />


            <p className='poppins-light blanco'>La quiero presentar como</p>  
            <div className='genero'>
              <div className="radio-container">
                <input
                  type="radio"
                  name="genero"
                  value="female"
                  onChange={(e) => setGenero(e.target.value)}
                  id="female"
                />
                <label htmlFor="female" className="checkmark"></label>
                <p>Jugador</p>
              </div>

              <div className="radio-container">
                <input
                  type="radio"
                  name="genero"
                  value="male"
                  onChange={(e) => setGenero(e.target.value)}
                  id="male"
                />
                <label htmlFor="male" className="checkmark"></label>
                <p>Jugadora</p>
              </div>
            </div>

            <div className='contenedor-foto'>
            {displayImage && <img src={displayImage} alt="Captured or Uploaded" className='capturedImageMini'/>}
            </div>

            <div className='contenedor-subir-sacar'>          
              <div>
                <input type="file" accept="image/*" id="fileInput" className="input-file" onChange={handleImageUpload} />
                <label htmlFor="fileInput" className="label-file"><span className="material-icons">cloud_upload</span>Subir foto</label>
              </div>

              <div>   
                <button type="button" onClick={toggleCamera} className="take-photo buttonline poppins-light"><span className="material-icons">photo_camera</span>Tomar foto</button>
              </div>
            </div>

            <button 
              type="submit"
              id="enviardata" 
              className={`next poppins-light ${!botonHabilitado ? 'disabled' : ''}`}
              disabled={!botonHabilitado}
            >
              Conocé la camiseta
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}

export default SocioComponent;
