import { Link, useParams, useLocation } from "react-router-dom"

function DetalleProductos(){
    const { id } = useParams();
    const location = useLocation();
    const producto = location.state?.producto;

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
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{producto.producto}</h5>
                    <p className="card-text">Descripción: {producto.descripcion}</p>
                    <p className="card-text">Precio: {producto.precio}</p>
                    <p className="card-text">SKU: {producto.id}</p>
                </div>
            </div>
            <Link to="/productos"><button>Volver</button></Link>
        </>
    )
}

export default DetalleProductos