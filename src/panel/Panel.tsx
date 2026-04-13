import { useStore } from "../state/state";
import Header from "../header/Header";
import league from "../assets/league.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer , toast } from "react-toastify";
import { useEffect } from "react";

export default function Panel() {
  const navegar = useNavigate();
  const token = useStore((state) => state.token);
  const emaill = useStore((state) => state.emaill);

  const notifyError = () => {
    toast.warn("Token no existe o sesion caducada.", {
      position: "top-center",
      autoClose: 2000,
    })
  }

  useEffect(() => {
    if( token === "") {
      notifyError();
      setTimeout(() => {
        navegar("/");
      }, 2000);
    }
  }, [token,navegar]);

  return (
    <>
      <ToastContainer />
      {
        token === "" ? '' : <><Header />
      <h1>Panel de Control</h1>
      <p>Bienvenido, {emaill}!</p>

      <div className="columns " style={{ marginTop: "50px" }}>
        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src={league}
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-content">
                  <p className="title is-4">Numero de liga</p>
                </div>
              </div>
              <div className="content">
                
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://bulma.io/assets/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              <div className="media">
                <div className="media-left">
                    <p className="title is-4">Jugadores</p>
                </div>
                
              </div>

              <div className="content">
                
              </div>
            </div>
          </div>
        </div>
        <div className="column">
          <div className="card">
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://bulma.io/assets/images/placeholders/1280x960.png"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-content">
              

              <div className="content">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Phasellus nec iaculis mauris. <a>@bulmaio</a>.{" "}
                <a href="#">#css</a>
                <a href="#">#responsive</a>
                <br />
                <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
              </div>
            </div>
          </div>
        </div>
      </div> 
      </>
      }
      
    </>
  );
}
