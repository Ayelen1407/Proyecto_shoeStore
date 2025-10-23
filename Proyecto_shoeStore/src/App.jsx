import './App.css';
import { CartProvider } from "./components/cartContext";
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
      <cartProvider>
      <Header/>
        <img className='img-principal' src='https://tempfile.aiquickdraw.com/s/365306ca9a1444e8be793b2db8040fe9_0_1761135681_3247.png'></img>
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
      </cartProvider>
    </>
  );
}
export default App;


