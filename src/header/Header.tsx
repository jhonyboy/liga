import { useState } from "react";

export default function Navbar() {
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("liga");

  const handleClick = (item) => {
    setActiveItem(item);
    setIsActive(false); // cerrar menú en mobile
  };

  return (
    <nav className="navbar is-primary" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <strong>Mi App</strong>
        </a>

        {/* Botón hamburguesa */}
        <a
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          onClick={() => setIsActive(!isActive)}
        >
          <span></span>
          <span></span>
          <span></span>
        </a>
      </div>

      <div className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-start">
          <a
            className={`navbar-item ${
              activeItem === "liga" ? "is-active" : ""
            }`}
            onClick={() => handleClick("liga")}
          >
            Liga
          </a>

          <a
            className={`navbar-item ${
              activeItem === "jugadores" ? "is-active" : ""
            }`}
            onClick={() => handleClick("jugadores")}
          >
            Jugadores
          </a>
        </div>
      </div>
    </nav>
  );
}