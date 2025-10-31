import { useCart } from '../../cartContext';
import "./detallesTodas.css";


function DetallesProducto({productoExterno}) {
    const { agregarAlCarrito } = useCart();  

    if (!productoExterno) return null;

  const manejarAgregarAlCarrito = () => {
    agregarAlCarrito(productoExterno);
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
                <p>La comodidad en tus pies ¡Llevátelos!</p>
                <strong> ${productoExterno.price}</strong>
                <p><strong>Talle:</strong> {productoExterno.size}</p>
                <button onClick={manejarAgregarAlCarrito} className='carrito-boton'>
                    Agregar al Carrito
                </button>
                <p>Comentanos tu experiencia!</p> <button className='comentario-boton'>Dejar Comentario</button>
            </div>
        </div>
    );
}

export default DetallesProducto;