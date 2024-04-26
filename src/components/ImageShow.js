import { useState } from 'react';
import Card3d from "./Card3d";
import Popup from '../components/Popup';
import { useFormData } from './providers/FormContext';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon, WhatsappShareButton, WhatsappIcon } from 'react-share';

function ImageShow({setType}) { 
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', text: '' });
  const { formData } = useFormData();
  const nombreUsuario = formData.nombre;
  const processedImage64 = formData.processedImage64;
  const hashLink = formData.hashLink;

  const shareUrl = `${hashLink}`; // La URL a compartir
  const shareTitle = `¡Felicitaciones ${nombreUsuario}! Ya podés presentar la nueva camiseta en tus redes.`; // Título del mensaje
  const hashtags = ["LaNuevaDelManya", "Peñarol2024"]; // Hashtags para incluir en el tweet
  const relatedAccounts = ["Peñarol"]; // Cuentas relacionadas para sugerir en Twitter
  const viaAccount = "Peñarol"; // Cuenta que se menciona como la fuente en el tweet
  const mediaUrl = `https://lanuevadelmanya.com/api/static/imgs/combined/${processedImage64}`; // En caso de que puedas incluir una imagen directamente

  const shareOnInstagramGuide = () => {
    setPopupContent({
      title: 'Compartir en Instagram',
      text: `Para compartir esta imagen en Instagram, primero descargala y luego subila a tus historias o feed.`,
      actionButton: (
        <button onClick={downloadImage}>Descargar Imagen</button>
      )
    });
    setShowPopup(true);
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
                
                <TwitterShareButton
                  url={shareUrl} // URL de la página o de la imagen
                  title={shareTitle} // Título del tweet
                  hashtags={hashtags} // Array de hashtags
                  related={relatedAccounts} // Cuentas relacionadas
                  via={viaAccount} // Cuenta de Twitter del usuario que envía el tweet
                  media={mediaUrl} // URL de la imagen a compartir
                >
                  <TwitterIcon size={32} round />
                </TwitterShareButton>

                <FacebookShareButton
                  url={shareUrl}
                  quote={shareTitle}
                  hashtag="#LaNuevaDelManya"
                >
                  <FacebookIcon size={32} round />
                </FacebookShareButton>


                <WhatsappShareButton
                  url={shareUrl}
                  title={shareTitle}
                  separator=":: "
                >
                  <WhatsappIcon size={32} round />
                </WhatsappShareButton>

                <button className="social-link-button" aria-label="Share on I" onClick={shareOnInstagramGuide}>
                  <img src="/images/social_i.png" alt="Compartir en Instagram" />
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
