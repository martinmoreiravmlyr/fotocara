import { useEffect, useState } from 'react';
import Popup from '../components/Popup';

function ColaImagenes({ nextStep }) {
  const [showPopup, setShowPopup] = useState(false);
  const [popupContent, setPopupContent] = useState({ title: '', text: '' });

  useEffect(() => {
    const obtenerPosicion = async () => {
      try {
        const respuesta = await fetch('http://tu-backend/api/cola/posicion');
        const datos = await respuesta.json();

        setPopupContent({
          title: 'Estás en un proceso de cola',
          text: `Estás en la posición Nro: ${datos.posicion}`,
        });
        setShowPopup(true);

        if (true) {
          nextStep();
        }
        
      } catch (error) {
        console.error("Error al obtener la posición en la cola", error);
        setPopupContent({
          title: 'Error',
          text: 'No se pudo obtener la posición en la cola',
        });
        setShowPopup(true);
      }
    };

    obtenerPosicion();
  }, [nextStep]);

  return showPopup ? (
    <>
      <Popup
        title={popupContent.title}
        text={popupContent.text}
        onClose={() => setShowPopup(false)}
      />
      
      <button onClick={nextStep} className="continuar" >Continuar</button>
    </>

  ) : null;
}


export default ColaImagenes;
