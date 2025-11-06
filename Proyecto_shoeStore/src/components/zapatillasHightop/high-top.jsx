import { Link } from "react-router-dom";
import "./high-top.css";

export default function HighTop() {
  return (
    <Link to={"/high-tops"} className="producto-high">
      <img src={"https://nikearprod.vtexassets.com/arquivos/ids/387526-800-800?width=800&height=800&aspect=true"} 
      alt="Zapatillas High-tops" />
      <h2 className="descripcion-h2">HIGH-TOP</h2>
    </Link>
  );
}

