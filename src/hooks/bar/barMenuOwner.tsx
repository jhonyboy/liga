
import { useState } from "react";

export default function BarMenuOwner() {
    const [isActive, setIsActive] = useState(false);

    return(

        <>
        <div className="columns" style={{ minHeight: "100vh", margin: 0 }}>
      
            <div className={`column is-2 has-background-dark ${isActive ? '' : 'is-hidden-mobile'}`}>
                <aside className="menu p-3">
                <p className="menu-label has-text-white">General</p>
                <ul className="menu-list">
                    <li><a className="has-text-white">Dashboard</a></li>
                    <li><a className="has-text-white">Equipos</a></li>
                </ul>

                <p className="menu-label has-text-white">Administración</p>
                <ul className="menu-list">
                    <li><a className="has-text-white">Usuarios</a></li>
                    <li><a className="has-text-white">Configuración</a></li>
                </ul>
                </aside>
            </div>

            <div className="column">    
                <button className="button is-dark m-2 is-hidden-tablet" onClick={() => setIsActive(!isActive)}>
                    ☰
                </button>
                <div className="section">
                    <h1 className="title">Panel de Control</h1>
                    <p>Contenido aquí...</p>
                </div>
            </div>
        </div>
        </>
    )
};