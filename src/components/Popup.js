function Popup({ title, text, onClose, children }) {
    return (
      <div className="popup-background">
        <div className="popup-container">
          <button className="closebutton" onClick={onClose}>X</button>
          <h1>{title}</h1>
          <p>{text}</p>
          <div className="botonespop">
            {children} 
          </div>
        </div>
      </div>
    );
  }

export default Popup;