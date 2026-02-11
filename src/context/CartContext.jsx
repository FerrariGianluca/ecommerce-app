import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();
const CART_KEY = 'cart';

export function CartProvider({children}){
    const [carrito, setCarrito] = useState(() => {
        const stored = localStorage.getItem(CART_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    const getCant = id => carrito.find(p => p.id === id)?.cant || 0;

    const vaciarCarrito = () => {
        setCarrito([]);
        localStorage.removeItem(CART_KEY);
    };

    const sumarProducto = producto => {
        if(getCant(producto.id) < producto.stock){
            setCarrito(carritoActual => 
              carritoActual.some(p => p.id === producto.id)
                ? carritoActual.map(p => p.id === producto.id ? { ...p, cant: p.cant + 1 } : p)
                : [...carritoActual, { ...producto, cant: 1 }]
            );
            return true
        }
    };

    const restarProducto = producto => {
        const existe = carrito.some(p => p.id === producto.id);
        if (!existe) return false
        setCarrito(carritoActual => 
            carritoActual
                .map(p => p.id === producto.id ? { ...p, cant: p.cant - 1 } : p )
                .filter(p => p.cant > 0)
            );
        return true
    }

    const precioTotal = Number(carrito.reduce((suma, producto) => suma + producto.precio * producto.cant, 0)).toFixed(2);

    const cantTotal = Number(carrito.reduce((total, producto) => total + producto.cant, 0));

    const value = {
        carrito,
        sumarProducto,
        restarProducto,
        vaciarCarrito,
        precioTotal,
        cantTotal,
        getCant
    }

    useEffect(() => {
        localStorage.setItem(CART_KEY, JSON.stringify(carrito));
    }, [carrito]);

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