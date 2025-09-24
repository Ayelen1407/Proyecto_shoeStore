import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register/Register'
import Login from './components/login/login'
import Footer from './components/footer/footer';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Register/>
        <br />
        <Login/>
      </div>
      
      <Footer/>

    </>
  )
}

export default App
