import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [activeItem, setActiveItem] = useState("liga");
  const [isLigaOpen, setIsLigaOpen] = useState(false);
  const [isTorneoOpen, setIsTorneoOpen] = useState(false);

  const dropdownRef = useRef(null);
  const dropdownTorneoRef = useRef(null);

  const handleClick = (item) => {
    console.log("Clicked:", item);
    setActiveItem(item);
    setIsActive(false);
    setIsLigaOpen(false); // cerrar submenu
    setIsTorneoOpen(false); // cerrar submenu

    if (item === "crear-liga") {
      console.log("Navigate to Crear Liga");
      navigate("/ligas/crearLiga");
    }
    if (item === "crear-torneo") {
      console.log("Navigate to Crear Torneo");
      navigate("/torneo/CrearTorneo");
    }
    if (item === "mis-torneos") {
      console.log("Navigate to mis torneos");
      navigate("/torneo/MisTorneos");
    }
  };

  // cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        dropdownTorneoRef.current &&
        !dropdownTorneoRef.current.contains(e.target)
      ) {
        setIsLigaOpen(false);
        setIsTorneoOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">daisyUI</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Liga</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a onClick={() => handleClick("crear-liga")}>Crear liga</a>
                  </li>
                  <li>
                    <a onClick={() => handleClick("crear-torneo")}>
                      Crear torneo
                    </a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <details>
                <summary>Torneos</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a onClick={() => handleClick("mis-torneos")}>
                      Mis torneos
                    </a>
                  </li>
                  <li>
                    <a onClick={() => handleClick("jugadores")}>Jugadores</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
