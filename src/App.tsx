import { useState } from 'react'
import './App.css'
import Footer from './footer/Footer';
import Header from './header/Header';
import Login from './login/Login';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <div className='container' >
        <div className="is-flex is-flex-direction-column" style={{ minHeight: "100vh" }} >
          <h1>Hola Mundo!</h1>
        
          <Login />
        </div>
      </div>
      <Footer />
    </>
  )
}

export default App
