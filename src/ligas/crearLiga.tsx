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
      <section className="min-h-screen flex items-center justify-center bg-base-200">
  <div className="w-full max-w-lg">
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        
        <h1 className="text-2xl font-bold text-center">
          Crear Liga ⚽
        </h1>

        {/* Nombre */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Nombre de la Liga</span>
          </label>
          <input
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            type="text"
            placeholder="Liga..."
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Torneo (oculto) */}
        <div className="form-control w-full hidden">
          <label className="label">
            <span className="label-text">Nombre del torneo</span>
          </label>
          <input
            value={torneo}
            onChange={(e) => setTorneo(e.target.value)}
            type="text"
            placeholder="Torneo..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Dirección */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Dirección</span>
          </label>
          <input
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            type="text"
            placeholder="Dirección..."
            className="input input-bordered w-full"
          />
        </div>

        {/* Número de equipos */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Número de Equipos</span>
          </label>
          <input
            type="number"
            min={1}
            value={NoEquipos}
            onChange={(e) =>
              setNoEquipos(parseInt(e.target.value) || 0)
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* Formato */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Formato de la liga</span>
          </label>
          <select
            value={formato}
            onChange={(e) => setFormato(parseInt(e.target.value))}
            className="select select-bordered w-full"
          >
            <option value={1}>Por grupos</option>
            <option value={2}>Tabla general</option>
          </select>
        </div>

        {/* Botón */}
        <div className="mt-4">
          <button
            className="btn btn-primary w-full"
            onClick={crearLiga}
          >
            Guardar
          </button>
        </div>

      </div>
    </div>
  </div>

  {/* Toast */}
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
    <ToastContainer />
  </div>
</section>
    </>
  );
}
