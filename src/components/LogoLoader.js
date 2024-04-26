import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Lottie from "lottie-react";
import groovyWalkAnimation from "../json/lottie.json";

const LogoLoader = () => {
    // Usar useMemo para asegurar que 'messages' no se redefine en cada renderizado
    const messages = useMemo(() => [
        " De visitante o de local, a donde juegues voy a estar ¡y a donde vayas Carbonero!... ",
        " ¡Te vinimos a ver, te vinimo’ a alentar, vamo’ vamo’ aurinegro, vamo’ vamo’ a ganar!... ",
        " ¡Soooy Carbonero, es un sentimiento, no puedo parar!... ",
        " ¡Dale Peñarol, dale Peñarol, ooooo vamos a ganar, ooooo vamos Carbonero, que la vuelta vamos a dar!... ",
        " ¡¿Por qué será, que somos lo más grande que hay?!... ",
        " ¡Y dale alegría, alegría a mi corazón, la Copa Libertadores es mi obsesión!... ",
        " ¡Tenés que dejar el alma y el corazón, tenés que dejarlo todo por Peñarol!... "
    ], []); 

    // Estado para almacenar el mensaje actual
    const [message, setMessage] = useState("");
    const [fade, setFade] = useState(false);


    // Función para actualizar el mensaje de forma aleatoria
    const updateMessage = useCallback(() => {
        setFade(false); 

        const randomIndex = Math.floor(Math.random() * messages.length);
        setMessage(messages[randomIndex]);
        
        // Reiniciar la animación
        setTimeout(() => {
            setFade(true);
        }, 7.5); 
    }, [messages]); 

    // useEffect para actualizar el mensaje cada 8 segundos
    useEffect(() => {
        updateMessage();  
        const intervalId = setInterval(updateMessage, 8000);  

        // Limpieza al desmontar el componente
        return () => clearInterval(intervalId);
    }, [updateMessage]); 

    return (
        <div id='loadercontainer'>
            <div><Lottie animationData={groovyWalkAnimation} loop={true} /></div>
            <div id="loading-text" className={fade ? 'fade-in' : ''}><p><span>" </span>{message}<span> "</span></p></div>
        </div>    
    );
};

export default LogoLoader;
