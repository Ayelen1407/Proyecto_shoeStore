import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./adidas.css"
import DetallesAdidas from "./adidasDetalles.jsx";
import { RxCross1 } from "react-icons/rx";

function GrillaAdidas() {
   const [selectProduct, setSelectProduct] = useState(null);
   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(true);


   useEffect(() => {
     fetch("/api/adidas")
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
      
      <button className="button" onClick={() => {setSelectProduct(product)}}>
        Ver Detalles
      </button>
    
    </div>
  ))}
  </div>

  {selectProduct && (
    <div className="detalle-producto" onClick={handleProductClick}>

      <div className="detalle-contenido" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleProductClick}><RxCross1 /></button>
        <DetallesAdidas productoExterno= {selectProduct} />
      </div>    
  </div>
  )}
</>
);
}

export default GrillaAdidas;
