import { Link } from "react-router-dom";
import "./basicas.css";

export default function Basicas() {
  return (
  <Link to={"/basica"} className="producto-ba">
      <img src={"https://nikearprod.vtexassets.com/arquivos/ids/1350536-800-800?width=800&height=800&aspect=true"} 
      alt="Zapatillas Basicas" />
      <h2 className="descripcion-h2">BÁSICA</h2>
    </Link>
  );
}

