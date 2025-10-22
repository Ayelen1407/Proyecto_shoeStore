import React, { createContext, useContext, useState } from 'react';

// Crear el contexto
const CartContext = createContext();

// Proveedor del contexto (envuelve tu app para compartir el estado)
export const CartProvider = ({ children }) => {
  const [productosCarrito, setProductosCarrito] = useState([]); // Estado del carrito

  // Función para agregar un producto al carrito
  const agregarAlCarrito = (producto) => {
    setProductosCarrito((prevCarrito) => {
      // Verificar si el producto ya existe (por ID, por ejemplo)
      const productoExistente = prevCarrito.find((item) => item.id === producto.id);
      if (productoExistente) {
        // Si existe, aumentar la cantidad
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        // Si no existe, agregarlo con cantidad 1
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  // Función para eliminar un producto (opcional, por si quieres agregarla después)
  const eliminarDelCarrito = (id) => {
    setProductosCarrito((prevCarrito) => prevCarrito.filter((item) => item.id !== id));
  };

  // Función para vaciar el carrito
  const vaciarCarrito = () => {
    setProductosCarrito([]);
  };

  return (
    <CartContext.Provider value={{ productosCarrito, agregarAlCarrito, eliminarDelCarrito, vaciarCarrito }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook personalizado para usar el contexto fácilmente
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider');
  }
  return context;
};