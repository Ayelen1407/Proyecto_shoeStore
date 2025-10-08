import { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Paginas/Login/login';
import Footer from './components/footer/footer';
import Basicas from './components/categorias/basica/basica';
import Deportivas from './Deportivas';
import HighTop from './HighTop';
import Running from './Running';
import Header from "./components/Header/Header";
import Basicas from "./components/zapatillasBasicas/basicas";
import Deportivas from "./components/zapatillasDeportivas/deportivas";
import HighTop from './components/zapatillasHightop/high-top';
import Running from './components/zapatillasRunning/running';
import Destacado from './components/destacados/destacados';
import Grilla from './components/destacados/grilla/grilla';
function App() {
  return (
    <Router>
      <>
        <Header/>
        <h1>Página shoeStore</h1>
        <main className="main">
          <h2>Hola</h2>
          <p>La info</p>
        </main>

        <Switch> 
          <Route path="/zapatillas/basicas" component={Basicas} />
          <Route path="/zapatillas/deportivas" component={Deportivas} />
          <Route path="/zapatillas/high-top" component={HighTop} />
          <Route path="/zapatillas/running" component={Running} />
        </Switch>

        <div className="contenedor-principal">
          <Basicas/>
          <Deportivas/>
        </div>
        <div className="contenedor-principal">
          <HighTop/>
          <Running/>
        </div>
        <Destacado/>
        <Grilla/>
        <br/>
        <br/>
        <Footer/>
    </>
    </Router>

  );
}
export default App;


