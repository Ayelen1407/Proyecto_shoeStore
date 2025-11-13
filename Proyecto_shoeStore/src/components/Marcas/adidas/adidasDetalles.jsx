import { useCart } from '../../cartContext';
import "./AdidasDetalles.css";
import { FaTruckFast } from "react-icons/fa6";
import { useState } from 'react';

function DetallesAdidas({productoExterno}) {
    const { agregarAlCarrito } = useCart();
    const [cantidad, setCantidad] = useState(1); 

    if (!productoExterno) return null;

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito(productoExterno, cantidad);
    alert(`Agregado ${productoExterno.name} al carrito`);
};
    return (
        <div className='container'>
            <div className='container-2'>
                <img
                src={productoExterno.image}
                alt={productoExterno.name}
                className="img"
                />
            </div>
            
            <div className='detalles'>
                <h2>{productoExterno.name}</h2>
                <h4>{productoExterno.brand}</h4>
                <p>La comodidad en tus pies ¡Llevátelos!</p>
                <strong> ${productoExterno.price}</strong>
                <p><strong>PAGA EN HASTA 6 CSI POR COMPRAS SUPERIORES A $200.000 <FaTruckFast /></strong></p>
                <p><strong>Talle:</strong> {productoExterno.size || "Agotado"}</p>

                <input
                    type="number"
                    min={1}
                    value={cantidad}
                    onChange={e => setCantidad(Math.max(1, parseInt(e.target.value) || 1))}
                />
                
                <button onClick={manejarAgregarAlCarrito} className='carrito-boton'>
                    Agregar al Carrito
                </button>
                <p>Comentanos tu experiencia!</p> <button className='comentario-boton'>Dejar Comentario</button>
            </div>
        </div>
    );
}

export default DetallesAdidas;