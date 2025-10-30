import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./catTodas.css"
import DetallesProducto from "./detallesTodas";

function CatTodas() {
   const [products, setProducts] = useState();
   const [loading, setLoading] = useState(true);
   const [selectProduct, setSelectProduct] = useState(null);


   useEffect(() => {
     fetch("http://127.0.0.1:5000/api/shoes")
     .then((res) => res.json())
     .then((data) => {
         setProducts(data);
         setLoading(false);
       })


     .catch((err) => {
       console.error("Error:", err);
       setLoading(false);
     });
   }, []);

    if (loading) return <p>Cargando...</p>;
   if (!products || products.length === 0) return <p>No hay productos.</p>;

   const handleProductClick = () => {
     setSelectProduct(null);
   };

return (
  <>
  <div className="botonYfrase">
    <h1 className="frase">Todos nuestros productos</h1>
    <a href = "/"><button><IoMdArrowRoundBack /></button></a>
  </div>

  <div className="grid-container">
  {products.map((product) => (
    <div className="grid-item" key={product.id}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <h4>{product.brand}</h4>
      <p>$ {product.price}</p>
      
      <button className="button" onClick={() => setSelectProduct(product.id)}>
        Ver Detalles
      </button>
    
    </div>
  ))}
  </div>

  {selectProduct && (
    <div className="detalle-producto" onClick={handleProductClick}>

      <div className="detalle-contenido" onClick={(e) => e.stopPropagation()}>
        <button className="cerrar-boton" onClick={handleProductClick}>X</button>
        <DetallesProducto productoExterno={products.find(p => p.id === selectProduct)} />
      </div>    
  </div>
  )}
</>
);
}


export default CatTodas;
