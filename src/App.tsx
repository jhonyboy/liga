import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Footer from './footer/Footer';
import Login from './login/Login';
import Panel from './panel/Panel';
import  CrearLiga  from './ligas/crearLiga';
import Torneo from './torneos/Torneo';
import MisTorneos from './torneos/MisTorneos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="container mx-auto px-4">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/panel' element={<Panel />} />
              <Route path='/ligas/crearLiga' element={<CrearLiga />} />
              <Route path='/torneo/CrearTorneo' element={<Torneo />} />
              <Route path='/torneo/MisTorneos' element={<MisTorneos />} />
            </Routes>
          </BrowserRouter>
      </div>
      
    </>
  )
}

export default App
