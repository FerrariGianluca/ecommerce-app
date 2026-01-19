import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({children}){
    const [carrito, setCarrito] = useState([]);

    const vaciarCarrito = () => setCarrito([]);

    const sumarProducto = producto => {
      setCarrito(carritoActual => 
        carritoActual.some(p => p.id === producto.id)
          ? carritoActual.map(p => p.id === producto.id ? { ...p, cant: p.cant + 1 } : p)
          : [...carritoActual, { ...producto, cant: 1 }]
      );
    };

    const restarProducto = producto => {
      setCarrito(carritoActual => 
        carritoActual
          .map(p => p.id === producto.id ? { ...p, cant: p.cant - 1 } : p )
          .filter(p => p.cant > 0));
    }

    const total = Number(carrito.reduce((suma, producto) => suma + producto.precio * producto.cant, 0)).toFixed(2);

    const value = {
        carrito,
        sumarProducto,
        restarProducto,
        vaciarCarrito,
        total
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCartContext debe usarse dentro de CartProvider");
    return context;
}