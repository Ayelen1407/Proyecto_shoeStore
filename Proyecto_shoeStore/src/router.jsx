import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Paginas/Login/login';       
import Register from './Paginas/Register/Register';
import Dashboard from './Paginas/dashboard';
import GrillaBasica from "./components/categorias/basica/catBasica";
import GrillaDeportiva from "./components/categorias/deportiva/catDeportiva";
import GrillaHighTop from "./components/categorias/high-top/catHighTop";
import GrillaRunning from "./components/categorias/running/catRunning";
import GrillaGeneral from "./components/categorias/todas/catTodas";
import CatTodas from "./components/categorias/todas/catTodas";
import {CartProvider}  from "./components/cartContext";
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
          <Route path="/deportivas" element={<GrillaDeportiva />} />
          <Route path="/high-tops" element={<GrillaHighTop />} />
          <Route path="/running" element={<GrillaRunning />} />
          <Route path="/shoes" element={<GrillaGeneral />} />

        </Routes>
      </BrowserRouter>
    </CartProvider>
    
  );
}
export default Router;