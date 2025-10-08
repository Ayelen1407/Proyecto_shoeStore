import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import Header from "./components/Header/Header";
import Basicas from "./components/zapatillasBasicas/basicas";
import Deportivas from "./components/zapatillasDeportivas/deportivas";
import HighTop from './components/zapatillasHightop/high-top';
import Running from './components/zapatillasRunning/running';
import Destacado from './components/destacados/destacados';
import Grilla from './components/destacados/grilla/grilla';

function App() {
  return (
      <>
        <Header/>
        <h1>Página shoeStore</h1>
        <main className="main">
          <h2>Hola</h2>
          <p>La info</p>
        </main>
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
  );
}
export default App;


