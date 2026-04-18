import { useState } from "react";
import { useStore } from "../state/state";
import { useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);

  const emaill = useStore((state) => state.emaill);
  //const setEmail = useStore((state) => state.setEmail);
  const token = useStore((state) => state.token);
  const setToken = useStore((state) => state.setToken);
  console.log("tokenn en login ==> ", token);

  const login = async () => {
    console.log("login petition ==> ", email, password);

    if (email == "" || password == "") {
      console.error("Por favor, complete todos los campos.");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:3000/api/login/veryfyCredentials",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        },
      );
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      if (data.status) {
        setToken(data.token);
        setEmail(email);
        console.log("token guardado en el estado global ==> ", token);
        navigate("/Panel");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-2xl font-bold text-center">Login</h2>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Correo</span>
              </label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="correo@ejemplo.com"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="********"
                className="input input-bordered w-full"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Botón */}
            <div className="mt-6">
              <button className="btn btn-primary w-full" onClick={login} >Iniciar sesión</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
