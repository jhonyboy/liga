import { useState, useRef, useEffect } from "react";
import { useNavigate  } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("liga");
  const [isLigaOpen, setIsLigaOpen] = useState(false);

  const dropdownRef = useRef(null);

  const handleClick = (item) => {
    console.log("Clicked:", item);
    setActiveItem(item);
    setIsActive(false);
    setIsLigaOpen(false); // cerrar submenu

    if (item === "crear-liga") {
      console.log("Navigate to Crear Liga");
      navigate("/ligas/crearLiga");
    }

  };

  // cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsLigaOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <nav className="navbar is-primary" role="navigation">
      <div className="navbar-brand">
        <a className="navbar-item">
          <strong>Mi App</strong>
        </a>

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

          {/* LIGA CON CLICK */}
          <div
            ref={dropdownRef}
            className={`navbar-item has-dropdown ${
              isLigaOpen ? "is-active" : ""
            }`}
          >
            <a
              className="navbar-link"
              onClick={() => setIsLigaOpen(!isLigaOpen)}
            >
              Liga
            </a>

            <div className="navbar-dropdown">
              <a
                className="navbar-item"
                onClick={() => handleClick("crear-liga")}
              >
                Crear Liga
              </a>

              <a
                className="navbar-item"
                onClick={() => handleClick("ver-ligas")}
              >
                Ver Ligas
              </a>
            </div>
          </div>

          {/* OTRO ITEM */}
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