import Card3d from "./Card3d";

function ImageShow({ setType }) { 

  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    window.open(shareUrl, '_blank');
  };

  // Reemplaza esta función por la lógica adecuada para compartir en Instagram y otras plataformas
  const shareOnOtherPlatform = () => {
    console.log("Compartir en otra plataforma.");
  };

  const downloadImage = () => {
    // Suponiendo que la URL de la imagen a descargar es '/images/generada.png'
    const imageUrl = '/images/generada_omar.jpg'; // Deberías ajustar esto según la ubicación real de tu imagen
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'imagen-generada.png'; // Esto define el nombre predeterminado del archivo para la descarga
    document.body.appendChild(link); // Necesario para que los navegadores procesen el clic
    link.click(); // Simula un clic en el enlace para iniciar la descarga
    document.body.removeChild(link); // Limpia agregando el elemento al DOM
  };

  return (
    <>

    <div className="containersteps">
      <div id="presentala">
        <h1>Presentala en tus redes</h1>
        <Card3d dataImage="/images/generada_omar.jpg" alt="Foto Generada" className='card-bg3d' />
        <div className="botonerashare">
          <div className="redessociales">
            <p>Compartir</p>
            {/* Asumiendo que X es otra plataforma, reemplaza shareOnOtherPlatform por la función correcta */}
            <button className="social-link-button" aria-label="Share on X" onClick={shareOnOtherPlatform}>
              <img src="images/social_x.png" alt="Compartir en X" />
            </button>
            {/* Instagram no permite compartir directamente, podrías redirigir a una historia si es una URL. */}
            <button className="social-link-button" aria-label="Share on I" onClick={shareOnOtherPlatform}>
              <img src="images/social_i.png" alt="Compartir en Instagram" />
            </button>
            <button className="social-link-button" aria-label="Share on F" onClick={shareOnFacebook}>
              <img src="images/social_f.png" alt="Compartir en Facebook" />
            </button>
          </div>
          <div className="descargar">
            <p>Descargar</p>
            <button className="social-link-button" aria-label="Descargar" onClick={downloadImage}>
              <img src="images/descargar.png" alt="Descargar imagen" />
            </button>
          </div>
        </div>
      </div>  
  
    </div>

    <button onClick={() => setType('intro')} className="reiniciar poppins-light">Reiniciar</button>
  
    </>

  );
}

export default ImageShow;
