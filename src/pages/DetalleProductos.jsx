import { Link, useParams, useLocation } from "react-router-dom"
import { useEffect, useState } from 'react';
import noImage from '/no-image.jpg';

function DetalleProductos(){
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducto = async () => {
            try {
                setCargando(true);
                setError(null);
                const res = await fetch(`https://695ad9991d8041d5eeb56822.mockapi.io/productos/products/${id}`);
                if (!res.ok) throw new Error(`Error ${res.status}`);
                const data = await res.json();
                setProducto(data);
            }
            catch(e) {
                setError('No se pudo cargar el producto');
                console.error(e);
            }
            finally {
                setCargando(false);
            }
        }
        fetchProducto();
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
                    <img class="card-img-top" src={producto.img || noImage} alt={producto.producto}></img>
                    <h5 className="card-title">{producto.producto}</h5>
                    <p className="card-text">{producto.descripcion.trim().length > 0 ? `Descripción: ${producto.descripcion}` : 'Sin descripción'}</p>
                    <p className="card-text">Precio: {producto.precio}</p>
                    <p className="card-text">SKU: {producto.id}</p>
                </div>
            </div>
            <Link to="/productos"><button>Volver</button></Link>
        </>
    )
}

export default DetalleProductos