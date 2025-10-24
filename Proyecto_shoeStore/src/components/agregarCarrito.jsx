import React, { useState } from 'react';
import axios from 'axios';
import './ButtonAddCarrito.css';

const Product = ({ products, onAddToCart }) => {
    const [cantidad, setCantidad] = useState(1);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const addToCart = async () => {
        setLoading(true);
        try {
            const id_usuario = localStorage.getItem('id_usuario'); 
            if (!id_usuario) {
                setMessage('Debes iniciar sesión');
                return;
            }
            const response = await axios.post('http://localhost:5000/api/carrito', {
                id_usuario: id_usuario,
                id_shoes: products.id,
                cantidad: cantidad
            });
            setMessage(response.data.mensaje);
            onAddToCart(id_shoes, cantidad); 
        } catch (error) {
            setMessage('Error al agregar al carrito');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
            {product.img_url && product.img_url.trim() !== '' ? (
                <img src={products.imagen} alt={products.name} style={{ width: '100px', height: '100px' }} />
            ) : (
                <div style={{ width: '100px', height: '100px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    Sin Imagen
                </div>
            )}
            
            <h3>{products.name}</h3>
            <p>Precio: ${products.price}</p>
            <input 
                type="number" 
                value={cantidad} 
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)} 
                min="1" 
            />
            <button className="button" onClick={addToCart} disabled={loading}>
                {loading ? 'Agregando...' : 'Agregar al Carrito'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};
export default Product;