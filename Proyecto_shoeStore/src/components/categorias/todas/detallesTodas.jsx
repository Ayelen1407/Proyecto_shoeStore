import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../cartContext'; 

function DetallesProducto() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);  
    const [error, setError] = useState(null);
    const { agregarAlCarrito } = useCart();  

    useEffect(() => {
        fetch(`http://127.0.0.1:5000/api/shoes/${id}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .then(data => {
                console.log('Datos del producto:', data); 
                if (data.error) {
                    setError(data.error);
                } else {
                    setProduct(data);  
                }
            })
            .catch(err => {
                console.error('Error fetching producto:', err);
                setError('Error al cargar el producto');
            });
    }, [id]);

    if (error) return <p>Error: {error}</p>;
    if (!product) return <p>Cargando...</p>;

    const manejarAgregarAlCarrito = () => {
        agregarAlCarrito(product);  // Usa el contexto
        alert(`Agregado ${product.nombre} al carrito`);
    };

    return (
        <div className='container'>
            <div className='container-2'>
                {product.fotos && (
                    <img src={product.fotos} alt="Foto" className='img' />
                )}

            </div>
            
            <div className='detalles'>
                <img src={product.image} alt={product.nombre} className='img' />
                <h2>{product.name}</h2>
                <p>La comodidad en tus pies ¡Llevátelos!</p>
                <strong> ${product.price}</strong>
                <p><strong>Talle:</strong> {product.zise}</p>
                <button onClick={manejarAgregarAlCarrito} className='carrito-boton'>
                    Agregar al Carrito
                </button>
            </div>
        </div>
    );
}

export default DetallesProducto;