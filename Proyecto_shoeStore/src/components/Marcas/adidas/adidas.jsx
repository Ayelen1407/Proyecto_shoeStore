import { useEffect, useState } from "react";
import { useCart } from "../../cartContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import "./adidas.css"


function GrillaAdidas() {
   const { agregarAlCarrito } = useCart();
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

const manejarClick = (producto) => {
 agregarAlCarrito(producto);

};

return (
  <>
  <div className="botonYfrase">
    <h1 className="frase">Zapatillas Adidas</h1>
    <a href = "/"><button><IoMdArrowRoundBack /></button></a>
  </div>

  <div className="grid-container">
  {products.map((product) => (
    <div className="grid-item" key={product.id}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <h4>{product.brand}</h4>
      <p>$ {product.price}</p>
      <button className="button" onClick={() => manejarClick(product)}>Agregar al carrito</button>
    </div>
  ))}
  </div>
</>
);
}

export default GrillaAdidas;
