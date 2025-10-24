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
  const [categoryWindowOpen, setCategoryWindowOpen] = useState(false); // sstado para mostrar o ocultar las categorías
 const [selectedCategory, setSelectedCategory] = useState(null); // para guardar la categoria seleccionada


 const categories = ['Básica', 'Deportiva', 'High-top', 'Running'];


 const toggleCategoryWindow = () => {
   setCategoryWindowOpen(!categoryWindowOpen); // abre o cierra la ventana de categorías
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


     <button onClick={toggleCategoryWindow} className="boton-categorias">
       <TbShoe />
     </button>


     {categoryWindowOpen && (
       <div className="ventana-categorias">
         <h2>Categorías</h2>
         <ul>
           {categories.map((category) => (
             <li key={category}>
               <button onClick={() => setSelectedCategory(category)}>
                 {category}
               </button>
             </li>
           ))}
         </ul>
         {selectedCategory && <p>Has seleccionado la categoría: {selectedCategory}</p>}
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
