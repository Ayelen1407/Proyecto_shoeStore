import "./Header.css";
import { Link } from "react-router-dom";
import { FaShoelace } from "react-icons/fa6";
import { useState } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbShoe } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import {  useCart } from "../cartContext";


export default function Header() {
 const [searchTerm, setSearchTerm] = useState("");
 const [categoriaVentana, setCategoriaVentana] = useState(false); // sstado para mostrar o ocultar las categorías
 const [seleccionCategoria, setSeleccionCategoria] = useState(null); // para guardar la categoria seleccionada


 const categories = ['Básica', 'Deportiva', 'High-top', 'Running'];


 const alternaVentana = () => {
   setCategoriaVentana(!categoriaVentana); // abre o cierra la ventana de categorías
 };


 const handleSubmit = (e) => {
   e.preventDefault();
   alert(`Buscando: ${searchTerm}`);
 };


 const [carritoAbierto, setCarritoAbierto] = useState(false);


 const {productosCarrito} = useCart();


 const Carrito = () => {
   setCarritoAbierto(!carritoAbierto);
 };


 return (
   <header className="header">
     <h1 className="logo"><FaShoelace /></h1>


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
       <ul className="lista-nav">
         <li><Link to="/login">Sign in</Link></li>
         <li><Link to="/register">Sign up</Link></li>
       </ul>
     </nav>


     <button onClick={alternaVentana} className="boton-categorias">
       <TbShoe />
     </button>


     {categoriaVentana && (
       <div className="ventana-categorias">
         <h3>Categorias</h3>
         <ul>
           {categories.map((category) => (
             <li key={category}>
               <button onClick={() => setSeleccionCategoria(category)}>
                 {category}
               </button>
             </li>
           ))}
         </ul>
         {seleccionCategoria && <p>Has seleccionado la categoria: {seleccionCategoria}</p>}
       </div>
     )}


     <button className="boton-carrito" onClick={Carrito} aria-label="Abrir carrito">
       <TiShoppingCart />
     </button>


     {carritoAbierto && (
       <div className="ventana-carrito">
         <h3>Carrito de compras</h3>
         <p>El carrito está vacío.</p>
         <button onClick={Carrito} className="cerrar-carrito">Cerrar</button>
       </div>
     )}


   </header>
 );
}
