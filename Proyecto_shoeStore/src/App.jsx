import { useState } from 'react'
import './App.css'
import Login from './Paginas/Login/login'
import Footer from './components/footer/footer';
import Header from "./components/Header/Header"
import Basicas from "./components/zapatillasBasicas/basicas"
import Deportivas from "./components/zapatillasDeportivas/deportivas"

function App() {
  <h1>Página shoeStore</h1>

  return (
    <>
    <Header/>
     <main class = "main">
        <h2>Hola</h2>
        <p>La info</p>
      </main>
      <Basicas/>
      <br/>
      <Deportivas/>
    <Footer/>
    </>

  )
}

export default App
