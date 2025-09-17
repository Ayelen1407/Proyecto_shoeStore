import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Register from './components/Register/Register'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Register/>
      </div>
    </>
  )
}

export default App
/*
import Login from "./Login";

function App() {
  return <Login />;
}

export default App;
*/