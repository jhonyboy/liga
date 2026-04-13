import { useState } from "react";
import Header from "../header/Header";
import { useStore } from "../state/state";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Torneo() {
  const { token } = useStore((state) => state);
  console.log("Token en Torneo:", token);

  const navegar = useNavigate();
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const [NoEquipos, setNoEquipos] = useState(0);
  const [formato, setFormato] = useState(1);

  const notifyError = () => {
    toast.warn("Token no existe o sesion caducada.", {
      position: "top-center",
      autoClose: 2000,
    })
  };

  const notificacion = ( estado : boolean , message : string ) => {
    
    const config = {
      position: "top-center" as const,
      autoClose: 2000,
    };

    (estado ? toast.success : toast.warn) (message, config );

  }

  useEffect(() => {
      if( token === "") {
        notifyError();
        setTimeout(() => {
          navegar("/");
        }, 2000);
      }
    }, [token,navegar]);

  const crearTorneo = () => {
    console.log("Crear torneo con datos:", {
      nombre,
      direccion,
      NoEquipos,
      formato,
    });
    
    if ( nombre.trim() === "" || direccion.trim() === "" || NoEquipos <= 0 || !formato ) {
      toast.error("Por favor, complete todos los campos requeridos.", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }
    console.log("Datos validados, procediendo a crear torneo...");
    const peticion = async () => {
      const peticion = await fetch("http://localhost:3000/api/torneo/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ nombre, direccion, NoEquipos, formato }),
      });
      const respuesta = await peticion.json();
      console.log("Respuesta del servidor:", respuesta);
      if( respuesta.status ){
        setNombre("");
        setDireccion("");
        setNoEquipos(0);
        setFormato(1);
      }
      notificacion(  respuesta.status , respuesta.message );
    } 
    peticion();
  };



  return (
    <>
      <ToastContainer />
      {
        token !== null ? (
        <>
          <Header />
          <section
            className="section is-flex is-align-items-center is-justify-content-center"
            style={{ minHeight: "100vh" }}
          >
            <div className="container">
              <div className="columns is-centered">
                <div className="column is-half">
                  <div className="box">
                    <h1 className="title has-text-centered">Crear Torneo ⚽</h1>

                    <div className="field">
                      <label className="label">Nombre del torneo</label>
                      <div className="control">
                        <input
                          value={nombre}
                          className="input"
                          type="text"
                          placeholder="Torneo..."
                          onChange={(e) => setNombre(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="field" style={{ display: "none" }}>
                      <label className="label">Direccion</label>
                      <div className="control">
                        <input
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          className="input"
                          type="text"
                          placeholder="Direccion..."
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Direccion</label>
                      <div className="control">
                        <input
                          value={direccion}
                          onChange={(e) => setDireccion(e.target.value)}
                          className="input"
                          type="text"
                          placeholder="Direccion..."
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Número de Equipos</label>
                      <div className="control">
                        <input
                          className="input"
                          type="number"
                          min={1}
                          max={100}
                          value={NoEquipos}
                          onChange={(e) =>
                            setNoEquipos(parseInt(e.target.value) || 0)
                          }
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Formato de la liga</label>
                      <div className="control">
                        <div className="select is-fullwidth">
                          <select
                            value={formato}
                            onChange={(e) =>
                              setFormato(parseInt(e.target.value))
                            }
                          >
                            <option value={1}>Por grupos</option>
                            <option value={2}>Tabla general</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="field">
                      <button
                        className="button is-primary is-fullwidth"
                        onClick={crearTorneo}
                      >
                        Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid place-items-center h-dvh bg-zinc-900/50">
              <ToastContainer />
            </div>
          </section>
        </>
      ) : (
        ""
      )}
    </>
  );
}
