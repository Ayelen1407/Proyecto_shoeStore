import { Link } from "react-router-dom";
import "./deportivas.css";

export default function Deportivas() {
  return (
    <Link to={"/deportiva"} className="producto-dep">
      <img src={"https://nikearprod.vtexassets.com/arquivos/ids/1060625-800-800?width=800&height=800&aspect=true"} 
      alt="Zapatillas Deportiva" />
      <h2 className="descripcion-h2">DEPORTIVA</h2>
    </Link>
  );
}

