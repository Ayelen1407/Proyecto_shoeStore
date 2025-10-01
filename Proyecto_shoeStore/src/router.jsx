import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Login from './Paginas/Login/login';       
import Register from './Paginas/Register/Register';
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
export default Router;