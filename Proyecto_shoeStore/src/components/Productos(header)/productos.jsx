import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./productos.css";

export default function Productos() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const categoria = queryParams.get("categoria");
  const marca = queryParams.get("marca");

  const [allShoes, setAllShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);

  useEffect(() => {
    fetch("/api/shoes")
      .then((res) => res.json())
      .then((data) => {
        setAllShoes(data);

        // Filtra las zapatillas según los parametros
        const filtradas = data.filter((item) =>{
            const coincideTipo = tipo ? item.tipo === tipo : true;
            const coincideMarca = marca ? item.marca === marca : true;
            return coincideTipo && coincideMarca;
          });

        setFilteredShoes(filtradas);
      })
      .catch((err) => console.error("Error al cargar zapatillas:", err));
  }, [tipo, marca]);

  return (
    <div className="productos-container">
      <h2>
        {categoria} - {marca}
      </h2>

      <div className="grilla-productos">
          filteredShoes.map((prod) = (
            <div key={prod.id} className="producto-card">
              <img src={prod.img_url} alt={prod.name} />
              <p>{shoe.name}</p>
              <p>{shoe.brand}</p>
              <p>{shoe.precio}</p>
            </div>
          ))
      </div>
    </div>
  );
}
