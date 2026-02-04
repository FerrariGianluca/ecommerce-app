import React, { createContext, useState, useContext, useEffect } from 'react';

export const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const validarProducto = (producto) => {
        const errores = {};

        // nombre
        if (!producto.producto?.trim()) errores.nombre = 'El nombre es obligatorio.';

        // precio
        if (!producto.precio?.toString().trim()) errores.precio = 'El precio es obligatorio.';
        else {
            const precioLimpio = producto.precio.toString().replace(/\./g, '').replace(',', '.');
            const precioNumerico = parseFloat(precioLimpio);
            if (!/^[\d.,]+$/.test(producto.precio.toString().replace(/\./g, ''))) errores.precio = 'Solo números, puntos o comas.';
            else if (isNaN(precioNumerico)) errores.precio = 'Precio no válido.';
            else if (precioNumerico <= 0) errores.precio = 'Debe ser mayor a 0.';
        }

        // descripción
        if (producto.descripcion.length > 200) errores.descripcion = 'Máximo 200 caracteres.';

        return errores;
    };

    // Función para validar si el formulario es válido - nombre simplificado
    const validar = (producto) => {
        const errores = validarProducto(producto);
        return {
            esValido: Object.keys(errores).length === 0,
            errores
        };
    };

    const cargarProductos = async () => {
        try {
            const respuesta = await fetch('https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/');
            if (!respuesta.ok) throw new Error('Error al cargar productos');
            const datos = await respuesta.json();
            setProductos(datos);
        } catch (error) {
            console.error('Error al cargar productos:', error);
            setError("Hubo un problema al cargar los productos.");
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const agregarProducto = async (nuevoProducto) => {
        try {
            const respuesta = await fetch('https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoProducto),
            });
            if (!respuesta.ok) throw new Error('Error al agregar el producto');
            const data = await respuesta.json();
            setProductos(prev => [...prev, data]);
            return data;
        } catch (error) {
            console.error('Error al agregar producto: ', error);
            throw error;
        }
    };

    const editarProducto = async (productoActualizado) => {
        try {
            const respuesta = await fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${productoActualizado.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productoActualizado),
            });
            if (!respuesta.ok) throw new Error('Error al editar el producto');
            const data = await respuesta.json();
            setProductos(prev => prev.map(producto => producto.id === productoActualizado.id ? data : producto));
            return data;
        } catch (error) {
            console.error('Error al editar producto:', error);
            throw error;
        }
    };

    const value = {
        productos,
        cargando,
        error,
        agregarProducto,
        editarProducto,
        validarProducto,
        validar,
        cargarProductos
    }

    return (
        <ProductsContext.Provider value={value}>
            {children}
        </ProductsContext.Provider>
    );
};

// Hook personalizado para el contexto
export const useProductsContext = () => {
    const context = useContext(ProductsContext);
    if (!context) throw new Error('useProductsContext debe ser usado dentro de un ProductsProvider');
    return context;
};