import React from 'react';
import { useNavigate } from 'react-router-dom';


function BasesyCondiciones() {
  const navigate = useNavigate();

  return (
        <div className="terms-and-conditions">
            <h2>Términos y Condiciones de Participación</h2>
            <p><strong>Organizador:</strong> Club Atlético Peñarol.</p>

            <p><strong>Aceptación:</strong> Para participar de la presente acción es necesario ser mayor de edad, y consentir expresamente los presentes términos y condiciones (T&C). En el caso de menores de edad o de ausencia de capacidad legal, la aceptación debe ser realizada por sus padres o representantes legales, y su participación se considerará realizada bajo su consentimiento y responsabilidad. Lea atentamente los presentes T&C antes de hacer click en “Aceptar”.</p>
            <p><strong>Actividad:</strong> Los Participantes deberán subir una fotografía personal al micrositio designado que generará una imagen de cada Participante vistiendo la nueva camiseta de Peñarol.</p>
            <p><strong>Duración:</strong> La  acción  estará disponible desde 28 de abril hasta el 3 de mayo de 2024.</p>
            <p><strong>Uso de imagen:</strong> El Participante autoriza expresamente el uso de su imagen y otros datos personales para la creación de la imagen con la nueva camiseta de Peñarol (la Imagen Generada) en el marco de esta acción promocional y por el tiempo de la misma. El participante declara que la imagen proporcionada es su propia imagen y/o que cuenta con la autorización del titular de derechos de imagen o de sus representantes legales en caso de menores de 18 años o de ausencia de capacidad legal.</p>
            <p><strong>Responsabilidad e indemnidad:</strong> El Participante reconoce y acepta que será el único responsable por reclamos de cualquier naturaleza de parte de terceros derivados por el uso que realice con y/o a partir de la Imagen Generada por cualquier medio, obligándose a mantener indemne al Organizador en ese sentido.  El Organizador no será responsable por el uso de imágenes de terceros o sin su consentimiento, y/o por el uso de la Imagen Generada para difundir mensajes discriminatorios, ofensivos y/o contra las buenas costumbres, la moral o el orden público.  El Participante se abstendrá y será responsable ante el Organizador por cualquier uso de la Imagen Generada como instrumento o medio para generar perjuicio reputacional a Peñarol.</p>
            <p><strong>Protección de Datos y Consentimiento:</strong> Los datos personales recolectados son los necesarios para gestionar la presente acción: nombre y apellido, edad, correo electrónico e imagen del participante. Se informa que el responsable de la base de datos es el Club Atlético Peñarol, entidad ante quien podrán ejercerse los derechos previstos en la Ley 18.331. El proveedor de servicios de alojamiento a los efectos de esta acción (encargado de tratamiento) es DigitalOcean, https://www.digitalocean.comempresa ubicada en NY, Estados Unidos y adherida al “EU- U.S. Data Privacy Framework” aplicando altos estándares de seguridad y protección de datos. Al aceptar los presentes T&C el Participante consiente la transferencia internacional de sus datos hacia dicho procesador/encargado de tratamiento. En ningún caso se recolectarán, procesarán ni almacenarán datos de naturaleza biométrica.</p>
            <p><strong>Seguridad:</strong> Los datos personales recogidos serán protegidos adecuadamente para garantizar su seguridad y confidencialidad. Dichas medidas tienen por objeto evitar su adulteración, pérdida, consulta o tratamiento no autorizado, así como detectar desviaciones de información. Una vez finalizada la acción, los datos personales serán eliminados de todo soporte.</p>
            <p><strong>Modificaciones:</strong> El Club Atlético Peñarol se reserva el derecho de modificar las bases y condiciones si lo considera necesario. Estas bases aseguran el cumplimiento de las normativas vigentes y respetan los derechos de los participantes, garantizando una experiencia segura y agradable.</p>  

            <button onClick={() => navigate(-1)} className="back-button">
            Volver Atrás
            </button>
        </div>
  );
}

export default BasesyCondiciones;
