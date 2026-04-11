import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import Footer from './footer/Footer';
//import Header from './header/Header';
import Login from './login/Login';
import Panel from './panel/Panel';
import  CrearLiga  from './ligas/crearLiga';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='container' >
        <div className="is-flex is-flex-direction-column" style={{ minHeight: "100vh" }} >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path='/panel' element={<Panel />} />
              <Route path='/ligas/crearLiga' element={<CrearLiga />} />
            </Routes>
          </BrowserRouter>
          
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
