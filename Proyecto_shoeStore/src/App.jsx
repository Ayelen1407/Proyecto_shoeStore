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
import BannerPrincipal from './components/BannerSection/bannerSec';


function App() {
 return (
     <>
     <Header/>
     <BannerPrincipal/>
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
