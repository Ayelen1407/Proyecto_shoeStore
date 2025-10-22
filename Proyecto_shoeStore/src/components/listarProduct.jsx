import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from './agregarCarrito';  

const ProductList = () => {
    const [products, setProducts] = useState([]);  // Lista de productos
    const [cart, setCart] = useState({});  // Estado opcional para el carrito (si quieres mostrarlo en tiempo real)

    // Carga productos desde tu API (ej. otro endpoint de Flask)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shoes');
                setProducts(response.data);
            } catch (error) {
                console.error('Error cargando productos:', error);
            }
        };
        fetchProducts();
    }, []);

    // Función para actualizar el carrito local (opcional)
    const updateCart = (productId, cantidad) => {
        setCart(prevCart => ({
            ...prevCart,
            [productId]: (prevCart[productId] || 0) + cantidad
        }));
    };

    return (
        <div>
            <h2>Productos</h2>
            {products.map(product => (
                <Product 
                    key={product.id} 
                    product={product} 
                    onAddToCart={updateCart}  
                />
            ))}
            <div>
                <h3>Carrito Actual</h3>
                <ul>
                    {Object.entries(cart).map(([id, qty]) => (
                        <li key={id}>Producto {id}: {qty}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProductList;