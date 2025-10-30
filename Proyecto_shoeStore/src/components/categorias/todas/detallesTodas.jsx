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
                <h2>{producto.name}</h2>
                <p>La comodidad en tus pies ¡Llevátelos!</p>
                <strong> ${product.price}</strong>
                <p><strong>Talle:</strong> {product.zise}</p>
                <button onClick={manejarAgregarAlCarrito} className='carrito-boton'>
                    Agregar al Carrito
                </button>
                <p>Comentanos tu experiencia!</p> <button className='comentario-boton'>Dejar Comentario</button>
            </div>
        </div>
    );
}

export default DetallesProducto;