import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productosCarrito, setProductosCarrito] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setProductosCarrito((prev) => {
      const existe = prev.find((item) => item.id === producto.id);
      if (existe) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, quantity: item.quantity + cantidad }
            : item
        );
      } else {
        return [...prev, { ...producto, quantity: cantidad }];
      }
    });
  };

  const removerDelCarrito = (id) => {
    setProductosCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) return;
    setProductosCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: cantidad } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        productosCarrito,
        agregarAlCarrito,
        removerDelCarrito,
        actualizarCantidad,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
