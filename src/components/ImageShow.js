import { useState } from 'react';
import Card3d from "./Card3d";
import Popup from '../components/Popup';
import { useFormData } from './providers/FormContext';


function ImageShow({setType}) { 
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', text: '' });
  const { formData } = useFormData();
  const nombreUsuario = formData.nombre;
  const processedImage64 = formData.processedImage64;

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank');
    downloadImage();
  };

  const shareOnX = () => {
    const text = encodeURIComponent("Este año la nueva del Manya la presento YO");
    const url = encodeURIComponent(window.location.href);
    const hashtags = "LaNuevaDelManya,Peñarol2024";
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}`;
    window.open(shareUrl, '_blank');
    downloadImage();
  };

  const shareOnInstagramGuide = () => {
    setPopupContent({
      title: 'Compartir en Instagram',
      text: `Para compartir esta imagen en Instagram, primero descargala y luego subila a tu historia o feed.`,
      actionButton: (
        <button onClick={downloadImage}>Descargar Imagen</button>
      )
    });
    setShowPopup(true);
  };

  const shareOnWhatsApp = () => {
    const imageUrl = `https://lanuevadelmanya.com/api/static/imgs/combined/${processedImage64}`; // Asegúrate de usar una URL accesible públicamente
    const message = encodeURIComponent(`Mira esta imagen ${imageUrl}`);
    const whatsappUrl = `whatsapp://send?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };


  const downloadImage = () => {
    // La URL completa de la imagen
    const imageUrl = `/api/static/imgs/combined/${processedImage64}`;
  
    // Usa fetch para obtener la imagen
    fetch(imageUrl)
      .then(response => response.blob()) // Convierte la respuesta en Blob
      .then(blob => {
        // Crea una URL para el Blob
        const blobUrl = URL.createObjectURL(blob);
  
        // Crea un enlace y fuerza la descarga
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = 'LaNuevaDelManya.png'; // Especifica el nombre de archivo para la descarga
        document.body.appendChild(link); // Necesario para que el enlace funcione en Firefox
        link.click(); // Simula un clic en el enlace para iniciar la descarga
  
        // Limpieza
        document.body.removeChild(link);
        URL.revokeObjectURL(blobUrl); // Libera la memoria una vez que la descarga ha sido iniciada
      })
      .catch(console.error); // Asegúrate de manejar cualquier error en el proceso
  };
  

  return (
    <>
    
    {showPopup && (
        <Popup
          title={popupContent.title}
          text={popupContent.text}
          onClose={() => setShowPopup(false)}
        >
          <button onClick={downloadImage} style={{marginTop: '20px'}}>Descargar Imagen</button>
        </Popup>
      )}

      <div className="containersteps">
        <div id="presentala">
          <h1>¡Felicitaciones {nombreUsuario}!</h1>
          <h2>Ya podés presentar la nueva camiseta en tus redes.</h2>
          
          <Card3d dataImage={`/api/static/imgs/combined/${processedImage64}`} alt="Foto Generada" className='card-bg3d' />

        <div className='botonesfinal'>
          <button className='buttoncomprar buttonnormal'><a href="https://www.tiendapenarol.com.uy/" rel="noreferrer" target={'_blank'}>Comprala aquí</a></button>
        </div>
       
        <div className="botonerashare">
          <div className="redessociales">
            <div>
              <p>Compartir</p>
            </div>
            <div>
              <button className="social-link-button" aria-label="Share on X" onClick={shareOnX}>
                <img src="/images/social_x.png" alt="Compartir en X" />
              </button>
              <button className="social-link-button" aria-label="Share on I" onClick={shareOnInstagramGuide}>
                <img src="/images/social_i.png" alt="Compartir en Instagram" />
              </button>
              <button className="social-link-button" aria-label="Share on F" onClick={shareOnFacebook}>
                <img src="/images/social_f.png" alt="Compartir en Facebook" />
              </button>
              <button className="social-link-button" aria-label="Share on W" onClick={shareOnWhatsApp}>
                <img src="/images/social_f.png" alt="Compartir en Whatsapp" />
              </button>
            </div>
          </div>
          <div className="descargar">
            <div>
              <p>Descargar</p>
            </div>
            <div>
              <button className="social-link-button" aria-label="Descargar" onClick={downloadImage}>
                <img src="/images/descargar.png" alt="Descargar imagen" />
              </button>
            </div>
          </div>
        </div>
      </div>  
  
    </div>

    <button onClick={() => window.location.reload()} className="reiniciar poppins-light">Reiniciar</button>
      
    </>

  );
}

export default ImageShow;
