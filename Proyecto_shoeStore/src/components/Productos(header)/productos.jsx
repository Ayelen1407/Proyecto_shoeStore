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
            const coincideCategoria = categoria ? item.tipo === categoria : true;
            const coincideMarca = marca ? item.marca === marca : true;
            return coincideCategoria && coincideMarca;
          });

        setFilteredShoes(filtradas);
      })
      .catch((err) => console.error("Error al cargar zapatillas:", err));
  }, [tipo, marca]);

  return (
    <div className="productos-container">
      <h2>
        {categoria && marca
          ? `${categoria} - ${marca}`   // Si hay ambos
          : categoria
          ? categoria                   // Si hay solo categoría
          : marca
          ? marca                       // Si hay solo marca
          : "Todos los productos"}      // Si no hay ninguno
      </h2>

       <div className="grilla-productos">
        {filteredShoes.length > 0 ? (
          filteredShoes.map((prod) => (
            <div key={prod.id_shoes} className="producto-card">
              <img src={prod.img_url} alt={prod.nombre} />
              <p>{prod.nombre}</p>
              <p>{prod.marca}</p>
              <p>${prod.precio}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
}
