import React from 'react';
import { useNavigate } from 'react-router-dom';


function BasesyCondiciones() {
  const navigate = useNavigate();

  return (
        <div className="terms-and-conditions">
            <h2>Bases y Condiciones de Participación</h2>
            <p><strong>Organizador:</strong> Club Atlético Peñarol.</p>
            <p><strong>Actividad:</strong> Los participantes deberán subir una fotografía personal al micrositio designado. Utilizando tecnología de inteligencia artificial, se generará una imagen de cada participante vistiendo la nueva camiseta de Peñarol.</p>
            <p><strong>Galería Pública:</strong> Las imágenes generadas se exhibirán en una galería pública en el micrositio.</p>
            <h3>Protección de Datos</h3>
            <p><strong>Consentimiento:</strong> Al participar, usted autoriza el uso de su imagen y otros datos personales para la creación de la foto con la camiseta y su inclusión en la galería pública.</p>
            <p><strong>Seguridad de los Datos:</strong> Los datos recogidos serán protegidos adecuadamente para prevenir el acceso no autorizado o su tratamiento indebido.</p>
            <p><strong>Duración:</strong> La actividad estará disponible desde [fecha de inicio] hasta [fecha de cierre].</p>
            <p><strong>Contacto y Reclamaciones:</strong> Para consultas o reclamaciones relacionadas con sus datos personales, póngase en contacto con [información de contacto].</p>
            <p><strong>Modificaciones:</strong> El Club Atlético Peñarol se reserva el derecho de modificar las bases y condiciones si lo considera necesario.</p>
            <p>Estas bases aseguran el cumplimiento de las normativas vigentes y respetan los derechos de los participantes, garantizando una experiencia segura y agradable.</p>

            <button onClick={() => navigate(-1)} className="back-button">
            Volver Atrás
            </button>
        </div>
  );
}

export default BasesyCondiciones;
