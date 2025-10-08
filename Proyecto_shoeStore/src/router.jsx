import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Paginas/Login/login';       
import Register from './Paginas/Register/Register';
import Dashboard from './Paginas/dashboard';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;