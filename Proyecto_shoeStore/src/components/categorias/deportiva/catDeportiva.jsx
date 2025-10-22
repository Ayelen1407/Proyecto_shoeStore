import { useEffect, useState } from "react";
import "./catDeportiva.css"


const GrillaDeportiva = () =>{
    const [products, setProducts] = useState([]);
    useEffect(() =>{
      fetch("/api/deportivas")
      .then(res=>res.json())
      .then(data =>{
        setProducts(data);
      })
      .catch(err=> console.log ("error", err));
    }, []);
return(
  <div className = "grid-container">
      {products.map((product) => (
          <div key={product.id_shoes} className='grid-item'>
            <img src={product.img_url} alt={product.nombre} />
            <h3>{product.nombre}</h3>
            <h4>{product.marca}</h4>
            <p>{product.precio}</p>
          </div>
      ))}
  </div>  
  );
}

export default GrillaDeportiva;


