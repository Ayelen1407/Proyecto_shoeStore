import './App.css';
import { CartProvider } from './components/cartContext';
import Basicas from "./components/zapatillasBasicas/basicas";
import Deportivas from "./components/zapatillasDeportivas/deportivas";
import HighTop from './components/zapatillasHightop/high-top';
import Running from './components/zapatillasRunning/running';
import Destacado from './components/destacados/destacados';
import GrillaDes from './components/destacados/grilla/grilla';
import BannerPrincipal from './components/BannerSection/bannerSec';
import GrillaTres from './components/grilla3/grilla3';
import Banner1 from './components/banner1/banner1';
import BannerSS from './components/bannerSS/bannerSS';
function App() {
 return (
     <>
     <BannerPrincipal/>
       <Destacado/>
       <GrillaDes/>
       <div className="contenedor-principal">
         <Basicas/>
         <Deportivas/>
         <HighTop/>
         <Running/>
       </div>
       <Banner1/>
       <GrillaTres/>       
       <BannerSS/>
       <br/>
       <br/>    
   </>
 );
}
export default App;
