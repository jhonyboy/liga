import { useState } from "react";
import Header from "../header/Header";
import { useStore } from "../state/state";
import { ToastContainer, toast } from 'react-toastify';

export default function CrearLiga() {
  const emaill = useStore((state) => state.emaill);
  const [nombre, setNombre] = useState("");
  const [torneo, setTorneo] = useState("");
  const [direccion, setDireccion] = useState("");
  const [NoEquipos, setNoEquipos] = useState(0);
  const [formato, setFormato] = useState(1);
  const notifyError = () => {
    toast.warn("Error al crear la liga, por favor intente nuevamente.", {
      position: "top-center",
      autoClose: 2000,
    })
  };

  const notifySucess = () => {
    toast.success("Liga creada exitosamente!", {
      position: "top-center", 
      autoClose: 2000,
    })
  }
  

  const crearLiga = () => {
    console.log("Crear liga con datos:", {
      nombre,
      direccion,
      NoEquipos,
      formato,
      idUser:0
    });
    if(  !nombre || !direccion || NoEquipos <= 0 || !formato) {
        alert("Por favor, completa todos los campos correctamente.");
    }
    peticion();
};

const peticion = async () => {
      const respuest = await fetch("http://localhost:3000/api/liga/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${useStore.getState().token}`
        },
        body: JSON.stringify({
            nombre,
            direccion,
            NoEquipos,
            formato
        }),
    });
    const respuesta = await respuest.json();
    console.log("Respuesta del servidor:", respuesta.status , typeof(respuesta.status) );
    if (respuesta.status || respuesta.status == true ) {
      notifySucess();
    } else {
      notifyError();
    }
  };


  return (
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
                <h1 className="title has-text-centered">Crear Liga ⚽</h1>

                <div className="field">
                  <label className="label">Nombre de la Liga</label>
                  <div className="control">
                    <input
                        value={nombre}
                      className="input"
                      type="text"
                      placeholder="Liga..."
                      onChange={(e) => setNombre(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="field" style={{ display:'none' }} >
                  <label className="label">Nombre del torneo</label>
                  <div className="control">
                    <input
                        value={torneo}
                        onChange={(e) => setTorneo(e.target.value)}
                      className="input"
                      type="text"
                      placeholder="Torneo..."
                      
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
                    <input className="input" type="number" min={1} value={NoEquipos} onChange={(e) => setNoEquipos(parseInt(e.target.value) || 0)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Formato de la liga</label>
                  <div className="control">
                    <div className="select is-fullwidth">
                      <select value={formato} onChange={(e) => setFormato(parseInt(e.target.value))}>
                        <option value={1}>Por grupos</option>
                        <option value={2}>Tabla general</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="field">
                  <button
                    className="button is-primary is-fullwidth"
                    onClick={crearLiga}
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
  );
}
