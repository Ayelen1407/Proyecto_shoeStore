import { useEffect, useState } from "react";
import "./catTodas.css"


const GrillaGeneral = () =>{
    const [products, setProducts] = useState([]);
    useEffect(() =>{
      fetch("/api/shoes")
      .then(res=>res.json())
      .then(data =>{
        setProducts(data.shoes);
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

export default GrillaGeneral;


