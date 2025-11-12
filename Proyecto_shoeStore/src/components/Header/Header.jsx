import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { FaShoelace } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { TbShoe } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import {  useCart } from "../cartContext";
import detallesTodas from "../categorias/todas/detallesTodas";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoriaVentana, setCategoriaVentana] = useState(false); // sstado para mostrar o ocultar las categorías
  const [seleccionCategoria, setSeleccionCategoria] = useState(null); // para guardar la categoria seleccionada
  const [mostrarMarcas, setMostrarMarcas] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [productos, setProductos] = useState([]); // Estado para almacenar los productos de la API
  const [loading, setLoading] = useState(true); // Para manejar el estado de carga

  const categories = ['basica', 'deportiva', 'high-top', 'running'];
  const brands = ["nike", "adidas", "puma"];

  const navigate = useNavigate();//sirve para redirigir a otra ruta

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('/api/shoes');
        if (!response.ok) {
          throw new Error('Error al cargar productos');
        }
        const data = await response.json();
        setProductos(data);
      } catch (error) {
        console.error('Error buscando productos:', error); //mensaje para el cliente
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const alternaVentana = () => {
    setCategoriaVentana(!categoriaVentana); // abre o cierra la ventana de categorías
    setMostrarMarcas(false);
    setSeleccionCategoria(null);
  };

//PARTE BUSCADOR (lupa)
  //para filtrar productos mientras se escribe
  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      // Filtrar productos por nombre o marca (ignorando mayusculas)
      const filtered = productos.filter(producto =>
        producto.name.toLowerCase().includes(term.toLowerCase()) ||
        producto.brand.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filtered);
      setShowResults(true);
    }
  };

  // Al hacer submit, navegar a una página de resultados de búsqueda
  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shoes?search=${encodeURIComponent(searchTerm)}`);
      setShowResults(false);
    }
  };

    // Al clickear en un resultado, navegar al producto
  const handleResultClick = (product) => {
    navigate(`/api/shoes/${product.id}`);
    setShowResults(false);
    setSearchTerm("");
  };

    // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.search-form')) {
        setShowResults(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  //PARTE CARRITO
  const [carritoAbierto, setCarritoAbierto] = useState(false);
  const {productosCarrito} = useCart();

  const Carrito = () => {
    setCarritoAbierto(!carritoAbierto);
  };

  // Al elegir una categoría
  const handleCategoriaClick = (categoria) => {
    setSeleccionCategoria(categoria);
    setMostrarMarcas(true);
  };

  // Al elegir una marca → redirige a /productos?categoria=...&marca=...
  const handleMarcaClick = (marca) => {
    navigate(`/productos?categoria=${seleccionCategoria}&marca=${marca}`);
    setMostrarMarcas(false);
    setCategoriaVentana(false);
  };

  return (
    <header className="header">
      <h1 className="logo"><FaShoelace /></h1>
      <div className="derecha">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange= {handleSearchChange}
            className="search-input"
            aria-label="Buscar"
            disabled={loading}
          />
          <button type="submit" className="search-button" aria-label="Buscar" disabled={loading}>
            <HiMiniMagnifyingGlass />
          </button>

            {showResults && searchResults.length > 0 && (
            <div className="search-results-dropdown">
              {searchResults.map((producto) => (
                <div
                  key={producto.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(producto)}
                >
                  <img src={producto.image} alt={producto.name} className="result-image" />
                  <div className="result-details">
                    <span className="result-marca">{producto.brand}</span>
                    <span className="result-nombre">{producto.name}</span>
                    <span className="result-precio">${producto.price}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </form>


        <nav>
          <ul className="lista-nav">
            <li><Link to="/login">Sign in</Link></li>
            <li><Link to="/register">Sign up</Link></li>
          </ul>
        </nav>


        <a onClick={alternaVentana} className="categorias">
          <TbShoe />
        </a>


        {categoriaVentana && (
          <div className="ventana-categorias">
            <h3>Categorias</h3>
              {categories.map((category) => (
                <li key={category}>
                  <button onClick={() =>  handleCategoriaClick(category)}>
                    {category}
                  </button>
                </li>
              ))}
          </div>
        )}

        {mostrarMarcas && (
          <div className="ventana-marcas">
            <h3>Marcas</h3>
              {brands.map((brand) => (
                <li key={brand}>
                  <button onClick={() => handleMarcaClick(brand)}>{brand}</button>
                </li>
              ))}
          </div>
        )}


        <a className="carrito" onClick={Carrito} aria-label="Abrir carrito">
          <TiShoppingCart />
        </a>


        {carritoAbierto && (
          <div className="ventana-carrito">
            <h3>Carrito de compras</h3>
            <p>El carrito está vacío.</p>
            <button onClick={Carrito} className="cerrar-carrito">Cerrar</button>
          </div>
        )}

      </div>


    </header>
  );
}
