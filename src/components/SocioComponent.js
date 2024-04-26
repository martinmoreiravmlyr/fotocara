import React, { useState, useEffect } from 'react';
import MobileDetect from 'mobile-detect';
import { useFormData } from './providers/FormContext';
import Popup from '../components/Popup';


function SocioComponent({ nextStep, toggleCamera, capturedImage, setLastAction, lastAction, setLoading }) {
  const [esSocio, setEsSocio] = useState('no');
  const [numeroSocio, setNumeroSocio] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [ci, setCi] = useState('60982898'); 
  const [email, setEmail] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState('male');
  const [botonHabilitado, setBotonHabilitado] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

  // Agregamos estados para las validaciones
  const [esSocioValido, setEsSocioValido] = useState(true);
  const [ciValido, setCiValido] = useState(true);
  const [emailValido, setEmailValido] = useState(true);
  const [edadValida, setEdadValida] = useState(true);
  const [politicasAceptadas, setPoliticasAceptadas] = useState(false); // Nuevo estado para el checkbox


  const { updateFormData } = useFormData();

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', text: '' });

  const [isIphone, setIsIphone] = useState(false);

  //Errores de validacion
  const [ciError, setCiError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [edadError, setEdadError] = useState('');
  const [numeroSocioError, setNumeroSocioError] = useState('');


  // Validación de campos individuales
  const validarTipoDeArchivo = (nombreArchivo) => {
    const extensionesPermitidas = /\.(jpg|jpeg|png|gif|heif|webp)$/i;
    return extensionesPermitidas.test(nombreArchivo);
  };
  
  const validarCi = (ci) => {
    const regexCi = /^\d{7,8}$/; 
    return regexCi.test(ci);
  };

  const validarEmail = (email) => {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  };

  const validarEdad = (edad) => {
    return edad > 0 && edad <= 110;
  };

  const validarNumeroSocio = (numero) => {
    const regexNumeroSocio = /^\d{1,6}$/; 
    return regexNumeroSocio.test(numero);
  };

  // Modifica tus manejadores de cambio para incluir validaciones
  const handleCiChange = (e) => {
    const ci = e.target.value;
    setCi(ci);
    const isValid = validarCi(ci);  
    setCiValido(isValid);
    setCiError(isValid ? '' : 'Cédula inválida. Debe tener 7 u 8 dígitos sin puntos ni guiones.');
  };

  const handleEmailChange = (e) => {
    const email = e.target.value;
    setEmail(email);
    const isValid = validarEmail(email);  
    setEmailValido(isValid);
    setEmailError(isValid ? '' : 'Correo electrónico inválido.');
  };

  const handleEdadChange = (e) => {
    const edad = e.target.value;
    setEdad(edad);
    const isValid = validarEdad(edad);  
    setEdadValida(isValid);
    setEdadError(isValid ? '' : 'Edad inválida. Debe ser un número entre 1 y 110.');
  };

  const handleNumeroSocioChange = (e) => {
    const numero = e.target.value;
    setNumeroSocio(numero);
    const isValid = validarNumeroSocio(numero);  
    setEsSocioValido(isValid);
    setNumeroSocioError(isValid ? '' : 'Número de socio inválido. Debe ser de hasta 6 dígitos.');
  };

  // Determina qué imagen mostrar basándose en las propiedades 'capturedImage' y 'uploadedImage'
  const displayImage = lastAction === 'upload' ? uploadedImage : capturedImage;

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsIphone(!!md.is('iPhone')); // Actualiza el estado basado en si es un iPhone o no
  }, []);

  useEffect(() => {
    const verificarCampos = () => {
      if (esSocio === 'si') {
        return esSocioValido && politicasAceptadas && numeroSocio && ciValido && emailValido && edadValida && nombre && apellido && ci && email && edad && genero && displayImage;
      } else {
        return  politicasAceptadas && emailValido && edadValida && nombre && apellido && email && edad && genero && displayImage;
      }
    };

    setBotonHabilitado(verificarCampos());
  }, [esSocio, esSocioValido, politicasAceptadas, numeroSocio, ciValido, emailValido, edadValida, nombre, apellido, ci, email, edad, genero, displayImage]);

  const handlePoliticasChange = (e) => {
    setPoliticasAceptadas(e.target.checked);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && validarTipoDeArchivo(file.name)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // `reader.result` contiene la imagen en base64
        setUploadedImage(reader.result); // Asegúrate de que `setUploadedImage` guarde la cadena base64
        setLastAction('upload');
      };
      reader.readAsDataURL(file); // Convierte la imagen a base64
    } else {
      // Manejo de error para formato de archivo no permitido
      setPopupContent({
        title: 'Formato de archivo no permitido.',
        text: `Por favor, sube un archivo JPEG, PNG, GIF, HEIF o WebP.`,
      });
      setShowPopup(true);
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);  

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
        imagen: displayImage,
        lastAction,
        isIphone
    };

    try {
      const response = await fetch('https://lanuevadelmanya.com/api/upload_data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(datosDelFormulario),
      });
      
      const responseData = await response.json();

      if (!response.ok) {
          // La respuesta del servidor indica un error. Podemos estar recibiendo {'errors': err.messages}
          let errorText = "Error en la solicitud.";

          if (responseData.errors) {
              // Si el servidor responde con errores específicos, los formateamos para mostrarlos.
              const errorsList = Object.values(responseData.errors).map((msgArray) => msgArray.join('. ')).join(' ');
              errorText = `Se encontraron errores: ${errorsList}`;
          } else if (responseData.error) {
              // Para el caso de que solo se envíe un mensaje de error general.
              errorText = responseData.error;
          }

          setPopupContent({
              title: 'Error de Validación',
              text: errorText,
          });
          setShowPopup(true);
          return; // Detenemos la ejecución adicional en caso de error.
      }

      // Si la respuesta está OK, procedemos como de costumbre.
      const processedImage64 = responseData.processedImage64;
      updateFormData({ ...datosDelFormulario, processedImage64 });
      nextStep(); // Avanza al siguiente paso, por ejemplo, mostrar la imagen procesada.
    } catch (error) {
        console.error('Error al enviar los datos del formulario:', error);
        // Aquí puedes manejar errores de red, por ejemplo.
        setPopupContent({
            title: 'Error de Red',
            text: 'Hubo un problema al conectar con el servidor. Por favor, intenta nuevamente.',
        });
        setShowPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEsSocioChange = (e) => {
    const value = e.target.value;
    setEsSocio(value);
    if (value === 'no') {
      setCi('60982898');
    }else{
      setCi('');
    }
  };

  return (
    <div className='containersteps' id={isIphone ? 'iphone-id' : 'default-id'}>
      <div className='contenedorstep'>
        <p className='poppins-light text-ingresa'>Sacá una foto de tu cara o subila desde tu equipo, ingresá tus datos y transformate en un jugador de <strong>Peñarol</strong></p>
        <form className='formulario' onSubmit={handleSubmit}>

          <div className='contenedor-foto'>
          {displayImage && <img src={displayImage} alt="Captured or Uploaded" className='capturedImageMini'/>}
          </div>

          <div className='contenedor-subir-sacar'>          
            <div className='contenedor-boton-upload'>
                <input type="file" accept="image/*" id="fileInput" className="input-file" onChange={handleImageUpload} />
                <label htmlFor="fileInput" className="label-file">
                <span className="material-icons">cloud_upload</span>Subir foto
              </label>
            </div>

            {showPopup && (
              <Popup
                title={popupContent.title}
                text={popupContent.text}
                onClose={() => setShowPopup(false)}
              />
            )}

            {!isIphone && (
              <div>   
                <button type="button" onClick={toggleCamera} className="take-photo buttonline poppins-light">
                  <span className="material-icons">photo_camera</span>Tomar foto
                </button>
              </div>
            )}
          </div>

          <div id='containersossocio'>
            <p className='poppins-light blanco'>¿Sos socio?</p> 

            <div className='genero'>
              <div className="radio-container">
                <input
                  type="radio"
                  name="esSocio"
                  value="si"
                  checked={esSocio === 'si'}
                  onChange={handleEsSocioChange}
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
                  checked={esSocio === 'no'}
                  onChange={handleEsSocioChange}
                  id="socio_no"
                />
                <label htmlFor="socio_no" className="checkmark"></label>
                <p>No</p>
              </div>
            </div>  

            {esSocio === 'si' && (
              <>
                <input
                  type="number"
                  placeholder="Número de Socio"
                  className="input-field"
                  onChange={handleNumeroSocioChange}
                />
                {numeroSocioError && <div className="error-message">{numeroSocioError}</div>}
              </>
            )}

          </div>

          <div className='formchico'>
            <input type="text" name="nombre" autocomplete="name" placeholder="Nombre" className="input-field" onChange={(e) => setNombre(e.target.value)} />
            <input type="text" name="apellido" autocomplete="family-name" placeholder="Apellido" className="input-field" onChange={(e) => setApellido(e.target.value)} />

            {esSocio === 'si' && ( // Mostrar el campo de la cédula de identidad solo si es socio
              <>
                <input
                  type="number"
                  placeholder="Cédula de identidad"
                  className="input-field"
                  value={ci} // Establece el valor predeterminado
                  onChange={handleCiChange}
                />
                {ciError && <div className="error-message">{ciError}</div>}
              </>
            )}
            
            <input type="email" name="email" autocomplete="email" placeholder="Mail" className="input-field" onChange={handleEmailChange} />
            {emailError && <div className="error-message">{emailError}</div>}
            
            <input type="number" placeholder="Edad" className="input-field" onChange={handleEdadChange} />
            {edadError && <div className="error-message">{edadError}</div>}


            <p className='poppins-light blanco'>La quiero presentar como</p>  
            <div className='genero'>
              
              <div className="radio-container">
                <input
                  type="radio"
                  name="genero"
                  value="male"
                  checked={genero === 'male'}
                  onChange={(e) => setGenero(e.target.value)}
                  id="male"
                />
                <label htmlFor="male" className="checkmark"></label>
                <p>Jugador</p>
              </div>

              <div className="radio-container">
                <input
                  type="radio"
                  name="genero"
                  value="female"
                  checked={genero === 'female'}
                  onChange={(e) => setGenero(e.target.value)}
                  id="female"
                />
                <label htmlFor="female" className="checkmark"></label>
                <p>Jugadora</p>
              </div>

              <div className="radio-container">
                <input
                  type="radio"
                  name="genero"
                  value="child"
                  checked={genero === 'child'}
                  onChange={(e) => setGenero(e.target.value)}
                  id="child"
                />
                <label htmlFor="child" className="checkmark"></label>
                <p>Infantil</p>
              </div>
              
            </div>

            <div className='politicas-container'>
              <input
                type="checkbox"
                id="politicas"
                checked={politicasAceptadas}
                onChange={handlePoliticasChange}
              />
              <label htmlFor="politicas" className="checkbox-label">
                He leído y acepto las <a href="/politicas-de-privacidad">políticas de privacidad</a>
              </label>
            </div>

            <button 
              type="submit"
              id="enviardata" 
              className={`next poppins-light ${!botonHabilitado ? 'disabled' : ''}`}
              disabled={!botonHabilitado}
            >
              Probarme la camiseta
            </button>
 
          </div>

        </form>

      </div>
    </div>
  );
}

export default SocioComponent;
