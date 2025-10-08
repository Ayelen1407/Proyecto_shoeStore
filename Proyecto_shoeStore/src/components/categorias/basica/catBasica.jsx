import { useEffect, useState } from "react";
import "./catBasica.css"

export default function CatBasicas (){
  const [basicas, setBasicas] = useState([]);
  useEffect(() => {
    fetch("/api/basicas")
      .then((res) => res.json())
      .then((data) => {
        setBasicas(data.shoes);
      });
  })
  .catch((error) => console.error('Error al cargar basicas:', error));
 };

  return (
    <div>
      {basicas.map((product) => (
        <div key={product.id_shoes} className="catB-container">
          <img 
          src={product.img_url} 
          alt={product.nombre}
          />
          <h3 className="card-title">{product.nombre}</h3>
          <h4 className="card-price">${product.marca}</h4>
          <p>{product.precio}</p>
          <button className="card-button">Agregar al carrito</button>
        </div>
      ))}
    </div>
  );
