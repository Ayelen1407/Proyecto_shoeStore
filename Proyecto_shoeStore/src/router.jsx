import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Paginas/Login/login';       
import Register from './Paginas/Register/Register';
import Dashboard from './Paginas/dashboard';
import GrillaGeneral from "./components/categorias/todas/catTodas";
import GrillaBasica from "./components/categorias/basica/catBasica";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/basicas" element={<GrillaBasica />} />
        <Route path="/shoes" element={<GrillaGeneral />} />

      </Routes>
    </BrowserRouter>
  );
}
export default Router;