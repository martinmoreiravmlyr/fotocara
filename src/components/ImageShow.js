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
    const hashtags = "LaNuevadePeñarol,Peñarol2024";
    const via = "tuUsuarioDeTwitter";
    const shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtags}&via=${via}`;
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

  // Adaptado para imágenes base64
  const downloadImage = () => {
    // Ensure the base64 string has the correct prefix
    let imageData = processedImage64;
    if (!processedImage64.startsWith('data:image/jpeg;base64,')) {
      imageData = 'data:image/jpeg;base64,' + processedImage64;
    }
  
    // Extract the content part of the base64 string
    const base64Content = imageData.split(',')[1];
    const byteString = atob(base64Content);
    
    // Determine the content type from the prefix
    const mimeString = imageData.split(',')[0].split(':')[1].split(';')[0];
  
    // Convert the base64 string to a Blob
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], {type: mimeString});
  
    // Create a URL for the blob object and initiate download
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = 'Camiseta_peñarol.jpeg'; // Specify the download file name
    document.body.appendChild(link);
    link.click();
  
    // Clean up by removing the link and revoking the blob URL
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
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
          <h1>¡Felicitaciones {nombreUsuario}! Ya podés presentar la nueva camiseta en tus redes.</h1>
          
          {/* Muestra la imagen base64 */}
          <Card3d dataImage={processedImage64} alt="Foto Generada" className='card-bg3d' />

        <div className='botonesfinal'>
          <button className='buttonnormal'><a href="https://www.tiendapenarol.com.uy/" rel="noreferrer" target={'_blank'}>Comprala aquí</a></button>
          <button className='buttonnormal'><a href="https://www.tiendapenarol.com.uy/">Ver modelo 360º</a></button>
        </div>
       
        <div className="botonerashare">
          <div className="redessociales">
            <div>
              <p>Compartir</p>
            </div>
            <div>
              <button className="social-link-button" aria-label="Share on X" onClick={shareOnX}>
                <img src="images/social_x.png" alt="Compartir en X" />
              </button>
              <button className="social-link-button" aria-label="Share on I" onClick={shareOnInstagramGuide}>
                <img src="images/social_i.png" alt="Compartir en Instagram" />
              </button>
              <button className="social-link-button" aria-label="Share on F" onClick={shareOnFacebook}>
                <img src="images/social_f.png" alt="Compartir en Facebook" />
              </button>
            </div>
          </div>
          <div className="descargar">
            <div>
              <p>Descargar</p>
            </div>
            <div>
              <button className="social-link-button" aria-label="Descargar" onClick={downloadImage}>
                <img src="images/descargar.png" alt="Descargar imagen" />
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
