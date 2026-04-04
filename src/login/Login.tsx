import { useState } from "react";

export default function Login() {
  
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [showError, setShowError] = useState(false);

    const login = async () => {
    console.log("login petition ==> " , email, password );

    if( email == "" || password == "" ) {
      console.error("Por favor, complete todos los campos.");
      setShowError(true);
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify( { email, password } ),
      });
      const data = await response.json();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (

    <section className="hero is-fullheight ">
        {
            showError && (  
                <div className="notification is-danger " id='llenado' style={{ maxWidth:'500px', marginLeft:'auto', marginRight:'auto' }} >
                    <button className="delete"></button>
                    Por favor, complete todos los campos.
                </div>
            )
        }
        

        <div className="notification is-danger" id='incorrecto' style={{ display:'none' }} >
            <button className="delete"></button>
            Usuario/Contrasena incorrectos.
        </div>
      <div className="hero-body">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-12-mobile is-8-tablet is-5-desktop">
              
              <div className="box">
                <h1 className="title has-text-centered">Iniciar Sesión</h1>

                  <div className="field">
                    <label className="label">Correo</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="email"
                        name="email"
                        placeholder="ejemplo@email.com"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-envelope"></i>
                      </span>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="field">
                    <label className="label">Contraseña</label>
                    <div className="control has-icons-left">
                      <input
                        className="input"
                        type="password"
                        name="password"
                        placeholder="********"
                        value={password}
                        onChange={(e) => setpassword(e.target.value)}
                        required
                      />
                      <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span>
                    </div>
                  </div>

                  {/* Botón */}
                  <div className="field">
                    <button className="button is-primary is-fullwidth" onClick={login} >
                      Ingresar
                    </button>
                  </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
    
  );
}