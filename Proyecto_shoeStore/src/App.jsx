import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/footer/footer';
import Header from "./components/Header/Header";
import Basicas from "./components/zapatillasBasicas/basicas";
import Deportivas from "./components/zapatillasDeportivas/deportivas";
import HighTop from './components/zapatillasHightop/high-top';
import Running from './components/zapatillasRunning/running';
import Destacado from './components/destacados/destacados';
import GrillaDes from './components/destacados/grilla/grilla';


function App() {
  return (
      <>
        <Header/>
        <img className='img-principal' src='https://raphael.app/api/proxy-image/7ff5475d-5394-4c34-9852-c1a83370ede2.webp'></img>
        <main className="main">
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
        <GrillaDes/>
      
        <br/>
        <br/>
        <Footer/>
    </>
  );
}
export default App;


