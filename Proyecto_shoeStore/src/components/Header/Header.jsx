import "./Header.css"
import { Link } from "react-router-dom";
import { FaShoelace } from "react-icons/fa6";
import { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TiShoppingCart } from "react-icons/ti";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (e) => {
    e.preventDefault();
    // con esto se hace la busqueda (redirigir o filtrar)
    alert(`Buscando: ${searchTerm}`);
  };
// CARRITO
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  
  const productosCarrito = [ ]; //no tiene nada aun ;(

  const Carrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  return (
    <header className = "header" >
        
      <h1 className = "logo"><FaShoelace /></h1>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
          aria-label="Buscar"
        />
        <button type="submit" className="search-button" aria-label="Buscar">
          <HiMiniMagnifyingGlass />
        </button>
      </form>

      <nav>
        <ul className = "lista-nav">
          <li><Link to="/login">Sign in</Link></li>
          <li><Link to="/register">Sign up</Link></li>
        </ul>
      </nav>


      <button className="boton-carrito" onClick={Carrito} aria-label="Abrir carrito">
        <TiShoppingCart />
      </button>

            {carritoAbierto && (
        <div className="ventana-carrito">
          <h3>Carrito de compras</h3>
          {productosCarrito.length === 0 ? (
            <p>El carrito está vacío.</p>
          ) : (
            <ul>
              {productosCarrito.map((producto) => (
                <li key={producto.id}>
                  {producto.nombre} x {producto.cantidad} - ${producto.precio * producto.cantidad}
                </li>
              ))}
            </ul>
          )}
          <button onClick={Carrito} className="cerrar-carrito">Cerrar</button>
        </div>
      )}
      
    </header>
  );
}
 