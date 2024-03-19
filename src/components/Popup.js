function Popup({ title, text, onClose, children }) {
    return (
      <div className="popup-background">
        <div className="popup-container">
          <h1>{title}</h1>
          <p>{text}</p>
          {children} 
          <button onClick={onClose}>Cerrar</button>
        </div>
      </div>
    );
  }

export default Popup;