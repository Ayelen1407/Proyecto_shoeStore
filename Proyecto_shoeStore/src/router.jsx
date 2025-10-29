import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Paginas/Login/login';       
import Register from './Paginas/Register/Register';
import Dashboard from './Paginas/dashboard';
import GrillaBasica from "./components/categorias/basica/catBasica";
import GrillaDeportiva from "./components/categorias/deportiva/catDeportiva";
import GrillaHighTop from "./components/categorias/high-top/catHighTop";
import GrillaRunning from "./components/categorias/running/catRunning";
import CatTodas from "./components/categorias/todas/catTodas";
import {CartProvider}  from "./components/cartContext";
import DetallesProducto from "./components/categorias/todas/detallesTodas";
function Router() {
  return (
    <CartProvider>
        <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/basica" element={<GrillaBasica />} />
          <Route path="/deportiva" element={<GrillaDeportiva />} />
          <Route path="/high-tops" element={<GrillaHighTop />} />
          <Route path="/running" element={<GrillaRunning />} />
          <Route path="/shoes" element={<CatTodas />} />
          <Route path="/shoes/:id" element={<DetallesProducto />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
    
  );
}
export default Router;