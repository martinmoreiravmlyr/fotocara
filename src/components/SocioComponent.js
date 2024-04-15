import React, { useState, useEffect } from 'react';
import MobileDetect from 'mobile-detect';
import { useFormData } from './providers/FormContext';
import Popup from '../components/Popup';


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

  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', text: '' });

  


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

  const [isIphone, setIsIphone] = useState(false);

  useEffect(() => {
    const md = new MobileDetect(window.navigator.userAgent);
    setIsIphone(!!md.is('iPhone')); // Actualiza el estado basado en si es un iPhone o no
  }, []);

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
        lastAction, // o uploadedImage, dependiendo de cómo estés manejando las imágenes
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
      console.log(processedImage64)
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
  }
};

  return (
    <div className='containersteps'>
      <div className='contenedorstep'>
        <h1>Este año la nueva del Manya la presentás vos.</h1>
        <p className='poppins-light'>Ingresá tus datos, sacá una foto de tu cara o subila desde tu equipo y conocé la nueva camiseta del Manya.</p>

        <form className='formulario' onSubmit={handleSubmit}>

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
                  value="male"
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
                  onChange={(e) => setGenero(e.target.value)}
                  id="female"
                />
                <label htmlFor="female" className="checkmark"></label>
                <p>Jugadora</p>
              </div>

              
            </div>

            <div className='contenedor-foto'>
            {displayImage && <img src={displayImage} alt="Captured or Uploaded" className='capturedImageMini'/>}
            </div>

            <div className='contenedor-subir-sacar'>          
              <div>
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
