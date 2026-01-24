import { Link, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';

function DetalleProductos(){
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${id}`)
        .then(res => {
            if (!res.ok) throw new Error('No se pudo cargar el producto');
            return res.json();
        })
        .then(data => setProducto(data))
        .catch(err => setError(err.message))
        .finally(() => setCargando(false));
    }, [id]);

    if (cargando) return <p>Cargando...</p>;
    if (error) return <p>{error}</p>;
    if(!producto){
        return (
            <div>
                <p>No se pudo cargar el producto</p>
                <Link to="/productos">
                    <button>Volver a la lista de productos</button>
                </Link>
            </div>
        )
    }

    return (
        <>
            <h2>Detalles del Producto</h2>
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">{producto.producto}</h5>
                    <p className="card-text">{producto.descripcion.trim() > 0 ? `Descripción: ${producto.descripcion}` : 'Sin descripción'}</p>
                    <p className="card-text">Precio: {producto.precio}</p>
                    <p className="card-text">SKU: {producto.id}</p>
                </div>
            </div>
            <Link to="/productos"><button>Volver</button></Link>
        </>
    )
}

export default DetalleProductos