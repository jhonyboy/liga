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
    });
  };

  const notificacion = (estado: boolean, message: string) => {
    const config = {
      position: "top-center" as const,
      autoClose: 2000,
    };

    (estado ? toast.success : toast.warn)(message, config);
  };

  useEffect(() => {
    if (token === "") {
      notifyError();
      setTimeout(() => {
        navegar("/");
      }, 2000);
    }
  }, [token, navegar]);

  const crearTorneo = () => {
    console.log("Crear torneo con datos:", {
      nombre,
      direccion,
      NoEquipos,
      formato,
    });

    if (
      nombre.trim() === "" ||
      direccion.trim() === "" ||
      NoEquipos <= 0 ||
      !formato
    ) {
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
      if (respuesta.status) {
        setNombre("");
        setDireccion("");
        setNoEquipos(0);
        setFormato(1);
      }
      notificacion(respuesta.status, respuesta.message);
    };
    peticion();
  };

  return (
    <>
      <ToastContainer />
      {token !== null ? (
        <>
          <Header />
          <section className="min-h-screen flex items-center justify-center bg-base-200">
  <div className="w-full max-w-lg">
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body space-y-4">
        
        <h1 className="text-2xl font-bold text-center">
          Crear Torneo ⚽
        </h1>

        {/* Nombre */}
        <div className="form-control w-full">
          <label className="label pb-1">
            <span className="label-text">Nombre del torneo</span>
          </label>
          <input
            value={nombre}
            type="text"
            placeholder="Torneo..."
            className="input input-bordered w-full"
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        {/* Dirección */}
        <div className="form-control w-full">
          <label className="label pb-1">
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
          <label className="label pb-1">
            <span className="label-text">Número de Equipos</span>
          </label>
          <input
            type="number"
            min={1}
            max={100}
            value={NoEquipos}
            onChange={(e) =>
              setNoEquipos(parseInt(e.target.value) || 0)
            }
            className="input input-bordered w-full"
          />
        </div>

        {/* Formato */}
        <div className="form-control w-full">
          <label className="label pb-1">
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
        <button
          className="btn btn-primary w-full mt-2"
          onClick={crearTorneo}
        >
          Guardar
        </button>

      </div>
    </div>
  </div>

  {/* Toast */}
  <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
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
