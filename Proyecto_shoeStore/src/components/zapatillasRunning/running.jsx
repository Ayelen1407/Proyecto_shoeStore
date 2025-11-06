import { Link } from "react-router-dom";
import "./running.css";

function Running() {
  return (
    <Link to={"/running"} className="producto-run">
      <img src={"https://nikearprod.vtexassets.com/arquivos/ids/1244838-800-800?width=800&height=800&aspect=true"} 
      alt="Zapatillas Running" />
      <h2 className="descripcion-h2">RUNNING</h2>
    </Link>
  );
}

export default Running;